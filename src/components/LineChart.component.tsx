import Chart from 'chart.js/auto';
import { ChartType } from 'chart.js';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useUpdateChartFontColor } from '../hooks/useUpdateChartFontColor.hook';
import { useUpdateChartDatasets } from '../hooks/useUpdateChartDatasets.hook';
import 'chartjs-adapter-date-fns';
import { useTranslation } from 'react-i18next';
import { pl, enUS } from 'date-fns/locale';

interface LineChartProps {
  data: {
    datasets: Array<{
      label: string,
      backgroundColor: string
      borderColor: string,
      lineTension: number,
      fill: boolean,
      data: Array<{
        x: number | Date,
        y: number
      }>,
      pointRadius?: number
    }>
  },
  chartTitle?: string,
  minTime?: Date | number,
  maxTime?: Date | number
}

export const LineChart: React.FC<LineChartProps> = ({ data, chartTitle, minTime, maxTime }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<any>(null);
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  useUpdateChartFontColor(chartInstance, '#fff');
  useUpdateChartDatasets(chartInstance, data)

  const typee: ChartType = 'line'
  const chartConfig = useMemo(() => {
    return {
      type: typee,
      data,
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          title: {
            display: chartTitle ? true : false,
            text: chartTitle ? chartTitle : '',
            fontColor: theme.palette.text.primary,
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            color: Chart.defaults.color
          },
          legend: {
            labels: {
              color: Chart.defaults.color
            }
          }
        },
        scales: {
          x: {
            type: 'time',
            title: {
              display: true,
              text: t('chart.timeAxisLabel')
            },
            ticks: {
              color: Chart.defaults.color
            },
            time: {
              displayFormats: {
                millisecond: 'HH:mm:ss.SSS',
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'HH'
              },
              tooltipFormat: 'PPpp'
            },
            adapters: {
              date: {
                locale: i18n.language === 'pl' ? pl : enUS,

              }
            }
          },
          y: {
            title: {
              display: true,
              text: t('chart.valueAxisLabel')
            },
            ticks: {
              color: Chart.defaults.color
            }
          }
        },
      },
    }
  }, [data, chartTitle, theme.palette.text.primary, i18n.language, t]);



  useEffect(() => {
    //instantiate chart with first given data
    if (chartInstance === null) {
      setChartInstance(new Chart(chartContainer.current, chartConfig))
    }
  }, [data, chartInstance, chartTitle, chartConfig])

  return (
    <React.Fragment>
      <canvas ref={chartContainer} />
    </React.Fragment>
  )
}