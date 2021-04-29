import React, { useEffect, useState } from 'react';
import { UniversalTable } from '../UniversalTable.component';
import Grid from '@material-ui/core/Grid';
import { LineChart } from '../LineChart.component';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { format } from 'date-fns';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';

interface ILoadMonitoringTab {
  chartData: any
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    marginTopBottom: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2)
    },
    marginBottom: {
      marginBottom: theme.spacing(2)
    },
    marginTop: {
      marginTop: theme.spacing(2)
    },
    alignRight: {
      textAlign: 'right'
    }
  })
)

export const LoadMonitoringTab: React.FC<ILoadMonitoringTab> = ({ chartData }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const powermonitorConfig = useSelector((state: RootState) => state.powermonitor);
  const [datasets, setDatasets] = useState<Array<{
    label: string,
    backgroundColor: string,
    borderColor: string,
    fill: boolean,
    lineTension: number,
    data: Array<{
      x: number,
      y: number
    }>,
    pointRadius: number,
    borderDash?: Array<number>
  }>>()
  const [timetable, setTimetable] = useState<Array<Array<string | number | Date>>>()
  const [predictedPower, setPredictedPower] = useState<number>()

  useEffect(() => {
    if (chartData) {
      const data = []
      const alertPoints = chartData.alertPoints.map((point: any) => {
        return {
          x: point.tickId,
          y: parseFloat((point.value).toFixed(3))
        }
      })
      const warningPoints = chartData.warningPoints.map((point: any) => {
        return {
          x: point.tickId,
          y: parseFloat((point.value).toFixed(3))
        }
      })
      const historicalPoints = chartData.historicalPoints.map((point: any) => {
        return {
          x: point.tickId,
          y: parseFloat((point.value).toFixed(3))
        }
      })
      const predictedPoints = chartData.predictedPoints.map((point: any) => {
        return {
          x: point.tickId,
          y: parseFloat((point.value).toFixed(3))
        }
      })

      const historicalPointsWithoutZero = historicalPoints.filter((el: any, index: number) => index !== 0)
      const tableData = historicalPointsWithoutZero.map((point: any, index: number) => {
        return [format(point.x, 'HH:mm:ss'), `${parseFloat((point.y * 60 / (index + 1)).toFixed(3))} kW`]
      })
      data.push({
        label: t('reportsPage.warningThreshold'),
        backgroundColor: 'orange',
        borderColor: 'orange',
        fill: false,
        lineTension: 0,
        data: warningPoints,
        pointRadius: 0,
        borderDash: [5],
      })
      data.push({
        label: t('reportsPage.alarmThreshold'),
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
        lineTension: 0,
        data: alertPoints,
        pointRadius: 0,
        borderDash: [5],
      })
      data.push({
        label: t('powermonitorPage.energyUsageLabel'),
        backgroundColor: decideDataColor(0),
        borderColor: decideDataColor(0),
        fill: true,
        lineTension: 0,
        data: historicalPoints,
        pointRadius: 0,
      })

      data.push({
        label: t('powermonitorPage.predictedUsageLabel'),
        backgroundColor: 'rgba(65, 170, 170, 0.5)',
        borderColor: 'rgba(65, 170, 170, 0.5)',
        fill: true,
        lineTension: 0,
        data: historicalPoints.filter((el: any, index: number) => index !== historicalPoints.length - 1).concat(predictedPoints),
        pointRadius: 0,
      })
      setPredictedPower(parseFloat(chartData.predictedPower.toFixed(3)))
      setDatasets(data)
      setTimetable(tableData)
    }
  }, [chartData, setDatasets, t])

  const setAlertType = () => {
    if (predictedPower !== undefined && powermonitorConfig) {
      if (predictedPower > powermonitorConfig.alertLimit) {
        return 'error'
      }
      else if (predictedPower > powermonitorConfig.warningLimit) {
        return 'warning'
      }
      return 'success'
    }
  }

  return (
    <React.Fragment>
      {powermonitorConfig && powermonitorConfig.enabled ?
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h5'>{t('powermonitorPage.current15minInterval')}</Typography>
          </Grid>
          {timetable ?
            <Grid item xs={12} lg={6} xl={5}>
              <UniversalTable
                columns={[t('powermonitorPage.tableTimeColumn'), t('powermonitorPage.tableValueColumn')]}
                rows={timetable}
              />
              <Alert severity={setAlertType()} className={classes.marginTop}>
                <AlertTitle>{t('powermonitorPage.predictedPower')}: {predictedPower || 0} kW</AlertTitle>
                <p>{t('powermonitorPage.warningThreshold')}: <strong>{powermonitorConfig.warningLimit || 0} kW</strong></p>
                <p>{t('powermonitorPage.alarmThreshold')}: <strong>{powermonitorConfig.alertLimit || 0} kW</strong></p>
              </Alert>
            </Grid>
            : null}
          {datasets ?
            <Grid item xs={12} lg={6} xl={7}>
              <LineChart
                data={{
                  datasets: datasets
                }}
                xAxisTitle={t('chart.timeAxisLabel')}
                yAxisTitle={t('powermonitorPage.energyUsage')}
                timeInterval='minute'
                tooltipFormat='kk:mm:ss'
                yAxisUnit='kWh'
              />
            </Grid>
            : null}
        </Grid>
        :
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant='h5'>{t('powermonitorPage.powermonitorInactive')}</Typography>
          </Grid>
        </Grid>
      }

    </React.Fragment>
  )
}