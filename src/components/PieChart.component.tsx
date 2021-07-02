import Chart from 'chart.js/auto';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { SiemensAccentYellow } from '../utilities/SiemensColors.utility';
import { useUpdateChartFontColor } from '../hooks/useUpdateChartFontColor.hook';
import { useUpdateChartDatasets } from '../hooks/useUpdateChartDatasets.hook';

export interface PieChartProps {
  data: {
    labels?: Array<string>,
    datasets: Array<{ label: string, backgroundColor: Array<string>, borderColor?: Array<string>, borderWidth?: number, data: Array<number> }>
  },
  chartTitle?: string,
  onDataClick(dataIndex: number): void
  unit?: string
}

export const PieChart: React.FC<PieChartProps> = ({ data, chartTitle, onDataClick, unit }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const theme = useTheme();
  useUpdateChartFontColor(chartInstance, '#fff');
  useUpdateChartDatasets(chartInstance, data)

  const chartConfig = useMemo(() => {
    const handleClickDataPortion = (dataSliceIndex: number) => {
      onDataClick(dataSliceIndex)
    }

    return {
      type: 'pie',
      data,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context: any) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed
                }
                if (label && unit) {
                  label += ` ${unit}`;
                }
                return label;
              }
            }
          },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                size: 14
              }
            }
          },
        },
        legend: {
          labels: {
            fontColor: theme.palette.text.primary,
          }
        },
        'onClick': function (evt: any, item: any) {
          if (item && item[0]) {
            handleClickDataPortion(item[0].index)
          }
        },
        title: {
          display: chartTitle ? true : false,
          text: chartTitle ? chartTitle : '',
          fontColor: theme.palette.type === 'dark' ? SiemensAccentYellow.light6 : '#666',
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        },
        
      }
    }
  }, [data, chartTitle, theme.palette.type, theme.palette.text.primary, onDataClick, unit]);

  useEffect(() => {
    if (chartInstance === null) {
      setChartInstance(new Chart(chartContainer.current, chartConfig as any))
    }
  }, [data, chartInstance, chartTitle, chartConfig])

  return (
    <React.Fragment>
      <canvas ref={chartContainer} />
    </React.Fragment>
  )
}