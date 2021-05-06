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
      borderDash?: Array<number>,
      data: Array<{
        x: number | Date,
        y: number
      }>,
      pointRadius?: number
    }>
  },
  timeInterval?: string,
  chartTitle?: string,
  xAxisTitle?: string,
  yAxisTitle?: string,
  yAxisUnit?: string,
  tooltipFormat?: string
}

export const LineChart: React.FC<LineChartProps> = ({ data, chartTitle, xAxisTitle, yAxisTitle, timeInterval, yAxisUnit, tooltipFormat }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<any>(null);
  const theme = useTheme();
  const { i18n } = useTranslation();
  useUpdateChartFontColor(chartInstance, '#fff');
  useUpdateChartDatasets(chartInstance, data, i18n.language, yAxisTitle, xAxisTitle)
  
  const chartType: ChartType = 'line'
  const chartConfig = useMemo(() => {
    return {
      type: chartType,
      data,
      options: {
        responsive: true,
        aspectRatio: 3,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          title: {
            display: chartTitle ? true : false,
            text: chartTitle ? chartTitle : '',
            fontColor: theme.palette.text.primary,
            color: Chart.defaults.color
          },
          legend: {
            labels: {
              color: Chart.defaults.color,
              font: {
                size: 14
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function (context: any) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y
                }
                if (label && yAxisUnit) {
                  label += ` ${yAxisUnit}`;
                }
                return label;
              }
            }
          },
        },
        scales: {
          x: {
            type: 'time',
            title: {
              display: true,
              text: xAxisTitle ? xAxisTitle : '',
              font: {
                size: 18,
                weight: 400
              },
            },
            ticks: {
              color: Chart.defaults.color,

            },
            time: {
              displayFormats: {
                millisecond: 'HH:mm:ss.SSS',
                second: 'HH:mm:ss',
                minute: 'HH:mm',
                hour: 'HH',
              },
              tooltipFormat: tooltipFormat ? tooltipFormat : 'PPpp',
              unit: timeInterval ? timeInterval : false
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
              text: yAxisTitle ? yAxisTitle : '',
              font: {
                size: 18,
                weight: 400
              },
            },
            ticks: {
              color: Chart.defaults.color
            }
          }
        },
      },
    }
  }, [data, chartTitle, theme.palette.text.primary, i18n.language, xAxisTitle, yAxisTitle, yAxisUnit, timeInterval, tooltipFormat]);

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