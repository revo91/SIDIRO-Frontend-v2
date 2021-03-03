import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { BarChart } from './BarChart.component';
import { PieChart } from './PieChart.component';
import { SiemensColors } from '../utilities/SiemensColors.utility';
import { SiemensColorsAlpha } from '../utilities/SiemensColors.utility';
import { LineChart } from './LineChart.component';
import { UniversalTabs } from './UniversalTabs.component';

export const Reports = () => {
  const { t } = useTranslation();
  const [sampleData, setSampleData] = React.useState<Array<number>>([2478, 5267, 734, 784, 433])
  const [sampleTimeSeriesData, setSampleTimeSeriesData] = React.useState<Array<{ t: number | Date, y: number }>>([{ t: new Date(2021, 1, 1), y: 10 }, { t: new Date(2021, 1, 5), y: 10 }, { t: new Date(2021, 1, 9), y: 10 }])

  React.useEffect(() => {
    let interval = setInterval(() => {
      setSampleData(sampleData.map(() => Math.random() * 100))
      setSampleTimeSeriesData(sampleTimeSeriesData.map((data) => {
        return {
          t: data.t,
          y: Math.random() * 100
        }
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [sampleData, sampleTimeSeriesData])

  const energyConsumptionTab = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <BarChart
          chartTitle="barchart"
          data={{
            labels: ["Africa", "Asia", "Europe", "Latin America", "North Americaa"],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: [SiemensColorsAlpha.tealLightAlpha, SiemensColorsAlpha.redDarkAlpha, SiemensColorsAlpha.redLightAlpha, SiemensColorsAlpha.blueDarkAlpha, SiemensColorsAlpha.yellowDarkAlpha],
                borderColor: [SiemensColors.tealLight, SiemensColors.redDark, SiemensColors.redLight, SiemensColors.blueDark, SiemensColors.yellowDark],
                borderWidth: 2,
                data: sampleData,
                
              }
            ]
          }} />
      </Grid>
      <Grid item xs={12}>
        <PieChart
          chartTitle="something"
          data={{
            labels: ["Africa", "Asia", "Europe", "Latin America", "North Americaa"],
            datasets: [
              {
                label: "Population (millions)",
                backgroundColor: [SiemensColors.tealLight, SiemensColors.redDark, SiemensColors.redLight, SiemensColors.blueDark, SiemensColors.yellowDark],
                data: sampleData
              }
            ]
          }} />
      </Grid>
      <Grid item xs={12}>
        <LineChart
          data={{
            datasets: [
              {
                label: "dataset1",
                backgroundColor: SiemensColors.tealLight,
                borderColor: SiemensColors.tealLight,
                fill: false,
                lineTension: 0,
                data: sampleTimeSeriesData
              },
              {
                label: "dataset2",
                backgroundColor: SiemensColors.yellowDark,
                borderColor: SiemensColors.yellowDark,
                fill: false,
                lineTension: 0,
                data: [{ t: new Date(2021, 1, 1), y: 5 }, { t: new Date(2021, 1, 5), y: 7 }, { t: new Date(2021, 1, 9), y: 6 }]
              }
            ]
          }} />
      </Grid>
    </Grid>
  )

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{t('reportsPage.title')}</Typography>
        </Grid>
      </Grid>
      <UniversalTabs
        name='Reports'
        tabs={[
          {
            label: 'Energy consumption',
            content: energyConsumptionTab
          },
          {
            label: 'Power demand',
            content: <p>Power demand tab content</p>
          },
          {
            label: 'Supply parameters',
            content: <p>Supply parameters tab content</p>
          },
          {
            label: 'Infeeds parameters',
            content: <p>Infeeds parameters tab content</p>
          }
        ]}
      />

    </React.Fragment>
  )
}