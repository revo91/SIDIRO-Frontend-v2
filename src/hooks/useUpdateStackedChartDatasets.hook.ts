import { useEffect } from 'react';
import Chart from 'chart.js';

export const useUpdateStackedChartDatasets = (chartInstance: Chart | null,
  data: {
    labels?: Array<string>,
    datasets: Array<{
      label: string,
      data: Array<number>,
      backgroundColor: string
    }>
  }) => {

  useEffect(() => {
    //update in case of datasets change
    if (chartInstance && chartInstance.data && chartInstance.data.datasets && chartInstance.data.labels) {
      chartInstance.data.labels = data.labels
      //replace datasets data one by one
      data.datasets.forEach((dataset, i) => {
        if (chartInstance.data.datasets && chartInstance.data.datasets[i] !== undefined) {
          chartInstance.data.datasets[i].data = dataset.data
          
        }
      })
      //chartInstance.data.labels = data.labels;
      chartInstance.update()
    }
  }, [chartInstance, data])
}