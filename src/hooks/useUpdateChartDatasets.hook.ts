import { useEffect } from 'react';
import Chart from 'chart.js';

export const useUpdateChartDatasets = (chartInstance: Chart | null,
  data: {
    labels?: Array<string>,
    datasets: Array<{ label: string, backgroundColor: Array<string> | string, borderColor?: Array<string> | string, borderWidth?: number, data: Array<{t: number | Date, y: number}> | Array<number> }>
  }) => {

  useEffect(() => {
    //update in case of datasets change
    if (chartInstance && chartInstance.data && chartInstance.data.datasets) {
      //replace datasets data one by one
      data.datasets.forEach((dataset, i) => {
        if (chartInstance.data.datasets && chartInstance.data.datasets[i] !== undefined) {
          chartInstance.data.datasets[i].data = dataset.data
        }
      })
      chartInstance.update()
    }
  }, [chartInstance, data])
}