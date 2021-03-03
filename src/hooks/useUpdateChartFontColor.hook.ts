import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import Chart from 'chart.js';

export const useUpdateChartFontColor = (chartInstance: Chart | null, color: string) => {
  const theme = useTheme()

  useEffect(() => {
    //update font colors on theme change
    if (chartInstance?.options?.scales?.yAxes) {
      chartInstance.options.scales.yAxes = [{
        ...chartInstance.options.scales.yAxes[0],
        ticks: {
          ...chartInstance.options.scales.yAxes[0].ticks,
          fontColor: theme.palette.type === 'dark' ? color : '#666'
        }
      }]
    }
    if (chartInstance?.options?.scales?.xAxes) {
      chartInstance.options.scales.xAxes = [{
        ...chartInstance.options.scales.xAxes[0],
        ticks: {
          ...chartInstance.options.scales.xAxes[0].ticks,
          fontColor: theme.palette.type === 'dark' ? color : '#666'
        }
      }]
    }
    if (chartInstance?.options?.title) {
      chartInstance.options.title = {
        ...chartInstance.options.title,
        fontColor: theme.palette.type === 'dark' ? color : '#666',
      }
    }
    if(chartInstance?.options?.legend?.labels) {
      chartInstance.options.legend.labels = {
        ...chartInstance.options.legend.labels,
        fontColor: theme.palette.type === 'dark' ? color : '#666',
      }
    }
  }, [theme, chartInstance?.options, color])
}