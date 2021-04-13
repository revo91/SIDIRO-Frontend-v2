import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LineChart } from '../LineChart.component';
import { SiemensAccentTeal, SiemensAccentGreen, SiemensAccentRed } from '../../utilities/SiemensColors.utility';
import { DatePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';
import { fetchTimeseriesInterval } from '../../services/FetchTimeseriesAPI.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { setDeviceDataDialogDateFrom } from '../../actions/DeviceDataDialog.action';

interface ITHDU {
  THD_U_L1: number
  THD_U_L2: number
  THD_U_L3: number
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

export const THDUTab = () => {
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
      fetchTimeseriesInterval(assetID, 1, new Date(new Date(dateFrom.setHours(0, 0, 0, 0))).toISOString(), new Date(new Date(dateFrom.setHours(23, 59, 59, 999))).toISOString(), 'THD_U_L1,THD_U_L2,THD_U_L3').then(res => {
        const pointsL1: Array<{ x: number, y: number }> = []
        const pointsL2: Array<{ x: number, y: number }> = []
        const pointsL3: Array<{ x: number, y: number }> = []
        res.forEach((point: ITHDU) => {
          pointsL1.push({
            x: new Date(point._time).valueOf(),
            y: point.THD_U_L1
          })
          pointsL2.push({
            x: new Date(point._time).valueOf(),
            y: point.THD_U_L2
          })
          pointsL3.push({
            x: new Date(point._time).valueOf(),
            y: point.THD_U_L3
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
                  label: `THD U L1 [%]`,
                  backgroundColor: SiemensAccentRed.dark6,
                  borderColor: SiemensAccentRed.dark6,
                  fill: false,
                  lineTension: 0,
                  data: l1,
                  pointRadius: 0
                },
                {
                  label: `THD U L2 [%]`,
                  backgroundColor: SiemensAccentGreen.dark6,
                  borderColor: SiemensAccentGreen.dark6,
                  fill: false,
                  lineTension: 0,
                  data: l2,
                  pointRadius: 0
                },
                {
                  label: `THD U L3 [%]`,
                  backgroundColor: SiemensAccentTeal.dark6,
                  borderColor: SiemensAccentTeal.dark6,
                  fill: false,
                  lineTension: 0,
                  data: l3,
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