import React from 'react';
import { DatePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
//import { setEvents } from '../actions/Events.action';
import { TableWithSort } from './TableWithSort.component';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UniversalTabs } from './UniversalTabs.component';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    warning: {
      color: 'orange'
    },
    info: {
      color: '#2196f3'
    },
    select: {
      width: '100%'
    }
  }),
);

export const Events = () => {
  const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [dateTo, changeDateTo] = React.useState<Date | null>(new Date());
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <React.Fragment>
      <UniversalTabs
        name='Reports'
        tabs={[
          {
            label: 'Wszystko',
            content: <p></p>
          },
          {
            label: 'RG-MDP1',
            content: <p></p>
          },
          {
            label: 'HVPP-1',
            content: <p></p>
          },
          {
            label: 'HVPP-2',
            content: <p></p>
          },
          {
            label: 'HVPP-3',
            content: <p></p>
          }
        ]}
      />
      {/* <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{t('eventsPage.title')}</Typography>
        </Grid>
      </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={3}>
        <Button
        variant="contained"
        color="primary"
        startIcon={<RefreshIcon/>}
      >
        Odśwież
      </Button>
        </Grid>
        <Grid item xs={12}>
          <TableWithSort
            columns={[t('eventsPage.severity'), t('eventsPage.time'), t('eventsPage.event'), t('eventsPage.switchboard'), t('eventsPage.device')]}
            rows={[[<WarningIcon className={classes.warning} />, new Date(2021, 1, 28), 'Ostrzeżenie przed przekroczeniem mocy - przewidywana moc 242.97 kW', 'RG-MDP1', 'Q0'],
            [<InfoIcon className={classes.info} />, new Date(2021, 1, 20), 'Załączenie wyłącznika QT03', 'RG-MDP1', 'QT03'],
            [<InfoIcon className={classes.info} />, new Date(2021, 1, 21), 'Załączenie wyłącznika QT04', 'RG-MDP1', 'QT04']]}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="h5">Data początkowa</Typography>
          <DatePicker
            cancelLabel={t('datePicker.cancelButton')}
            autoOk
            label={t('eventsPage.dateFromLabel')}
            value={dateFrom}
            onChange={changeDateFrom}
            fullWidth
            maxDate={dateTo}
            variant='static'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
        <Typography variant="h5">Data końcowa</Typography>
          <DatePicker
            cancelLabel={t('datePicker.cancelButton')}
            autoOk
            label={t('eventsPage.dateToLabel')}
            value={dateTo}
            onChange={changeDateTo}
            fullWidth
            disableFuture
            minDate={dateFrom}
            variant='static'
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}