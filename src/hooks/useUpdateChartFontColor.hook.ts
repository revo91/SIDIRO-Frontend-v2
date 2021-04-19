import { useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';

export const useUpdateChartFontColor = (chartInstance: any | null, color: string) => {
  const theme = useTheme()

  useEffect(() => {
    //update font colors on theme change
    if (chartInstance?.options?.scales?.y) {
      chartInstance.options.scales.y = {
        ...chartInstance.options.scales.y,
        ticks: {
          ...chartInstance.options.scales.y.ticks,
          color: theme.palette.type === 'dark' ? color : '#666'
        }
      }
    }
    if (chartInstance?.options?.scales?.x) {
      chartInstance.options.scales.x = {
        ...chartInstance.options.scales.x,
        ticks: {
          ...chartInstance.options.scales.x.ticks,
          color: theme.palette.type === 'dark' ? color : '#666'
        }
      }
    }
    if (chartInstance?.options?.plugins?.legend?.title) {
      chartInstance.options.plugins.legend.title = {
        ...chartInstance.options.plugins.legend.title,
        color: theme.palette.type === 'dark' ? color : '#666',
      }
    }
    if(chartInstance?.options?.plugins?.legend?.labels) {
      chartInstance.options.plugins.legend.labels = {
        ...chartInstance.options.plugins.legend.labels,
        color: theme.palette.type === 'dark' ? color : '#666',
      }
    }
  }, [theme, chartInstance?.options, color])
}