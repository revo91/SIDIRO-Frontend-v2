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

export const PowerTab = () => {
  const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date());
  const classes = useStyles();
  const { t } = useTranslation();
  const [activePowerExport, setActivePowerExport] = React.useState<Array<{t: number | Date, y: number}>>([{t: 0, y: 0}])
  const [reactivePowerExport, setReactivePowerExport] = React.useState<Array<{t: number | Date, y: number}>>([{t: 0, y: 0}])
  const [activePowerImport, setActivePowerImport] = React.useState<Array<{t: number | Date, y: number}>>([{t: 0, y: 0}])
  const [reactivePowerImport, setRectivePowerImport] = React.useState<Array<{t: number | Date, y: number}>>([{t: 0, y: 0}])

  const generateSampleData = () => {
    let arr1 = []
    let arr2 = []
    let arr3 = []
    let arr4 = []
    for (let i = 0; i < 24; i++) {
      arr1.push({
        t: new Date(2021, 2, 5, i),
        y: 10+ Math.random()*10
      })
      arr2.push({
        t: new Date(2021, 2, 5, i),
        y: 10+ Math.random()*10
      })
      arr3.push({
        t: new Date(2021, 2, 5, i),
        y: 10+ Math.random()*10
      })
      arr4.push({
        t: new Date(2021, 2, 5, i),
        y: 10+ Math.random()*10
      })
    }
    setActivePowerExport(arr1)
    setReactivePowerExport(arr2)
    setActivePowerImport(arr3)
    setRectivePowerImport(arr4)
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
                  label: "Total Active Power Import [kW]",
                  backgroundColor: SiemensAccentTeal.light1,
                  borderColor: SiemensAccentTeal.light1,
                  fill: false,
                  lineTension: 0,
                  data: activePowerImport
                },
                {
                  label: "Total Active Power Export [kW]",
                  backgroundColor: SiemensAccentRed.light1,
                  borderColor: SiemensAccentRed.light1,
                  fill: false,
                  lineTension: 0,
                  data: activePowerExport
                },
                {
                  label: "Total Reactive Power import [kvar]",
                  backgroundColor: SiemensAccentGreen.light1,
                  borderColor: SiemensAccentGreen.light1,
                  fill: false,
                  lineTension: 0,
                  data: reactivePowerImport
                },
                {
                  label: "Total Reactive Power export [kvar]",
                  backgroundColor: SiemensAccentBlue.light1,
                  borderColor: SiemensAccentBlue.light1,
                  fill: false,
                  lineTension: 0,
                  data: reactivePowerExport
                },
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