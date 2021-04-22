import Chart from 'chart.js/auto';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { useUpdateChartFontColor } from '../hooks/useUpdateChartFontColor.hook';
import { useUpdateStackedChartDatasets } from '../hooks/useUpdateStackedChartDatasets.hook';

interface BarChartProps {
  data: {
    labels?: Array<string>,
    datasets: Array<{ label: string, backgroundColor: string, borderColor?: Array<string>, borderWidth?: number, data: Array<number> }>
  },
  chartTitle?: string,
  yAxisUnit?: string,
  yAxisName?: string,
  onDataClick?(dataIndex: number): void
}

export const StackedBarChart: React.FC<BarChartProps> = ({ data, chartTitle, yAxisUnit, yAxisName, onDataClick }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const theme = useTheme();
  useUpdateChartFontColor(chartInstance, '#fff');
  useUpdateStackedChartDatasets(chartInstance, data, yAxisName)

  const chartConfig = useMemo(() => {
    const handleClickDataPortion = (dataSliceIndex: number) => {
      if(onDataClick) {
        onDataClick(dataSliceIndex)
      }
    }

    return {
      type: 'bar',
      data,
      options: {
        aspectRatio: 2.5,
        interaction: {
          intersect: false,
          mode: 'point',
        },
        plugins: {
          legend: {
            labels: {
              font: {
                fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
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
          title: {
            display: chartTitle ? true : false,
            text: chartTitle ? chartTitle : ''
          },

        },
        'onClick': function (evt: any, item: any) {
          if (item && item[0]) {
            handleClickDataPortion(item[0].datasetIndex)
          }
        },
        legend: {
          labels: {
            fontColor: theme.palette.text.primary,
          }
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            title: {
              text: yAxisName ? yAxisName : '',
              display: yAxisName ? true : false,
              color: theme.palette.text.primary
            }
          }
        }
      }
    }
  }, [data, chartTitle, theme.palette.text.primary, yAxisName, onDataClick, yAxisUnit]);

  useEffect(() => {
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