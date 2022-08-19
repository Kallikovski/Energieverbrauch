<template>
  <q-page class="row items-center justify-evenly">
    <ChartComponent :rawChartData="energieData"/>
  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import ChartComponent from 'src/components/ChartComponent.vue';
import { ApiDataInterface } from '../interfaces/energieInterface'
import { useEnergieStore } from '../stores/energieStore';
export default defineComponent({
  name: 'IndexPage',
  components: {
    ChartComponent,
  },
  setup() {
    const energieStore = useEnergieStore();
    const energieData = computed(() => {
      const apiData:ApiDataInterface[] = energieStore.getApiData;
      return apiData
      });
    return {
      energieData
    };
  },
});
</script>
