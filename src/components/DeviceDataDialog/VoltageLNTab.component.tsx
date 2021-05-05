import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LineChart } from '../LineChart.component';
import { DatePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';
import { fetchTimeseriesInterval } from '../../services/FetchTimeseriesAPI.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { setDeviceDataDialogDateFrom } from '../../actions/DeviceDataDialog.action';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import Fab from '@material-ui/core/Fab';
import GetAppIcon from '@material-ui/icons/GetApp';

interface IVoltageLN {
  Voltage_L1_N: number
  Voltage_L2_N: number
  Voltage_L3_N: number
  _time: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timePickersContainer: {
      marginTop: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

export const VoltageLNTab = () => {
  //const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date());
  const classes = useStyles();
  const { t } = useTranslation();
  const [l1, setL1] = React.useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [l2, setL2] = React.useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [l3, setL3] = React.useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const assetID = useSelector((state: RootState) => state.deviceDataDialog.assetID);
  const dateFrom = useSelector((state: RootState) => state.deviceDataDialog.dateFrom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateFrom) {
      fetchTimeseriesInterval(assetID, 1, new Date(new Date(dateFrom.setHours(0, 0, 0, 0))).toISOString(), new Date(new Date(dateFrom.setHours(23, 59, 59, 999))).toISOString(), 'Voltage_L1_N,Voltage_L2_N,Voltage_L3_N').then(res => {
        const pointsL1: Array<{ x: number, y: number }> = []
        const pointsL2: Array<{ x: number, y: number }> = []
        const pointsL3: Array<{ x: number, y: number }> = []
        res.forEach((point: IVoltageLN) => {
          pointsL1.push({
            x: new Date(point._time).valueOf(),
            y: point.Voltage_L1_N
          })
          pointsL2.push({
            x: new Date(point._time).valueOf(),
            y: point.Voltage_L2_N
          })
          pointsL3.push({
            x: new Date(point._time).valueOf(),
            y: point.Voltage_L3_N
          })
        })
        setL1(pointsL1)
        setL2(pointsL2)
        setL3(pointsL3)
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
                  label: `${t('deviceDataDialog.voltageL1N')}`,
                  backgroundColor: decideDataColor(0),
                  borderColor: decideDataColor(0),
                  fill: false,
                  lineTension: 0,
                  data: l1,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.voltageL2N')}`,
                  backgroundColor: decideDataColor(1),
                  borderColor: decideDataColor(1),
                  fill: false,
                  lineTension: 0,
                  data: l2,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.voltageL3N')}`,
                  backgroundColor: decideDataColor(2),
                  borderColor: decideDataColor(2),
                  fill: false,
                  lineTension: 0,
                  data: l3,
                  pointRadius: 0
                }
              ]
            }}
            yAxisUnit={'V'}
            xAxisTitle={t('chart.timeAxisLabel')}
            yAxisTitle={t('chart.valueAxisLabel')}
          />
        </Grid>
        <Grid item xs={12}>
          <Fab
            variant="extended"
            color="secondary"
            aria-label="export-to-csv"
            className={classes.margin}
          >
            <GetAppIcon className={classes.extendedIcon} />
          {t('deviceDataDialog.exportCSVTitle')}
        </Fab>
        </Grid>
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