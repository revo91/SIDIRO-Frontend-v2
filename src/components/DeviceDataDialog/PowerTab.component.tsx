import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LineChart } from '../LineChart.component';
import { SiemensAccentTeal, SiemensAccentGreen, SiemensAccentRed, SiemensAccentBlue } from '../../utilities/SiemensColors.utility';
import { DatePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';
import { fetchTimeseriesInterval } from '../../services/FetchTimeseriesAPI.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { setDeviceDataDialogDateFrom } from '../../actions/DeviceDataDialog.action';

interface IPower {
  Active_Power_Export: number
  Active_Power_Import: number
  Reactive_Power_Export: number
  Reactive_Power_Import: number
  _time: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timePickersContainer: {
      marginTop: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }
  }),
);

export const PowerTab = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [activePowerExport, setActivePowerExport] = React.useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [reactivePowerExport, setReactivePowerExport] = React.useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [activePowerImport, setActivePowerImport] = React.useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [reactivePowerImport, setRectivePowerImport] = React.useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const assetID = useSelector((state: RootState) => state.deviceDataDialog.assetID);
  const dateFrom = useSelector((state: RootState) => state.deviceDataDialog.dateFrom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateFrom) {
      fetchTimeseriesInterval(assetID, 15, 
        new Date(new Date(dateFrom.setHours(0, 0, 0, 0))).toISOString(), 
        new Date(new Date(dateFrom.setHours(23, 59, 59, 999))).toISOString(), 
        'Active_Power_Export,Active_Power_Import,Reactive_Power_Export,Reactive_Power_Import').then(res => {
        const activePowerExportPoints: Array<{ x: number, y: number }> = []
        const reactivePowerExportPoints: Array<{ x: number, y: number }> = []
        const activePowerImportPoints: Array<{ x: number, y: number }> = []
        const reactivePowerImportPoints: Array<{ x: number, y: number }> = []
        res.forEach((point: IPower) => {
          activePowerExportPoints.push({
            x: new Date(point._time).valueOf(),
            y: point.Active_Power_Export
          })
          reactivePowerExportPoints.push({
            x: new Date(point._time).valueOf(),
            y: point.Reactive_Power_Export
          })
          activePowerImportPoints.push({
            x: new Date(point._time).valueOf(),
            y: point.Active_Power_Import
          })
          reactivePowerImportPoints.push({
            x: new Date(point._time).valueOf(),
            y: point.Reactive_Power_Import
          })
        })
        setActivePowerExport(activePowerExportPoints)
        setReactivePowerExport(reactivePowerExportPoints)
        setActivePowerImport(activePowerImportPoints)
        setRectivePowerImport(reactivePowerImportPoints)
      })
    }
  }, [dateFrom, assetID])

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart
            data={{
              datasets: [
                {
                  label: `${t('deviceDataDialog.activePowerExport')} [kW]`,
                  backgroundColor: SiemensAccentRed.dark6,
                  borderColor: SiemensAccentRed.dark6,
                  fill: false,
                  lineTension: 0,
                  data: activePowerExport,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.activePowerImport')} [kW]`,
                  backgroundColor: SiemensAccentGreen.dark6,
                  borderColor: SiemensAccentGreen.dark6,
                  fill: false,
                  lineTension: 0,
                  data: activePowerImport,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.reactivePowerExport')} [kvar]`,
                  backgroundColor: SiemensAccentTeal.dark6,
                  borderColor: SiemensAccentTeal.dark6,
                  fill: false,
                  lineTension: 0,
                  data: reactivePowerExport,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.reactivePowerImport')} [kvar]`,
                  backgroundColor: SiemensAccentBlue.light3,
                  borderColor: SiemensAccentBlue.light3,
                  fill: false,
                  lineTension: 0,
                  data: reactivePowerImport,
                  pointRadius: 0
                }
              ]
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.timePickersContainer}>
        <Grid item xs={12} md={6}>
          <DatePicker
            variant='static'
            autoOk
            label={t('eventsPage.dateFromLabel')}
            value={dateFrom}
            onChange={(date) => dispatch(setDeviceDataDialogDateFrom(date))}
            fullWidth
            disableFuture
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}