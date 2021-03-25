import Chart from 'chart.js';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { SiemensAccentYellow } from '../utilities/SiemensColors.utility';
import { useUpdateChartFontColor } from '../hooks/useUpdateChartFontColor.hook';
import { useUpdateChartDatasets } from '../hooks/useUpdateChartDatasets.hook';

interface LineChartProps {
  data: {
    datasets: Array<{
      label: string,
      backgroundColor: string
      borderColor: string,
      lineTension: number,
			fill: boolean,
      data: Array<{
        t: number | Date,
        y: number
      }>
    }>
  },
  chartTitle?: string,
  minTime?: Date | number,
  maxTime?: Date | number
}

export const LineChart: React.FC<LineChartProps> = ({ data,chartTitle, minTime, maxTime }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const theme = useTheme();
  useUpdateChartFontColor(chartInstance, SiemensAccentYellow.light6); 
  useUpdateChartDatasets(chartInstance, data)
 
  if(Chart.defaults.global.elements?.point?.radius)
  {
    Chart.defaults.global.elements.point.radius = 0
  }

  const chartConfig = useMemo(() => {
    return {
      type: 'line',
      data,
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            //distribution: 'auto',
            ticks: {
              //source: 'auto',
              autoSkip: true,
              fontColor: theme.palette.type === 'dark' ? SiemensAccentYellow.light6 : '#666'
            },
            time: {
             
              tooltipFormat: "YYYY-MM-DD HH:mm:ss",
              displayFormats: {
                millisecond: "HH:mm:ss",
                second: "HH:mm:ss",
                minute: "HH:mm",
                hour: "HH:mm:ss",
                day: "MMM D",
                
              },
            },
          }],
          yAxes: [{
            ticks: {
              fontColor: theme.palette.type === 'dark' ? SiemensAccentYellow.light6 : '#666'
            }
          }]
        },
        title: {
          display: chartTitle ? true : false,
          text: chartTitle ? chartTitle : '',
          fontColor: theme.palette.text.primary,
          fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        },
        tooltips: {
          intersect: false,
        },
        legend: {
          labels: {
            fontColor: theme.palette.type === 'dark' ? SiemensAccentYellow.light6 : '#666',
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontSize: 12
          }
        },
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 3,
      },
    }
  }, [data, chartTitle, theme.palette.type, theme.palette.text.primary]);

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