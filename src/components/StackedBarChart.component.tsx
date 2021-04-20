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
}

export const StackedBarChart: React.FC<BarChartProps> = ({ data, chartTitle }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const theme = useTheme();
  useUpdateChartFontColor(chartInstance, '#fff');
  useUpdateStackedChartDatasets(chartInstance, data)

  const chartConfig = useMemo(() => {
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
          title: {
            display: chartTitle ? true : false,
            text: chartTitle ? chartTitle : ''
          },
        },
        'onClick': function (evt: any, item: any) {
          if (item && item[0]) {
            console.log(item)
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
            stacked: true
          }
        }
      }
    }
  }, [data, chartTitle, theme.palette.text.primary]);

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