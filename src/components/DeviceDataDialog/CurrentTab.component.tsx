import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { LineChart } from '../LineChart.component';
import { SiemensColors } from '../../utilities/SiemensColors.utility'; 
import { DatePicker, TimePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    timePickersContainer: {
      backgroundColor: '#dbdbdb',
      marginTop: theme.spacing(2),
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }
  }),
);

export const CurrentTab = () => {
  const [sampleTimeSeriesData, setSampleTimeSeriesData] = React.useState<Array<{ t: number | Date, y: number }>>([{ t: new Date(2021, 1, 1), y: 10 }, { t: new Date(2021, 1, 5), y: 10 }, { t: new Date(2021, 1, 9), y: 10 }])
  const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date());
  const classes = useStyles();
  const { t } = useTranslation();
  

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart
            chartTitle="something"
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