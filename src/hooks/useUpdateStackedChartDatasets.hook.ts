import { useEffect } from 'react';
import Chart from 'chart.js/auto';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export const useUpdateStackedChartDatasets = (chartInstance: Chart | null,
  data: {
    labels?: Array<string>,
    datasets: Array<{
      label: string,
      data: Array<number>,
      backgroundColor: string
    }>
  },
  yAxisTitle?: string) => {
  const removeExcessiveDatasets = (array: Array<any>, numberOfPops: number) => {
    while (numberOfPops > 0) {
      array.pop()
      numberOfPops--
    }
  }
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    //update in case of datasets change
    if (chartInstance && chartInstance.data && chartInstance.data.datasets && chartInstance.data.labels) {
      if (yAxisTitle && chartInstance.options.scales.y.title.text) {
        chartInstance.options.scales.y.title.text = yAxisTitle
      }
      chartInstance.data.labels = data.labels
      //replace datasets data one by one
      data.datasets.forEach((dataset, i) => {
        if (chartInstance.data.datasets[i]) {
          chartInstance.data.datasets[i].data = dataset.data
          chartInstance.data.datasets[i].label = dataset.label
          chartInstance.data.datasets[i].backgroundColor = dataset.backgroundColor
        }
        else {
          chartInstance.data.datasets.push({
            data: dataset.data,
            label: dataset.label,
            backgroundColor: dataset.backgroundColor
          })
        }
      })
      if (chartInstance.data.datasets.length > data.datasets.length) {
        removeExcessiveDatasets(chartInstance.data.datasets, chartInstance.data.datasets.length - data.datasets.length)
      }
      if (data.labels) {
        data.labels.forEach((label, i) => {
          chartInstance.data.labels[i] = label
        })
      }
      if(matches && chartInstance.config._config.type === 'bar') {
        chartInstance.options.aspectRatio = 2.5
      }
      else {
        chartInstance.options.aspectRatio = 1
      }
      chartInstance.update()
    }
  }, [chartInstance, data, yAxisTitle, matches])
}