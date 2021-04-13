import Chart from 'chart.js';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { PieChartProps } from './PieChart.component';
import { useTheme } from '@material-ui/core/styles';
import { SiemensAccentYellow } from '../utilities/SiemensColors.utility';
import { useUpdateChartFontColor } from '../hooks/useUpdateChartFontColor.hook';
import { useUpdateChartDatasets } from '../hooks/useUpdateChartDatasets.hook';

interface BarChartProps extends PieChartProps {
  horizontal?: boolean
}

export const BarChart: React.FC<BarChartProps> = ({ data, chartTitle, horizontal }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const theme = useTheme();
  useUpdateChartFontColor(chartInstance, SiemensAccentYellow.light6);
  useUpdateChartDatasets(chartInstance, data)

  const chartConfig = useMemo(() => {
    return {
      type: horizontal ? 'horizontalBar' : 'bar',
      data,
      options: {
        scales: {
          yAxes: [{
            ticks: {
              fontColor: theme.palette.type === 'dark' ? SiemensAccentYellow.light6 : '#666'
            }
          }],
          xAxes: [{
            ticks: {
              fontColor: theme.palette.type === 'dark' ? SiemensAccentYellow.light6 : '#666'
            }
          }]
        },
        legend: {
          display: false,
        },
        title: {
          display: chartTitle ? true : false,
          text: chartTitle ? chartTitle : '',
          fontColor: theme.palette.type === 'dark' ? SiemensAccentYellow.light6 : '#666',
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        }
      }
    }
  }, [data, chartTitle, horizontal, theme.palette.type]);

  useEffect(() => {
    //instantiate chart with first given data
    if (chartInstance === null) {
      //setChartInstance(new Chart(chartContainer.current, chartConfig))
    }
  }, [chartInstance, chartConfig])

  return (
    <React.Fragment>
      <canvas ref={chartContainer} />
    </React.Fragment>
  )
}