import React from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { BarChart } from './BarChart.component';
import { PieChart } from './PieChart.component';
import { siemensColors } from '../utilities/siemensColors';
import { siemensColorsAlpha } from '../utilities/siemensColors';
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
                backgroundColor: [siemensColorsAlpha.tealLightAlpha, siemensColorsAlpha.redDarkAlpha, siemensColorsAlpha.redLightAlpha, siemensColorsAlpha.blueDarkAlpha, siemensColorsAlpha.yellowDarkAlpha],
                borderColor: [siemensColors.tealLight, siemensColors.redDark, siemensColors.redLight, siemensColors.blueDark, siemensColors.yellowDark],
                borderWidth: 2,
                data: sampleData
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
                backgroundColor: [siemensColors.tealLight, siemensColors.redDark, siemensColors.redLight, siemensColors.blueDark, siemensColors.yellowDark],
                data: sampleData
              }
            ]
          }} />
      </Grid>
      <Grid item xs={12}>
        <LineChart
          chartTitle="something"
          data={{
            datasets: [
              {
                label: "dataset1",
                backgroundColor: siemensColors.tealLight,
                borderColor: siemensColors.tealLight,
                fill: false,
                lineTension: 0,
                data: sampleTimeSeriesData
              },
              {
                label: "dataset2",
                backgroundColor: siemensColors.yellowDark,
                borderColor: siemensColors.yellowDark,
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