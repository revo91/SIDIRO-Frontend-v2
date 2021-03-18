import React from 'react';
import { DatePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import { UniversalTable } from './UniversalTable.component';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
//import { setEvents } from '../actions/Events.action';
import { TableWithSort } from './TableWithSort.component';

export const Events = () => {
  const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [dateTo, changeDateTo] = React.useState<Date | null>(new Date());
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{t('eventsPage.title')}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            cancelLabel={t('datePicker.cancelButton')}
            autoOk
            label={t('eventsPage.dateFromLabel')}
            value={dateFrom}
            onChange={changeDateFrom}
            fullWidth
            maxDate={dateTo} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            cancelLabel={t('datePicker.cancelButton')}
            autoOk
            label={t('eventsPage.dateToLabel')}
            value={dateTo}
            onChange={changeDateTo}
            fullWidth
            disableFuture
            minDate={dateFrom} />
        </Grid>
        <Grid item xs={12}>
          <UniversalTable columns={['col1', 'col2', 'col3']} rows={[['1row1', '1row2', '1row3'], ['2row1', '2row2', '2row3']]} />
        </Grid>
        <Grid item xs={12}>
          <TableWithSort columns={['col1', 'col2', 'col3']} rows={[[new Date(2021, 1, 28), 4, 'lol'], [new Date(2020, 3, 1), 3, 'lal'], [new Date(2021, 5, 3), 1, 'fss']]} />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}