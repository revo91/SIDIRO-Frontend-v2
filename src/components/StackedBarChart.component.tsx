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
  yAxisTitle?: string,
  xAxisTitle?: string,
  onDataClick?(dataIndex: number): void
}

export const StackedBarChart: React.FC<BarChartProps> = ({ data,
  chartTitle,
  yAxisUnit,
  yAxisTitle,
  xAxisTitle,
  onDataClick }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const theme = useTheme();
  useUpdateChartFontColor(chartInstance, '#fff');
  useUpdateStackedChartDatasets(chartInstance, data, yAxisTitle)

  const chartConfig = useMemo(() => {
    const handleClickDataPortion = (dataSliceIndex: number) => {
      if (onDataClick) {
        onDataClick(dataSliceIndex)
      }
    }

    return {
      type: 'bar',
      data,
      options: {
        interaction: {
          intersect: false,
          mode: 'point',
        },
        plugins: {
          legend: {
            labels: {
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
            title: {
              display: true,
              text: xAxisTitle ? xAxisTitle : '',
              font: {
                size: 18,
                weight: 400
              },
            },
          },
          y: {
            stacked: true,
            title: {
              text: yAxisTitle ? yAxisTitle : '',
              display: yAxisTitle ? true : false,
              color: theme.palette.text.primary,
              font: {
                size: 18,
                weight: 400
              },
            }
          }
        }
      }
    }
  }, [data, chartTitle, theme.palette.text.primary, yAxisTitle, onDataClick, yAxisUnit, xAxisTitle]);

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