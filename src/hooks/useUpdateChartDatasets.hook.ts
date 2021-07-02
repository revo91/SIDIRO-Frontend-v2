import { useEffect } from 'react';
import 'chartjs-adapter-date-fns';
import { pl, enUS } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export const useUpdateChartDatasets = (chartInstance: any,
  data: {
    labels?: Array<string>,
    datasets: Array<{ label: string, backgroundColor: Array<string> | string, borderColor?: Array<string> | string, borderWidth?: number, data: Array<{ x: number | Date, y: number }> | Array<number> }>
  },
  locale?: string,
  yAxisTitle?: string,
  xAxisTitle?: string) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    //update in case of datasets change
    if (chartInstance) {
      if (chartInstance.data && chartInstance.data.datasets) {
        //replace datasets data one by one
        data.datasets.forEach((dataset, i) => {
          if (chartInstance.data.datasets && chartInstance.data.datasets[i] !== undefined) {
            chartInstance.data.datasets[i].data = dataset.data
            chartInstance.data.datasets[i].label = dataset.label
          }
        })
        chartInstance.data.labels = data.labels;
      }
      if (chartInstance?.options?.scales?.x?.adapters?.date?.locale && locale) {
        chartInstance.options.scales.x.adapters.date.locale = i18n.language === 'pl' ? pl : enUS
      }
      if (chartInstance?.options?.scales?.x?.title && xAxisTitle) {
        chartInstance.options.scales.x.title.text = xAxisTitle
      }
      if (chartInstance?.options?.scales?.y?.title && yAxisTitle) {
        chartInstance.options.scales.y.title.text = yAxisTitle
      }
      if(matches && chartInstance.config._config.type === 'line') {
        chartInstance.options.aspectRatio = 2.5
      }
      else {
        chartInstance.options.aspectRatio = 1
      }
      chartInstance.update()
    }
  }, [chartInstance, data, i18n.language, locale, yAxisTitle, xAxisTitle, matches])
}