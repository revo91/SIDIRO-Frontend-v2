import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LineChart } from '../LineChart.component';
import { SiemensAccentTeal, SiemensAccentGreen, SiemensAccentRed, SiemensAccentBlue } from '../../utilities/SiemensColors.utility';
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timePickersContainer: {
      marginTop: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }
  }),
);

export const THDITab = () => {
  const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date());
  const classes = useStyles();
  const { t } = useTranslation();
  const [l1, setL1] = React.useState<Array<{t: number | Date, y: number}>>([{t: 0, y: 0}])
  const [l2, setL2] = React.useState<Array<{t: number | Date, y: number}>>([{t: 0, y: 0}])
  const [l3, setL3] = React.useState<Array<{t: number | Date, y: number}>>([{t: 0, y: 0}])

  const generateSampleData = () => {
    let arr1 = []
    let arr2 = []
    let arr3 = []
    for (let i = 0; i < 25; i++) {
      arr1.push({
        t: new Date(2021, 2, i+1, 1),
        y: 30+ Math.random()*10
      })
      arr2.push({
        t: new Date(2021, 2, i+1, 1),
        y: 30+ Math.random()*10
      })
      arr3.push({
        t: new Date(2021, 2, i+1, 1),
        y: 4
      })
    }
    setL1(arr1)
    setL2(arr2)
    setL3(arr3)
  }

  React.useEffect(()=>{
    generateSampleData()
  },[])

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart
            data={{
              datasets: [
                {
                  label: "THD I L1 [%]",
                  backgroundColor: SiemensAccentTeal.light1,
                  borderColor: SiemensAccentTeal.light1,
                  fill: false,
                  lineTension: 0,
                  data: l1
                },
                {
                  label: "THD I L2 [%]",
                  backgroundColor: SiemensAccentRed.light1,
                  borderColor: SiemensAccentRed.light1,
                  fill: false,
                  lineTension: 0,
                  data: l2
                },
                {
                  label: "THD I L3 [%]",
                  backgroundColor: SiemensAccentGreen.light1,
                  borderColor: SiemensAccentGreen.light1,
                  fill: false,
                  lineTension: 0,
                  data: l3
                }
              ]
            }} />
        </Grid>
      </Grid>
      <Grid container spacing={2} className={classes.timePickersContainer}>
        <Grid item xs={12} md={6}>
          <DatePicker
            variant='static'
            autoOk
            label={t('eventsPage.dateFromLabel')}
            value={dateFrom}
            onChange={changeDateFrom}
            fullWidth
            disableFuture
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TimePicker
            ampm={false}
            variant='static'
            autoOk
            label={t('eventsPage.dateFromLabel')}
            value={dateFrom}
            onChange={changeDateFrom}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}