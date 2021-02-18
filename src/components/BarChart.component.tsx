import Chart from 'chart.js';
import React, { useRef, useState, useEffect } from 'react';
import { PieChartProps } from './PieChart.component';

interface BarChartProps extends PieChartProps {
  horizontal?: boolean
}

export const BarChart: React.FC<BarChartProps> = ({ data, chartTitle, horizontal }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  useEffect(() => {
    //instantiate chart with first given data
    if (chartInstance === null) {
      setChartInstance(new Chart(chartContainer.current, {
        type: horizontal ? 'horizontalBar' : 'bar',
        data,
        options: {
          legend: { display: false },
          title: {
            display: chartTitle ? true : false,
            text: chartTitle ? chartTitle : ''
          }
        }
      }))
    }
  }, [data, chartInstance, chartTitle, horizontal])

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