import React from 'react';
import { UniversalTable } from '../UniversalTable.component';
import Grid from '@material-ui/core/Grid';
import { LineChart } from '../LineChart.component';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { useTranslation } from 'react-i18next';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

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

export const LoadMonitoringTab = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography gutterBottom variant='h5'>{t('powermonitorPage.current15minInterval')}</Typography>
      </Grid>
      <Grid item xs={12} lg={6} xl={5}>
        <UniversalTable
          columns={[t('powermonitorPage.tableTimeColumn'), t('powermonitorPage.tableValueColumn')]}
          rows={[[new Date().toISOString(), 100], [new Date().toISOString(), 200]]}
        />
        <Alert severity="success" className={classes.marginTop}>
          <AlertTitle>{t('powermonitorPage.predictedPower')}: 250 kW</AlertTitle>
          <p>{t('powermonitorPage.warningThreshold')}: <strong>450 kW</strong></p>
          <p>{t('powermonitorPage.alarmThreshold')}: <strong>510 kW</strong></p>
        </Alert>
      </Grid>
      <Grid item xs={12} lg={6} xl={7}>
        <LineChart
          data={{
            datasets: [{
              label: 'label1',
              backgroundColor: 'rgba(65, 170, 170, 0.5)',
              borderColor: decideDataColor(0),
              fill: true,
              lineTension: 0,
              data: [{
                x: new Date().valueOf() - 1000000,
                y: 100
              },
              {
                x: new Date().valueOf() - 500000,
                y: 125
              },
              {
                x: new Date().valueOf(),
                y: 150
              }],
              pointRadius: 0
            },
            {
              label: 'label2',
              backgroundColor: 'orange',
              borderColor: 'orange',
              fill: false,
              lineTension: 0,
              borderDash: [5],
              data: [{
                x: new Date().valueOf() - 1000000,
                y: 100
              },
              {
                x: new Date().valueOf() - 500000,
                y: 150
              },
              {
                x: new Date().valueOf(),
                y: 200
              }],
              pointRadius: 0
            },
            {
              label: 'label3',
              backgroundColor: 'red',
              borderColor: 'red',
              fill: false,
              lineTension: 0,
              borderDash: [5],
              data: [{
                x: new Date().valueOf() - 1000000,
                y: 100
              },
              {
                x: new Date().valueOf() - 500000,
                y: 175
              },
              {
                x: new Date().valueOf(),
                y: 250
              }],
              pointRadius: 0
            }]
          }}
          xAxisTitle={t('chart.timeAxisLabel')}
          yAxisTitle={t('powermonitorPage.energyUsage')}
          timeInterval='minute'
          tooltipFormat='kk:mm:ss'
          yAxisUnit=''
        />
      </Grid>
    </Grid>
  )
}