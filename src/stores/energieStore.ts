import { defineStore } from 'pinia';
import { ApiDataInterface } from '../interfaces/energieInterface';

export const useEnergieStore = defineStore('energieStore', {
    state: () => {
        return {
            apiData: [
                {
                    year: 2022,
                    months: [
                        {
                            month: 'January',
                            consumption: 560
                        },
                        {
                            month: 'Februray',
                            consumption: 460
                        },
                        {
                            month: 'March',
                            consumption: 780
                        },
                        {
                            month: 'April',
                            consumption: 720
                        },
                        {
                            month: 'Mai',
                            consumption: 500
                        },
                        {
                            month:'June',
                            consumption: 500
                        },
                        {
                            month:'July',
                            consumption: 620
                        },
                        {
                            month:'August',
                            consumption: 600
                        },
                        {
                            month:'September',
                            consumption: 660
                        },
                        {
                            month:'October',
                            consumption: 680
                        },
                        {
                            month:'November',
                            consumption: 640
                        },
                        {
                            month:'December',
                            consumption: 620
                        },
                    ],
                },
                {
                    year: 2023,
                    months: [
                        {
                            month: 'January',
                            consumption: 500
                        },
                        {
                            month: 'Februray',
                            consumption: 530
                        },
                        {
                            month: 'March',
                            consumption: 640
                        },
                        {
                            month: 'April',
                            consumption: 560
                        },
                        {
                            month: 'Mai',
                            consumption: 480
                        },
                        {
                            month:'June',
                            consumption: null
                        },
                        {
                            month:'July',
                            consumption: null
                        },
                        {
                            month:'August',
                            consumption: null
                        },
                        {
                            month:'September',
                            consumption: null
                        },
                        {
                            month:'October',
                            consumption: null
                        },
                        {
                            month:'November',
                            consumption: null
                        },
                        {
                            month:'December',
                            consumption: null
                        },
                    ],
                }
            ] as ApiDataInterface[],
        }
    },
    getters: {
        getApiData: (state) => state.apiData,
    }
});
