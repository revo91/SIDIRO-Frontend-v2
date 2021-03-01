import Chart from 'chart.js';
import React, { useRef, useState, useEffect } from 'react';

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
  chartTitle?: string
}

export const LineChart: React.FC<LineChartProps> = ({ data,chartTitle }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    //instantiate chart with first given data
    if (chartInstance === null) {
      setChartInstance(new Chart(chartContainer.current, {
        type: 'line',
        data,
        options: {
          scales: {
            xAxes: [{
              type: 'time',
              distribution: 'linear',
              ticks: {
                source: 'auto',
                autoSkip: true,
              },
              time: {
                tooltipFormat: "YYYY-MM-DD HH:mm:ss",
                displayFormats: {
                  millisecond: "HH:mm:ss",
                  second: "HH:mm:ss",
                  minute: "HH:mm",
                  hour: "HH",
                  day: "MMM D"
                },
              },
              
            }]
          },
          title: {
            display: chartTitle ? true : false,
            text: chartTitle ? chartTitle : ''
          },
          tooltips: {
            intersect: false,
          },
          responsive: true,
          maintainAspectRatio: true,
          aspectRatio: 3
        },
      }))
    }
  }, [data, chartInstance, chartTitle])

  useEffect(() => {
    //update in case of datasets change
    if (chartInstance && chartInstance.data && chartInstance.data.datasets) {
      //replace datasets data one by one
      data.datasets.forEach((dataset, i) => {
        if (chartInstance.data.datasets && chartInstance.data.datasets[i] !== undefined) {
          chartInstance.data.datasets[i].data = dataset.data
        }
      })
      chartInstance.update()
    }
  }, [chartInstance, data])


  return (
    <React.Fragment>
      <canvas ref={chartContainer} />
    </React.Fragment>
  )
}