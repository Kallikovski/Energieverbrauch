<template>
  <q-card class="card">
    <q-toolbar class="bg-primary text-white"
      ><q-checkbox left-label v-model="predict" label="Predict" />
      <q-toolbar-title class="chart-title">Energieverbrauch</q-toolbar-title
      ><q-btn label="pdf" @click="getPDF"></q-btn
    ></q-toolbar>
    <LineChart
      :chart-options="chartOptions"
      :chart-data="getChartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
    <q-btn-group push spread>
      <q-btn
        size="xl"
        push
        label="previous"
        icon="arrow_left"
        color="primary"
        @click="updateYearIndex(-1)"
      />
      <q-btn
        size="xl"
        push
        label="following"
        icon-right="arrow_right"
        color="primary"
        @click="updateYearIndex(+1)"
      />
    </q-btn-group>
  </q-card>
</template>

<script lang="ts">
import { Line as LineChart } from 'vue-chartjs';
import { ApiDataInterface } from '../interfaces/energieInterface';
import { jsPDF, jsPDFOptions } from 'jspdf';
import { computed, defineComponent, ref, Ref } from 'vue';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default defineComponent({
  name: 'ChartComponent',
  components: { LineChart },
  props: {
    rawChartData: {
      type: Object,
    },
    chartId: {
      type: String,
      default: 'line-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 1000,
    },
    height: {
      type: Number,
      default: 800,
    },
    cssClasses: {
      default: 'chart-canvas',
      type: String,
    },
    styles: {
      type: Object,
    },
    plugins: {
      type: Object,
    },
  },
  setup(props) {
    const currentYearIndex: Ref<number> = ref(0);
    const predict: Ref<boolean> = ref(true);
    const chartOptions = ref({
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    });
    // deconstruct rawChartData Array and check if all results are given.
    // If not fill missing with previous values adjusted with relativeChange
    const getChartData = computed(() => {
      const apiData: ApiDataInterface[] =
        props.rawChartData as ApiDataInterface[];
      const labels: string[] = [];
      const data: number[] = [];
      let relatvieChange = 0;
      apiData[currentYearIndex.value].months.forEach((value, index) => {
        //check if current value is defined and push into data arrays
        if (apiData[currentYearIndex.value].months[index].consumption != null) {
          labels.push(value.month);
          data.push(value.consumption);
          // check if previous value can be accessed and calculate relative change
          if (apiData[currentYearIndex.value].months[index - 1] != undefined) {
            relatvieChange -=
              apiData[currentYearIndex.value].months[index - 1].consumption -
              apiData[currentYearIndex.value].months[index].consumption;
          }
        } else {
          labels.push(value.month);
          // add predicitive values if wanted
          if (predict.value) {
            data.push(data[index - 1] + relatvieChange);
          } else {
            data.push(NaN);
          }
        }
      });
      return {
        labels,
        datasets: [
          {
            label: apiData[currentYearIndex.value].year,
            data,
            backgroundColor: ['rgba(255, 0, 0, 0.5)'],
            borderColor: ['rgba(255, 0, 0, 0.2)'],
          },
        ],
      };
    });
    // update currentYearIndex and check if previous or following year is available
    const updateYearIndex = (step: number) => {
      const apiData: ApiDataInterface[] =
        props.rawChartData as ApiDataInterface[];
      if (
        currentYearIndex.value + step >= 0 &&
        currentYearIndex.value + step < apiData.length
      ) {
        currentYearIndex.value += step;
      }
    };
    // generate PDF from canvas with jsPDF
    const getPDF = () => {
      const canvas: HTMLCanvasElement = document.querySelector(
        `#${props.chartId}`
      ) as HTMLCanvasElement;
      const apiData: ApiDataInterface[] =
        props.rawChartData as ApiDataInterface[];
      const imageData: string = canvas.toDataURL('image/png', 1.0) as string;
      const options: jsPDFOptions = {
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      };
      const doc: jsPDF = new jsPDF(options);
      doc.addImage(imageData, 'PNG', 0, 0, canvas.width, canvas.height);
      doc.save(`Energieverbrauch: ${apiData[currentYearIndex.value].year}`);
    };
    return {
      chartOptions,
      getChartData,
      predict,
      updateYearIndex,
      getPDF,
    };
  },
});
</script>
<style lang="scss" scoped>
.chart-title {
  text-align: center;
}
.chart-canvas {
  width: 100%;
  border: solid rgba(128, 128, 128, 0.397) 1px;
  canvas {
    max-width: 600px;
  }
}
.card {
  width: 40%;
  padding: 2rem;
}
@media only screen and (max-width: 1800px) {
  .card {
    width: 60%;
  }
}
@media only screen and (max-width: 1000px) {
  .card {
    width: 90%;
  }
}
</style>