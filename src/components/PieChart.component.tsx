import Chart from 'chart.js';
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
  chartTitle?: string
}

export const PieChart: React.FC<PieChartProps> = ({ data, chartTitle }) => {
  const chartContainer = useRef() as React.MutableRefObject<HTMLCanvasElement>;
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const theme = useTheme();
  useUpdateChartFontColor(chartInstance, SiemensAccentYellow.light6);
  useUpdateChartDatasets(chartInstance, data)

  const chartConfig = useMemo(() => {
    return {
      type: 'pie',
      data,
      options: {
        legend: {
          labels: {
            fontColor: theme.palette.text.primary,
            fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
            fontSize: 12
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
  }, [data, chartTitle, theme.palette.type, theme.palette.text.primary]);

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