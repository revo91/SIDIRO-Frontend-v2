import Chart from 'chart.js';
import React, { useRef, useState, useEffect } from 'react';

export interface PieChartProps {
  data: {
    labels: Array<string>,
    datasets: Array<{ label: string, backgroundColor: Array<string>, borderColor?: Array<string>, borderWidth?: number,  data: Array<number> }>
  },
  chartTitle?: string
}

export const PieChart: React.FC<PieChartProps> = ({ data, chartTitle }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    if (chartInstance === null) {
      setChartInstance(new Chart(chartContainer.current, {
        type: 'pie',
        data,
        options: {
          title: {
            display: chartTitle ? true : false,
            text: chartTitle ? chartTitle : ''
          }
        }
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