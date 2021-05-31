import React, { useEffect, useCallback } from 'react';
import { DatePicker } from "@material-ui/pickers";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import { setEvents } from '../actions/Events.action';
import { TableWithSort } from './TableWithSort.component';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UniversalTabs } from './UniversalTabs.component';
import RefreshIcon from '@material-ui/icons/Refresh';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/Root.reducer';
import { fetchEvents } from '../services/FetchEventsAPI.service';
import { useDispatch } from 'react-redux';
import { setBackdropOpen } from '../actions/Backdrop.action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    warning: {
      color: 'orange'
    },
    info: {
      color: '#2196f3'
    },
    error: {
      color: 'red'
    },
    select: {
      width: '100%'
    },
    section: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(4)
    }
  }),
);

export const Events = () => {
  const [dateFrom, changeDateFrom] = React.useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [dateTo, changeDateTo] = React.useState<Date | null>(new Date());
  const { t, i18n } = useTranslation();
  const classes = useStyles();
  const overview = useSelector((state: RootState) => state.overview);
  const events = useSelector((state: RootState) => state.events);
  const dialogData = useSelector((state: RootState) => state.deviceDataDialogElevationDataSource);
  const dispatch = useDispatch();

  const fetchEventsFromMS = useCallback(() => {
    overview.diagrams.forEach(diagram => {
      if (diagram.assetID && dateFrom && dateTo) {
        dispatch(setBackdropOpen(true))
        fetchEvents(diagram.assetID, dateFrom.toISOString(), dateTo.toISOString()).then(res => {
          if (res._embedded && res._embedded.events && diagram.assetID) {
            dispatch(setEvents(diagram.assetID, res._embedded.events))
            dispatch(setBackdropOpen(false))
          }
          else if (diagram.assetID) {
            dispatch(setEvents(diagram.assetID, []))
            dispatch(setBackdropOpen(false))
          }
          dispatch(setBackdropOpen(false))
        }).catch(err => {
          dispatch(setBackdropOpen(false))
        })
      }
    })
  }, [dateFrom, dateTo, dispatch, overview.diagrams])

  const setSeverityIcon = (severity: number) => {
    switch (severity) {
      case 20:
        return <ErrorIcon className={classes.error} />
      case 30:
        return <WarningIcon className={classes.warning} />
      case 40:
        return <InfoIcon className={classes.info} />
      default:
        return <InfoIcon className={classes.info} />
    }
  }

  const setBreakerName = (assetID: string, switchboardName: string) => {
    if (dialogData[`${switchboardName}-${assetID}`]) {
      return dialogData[`${switchboardName}-${assetID}`].breakerName
    }
    return assetID
  }

  const initializeTabs = () => {
    const tabs: Array<{ label: string, content: React.ReactNode }> = []
    let allRows: Array<any> = []
    overview.diagrams.forEach(diagram => {
      if (diagram.assetID) {
        const rows: Array<any> = events[diagram.assetID] ? events[diagram.assetID].map(event => {
          const parsedDate = Date.parse(event.timestamp);
          const parsedDescription = JSON.parse(event.description);
          const description = i18n.language === 'pl' ? parsedDescription.pl : parsedDescription.en
          return [setSeverityIcon(event.severity), new Date(parsedDate), description, diagram.name, setBreakerName(event.source, diagram.name)]
        }) : [[]]
        allRows = [...allRows, ...rows]
        tabs.push({
          label: diagram.name,
          content: (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TableWithSort
                  defaultOrderColumnIndex={1}
                  columns={[t('eventsPage.severity'), t('eventsPage.time'), t('eventsPage.event'), t('eventsPage.switchboard'), t('eventsPage.device')]}
                  rows={rows ? [...rows] : [[]]}
                />
              </Grid>
            </Grid>
          )
        })
      }
    })
    //aggregated events
    tabs.push({
      label: t('eventsPage.allDevices'),
      content: (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TableWithSort
              defaultOrderColumnIndex={1}
              columns={[t('eventsPage.severity'), t('eventsPage.time'), t('eventsPage.event'), t('eventsPage.switchboard'), t('eventsPage.device')]}
              rows={allRows.length > 0 ? [...allRows] : [[]]}
            />
          </Grid>
        </Grid>
      )
    })
    return <UniversalTabs name='Events' tabs={tabs} />
  }

  useEffect(() => {
    fetchEventsFromMS()
  }, [dateFrom, dateTo, fetchEventsFromMS])

  const tabPanel = initializeTabs()

  return (
    <React.Fragment>
      {tabPanel}
      <Grid container spacing={2} justify='flex-end' className={classes.section}>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<RefreshIcon />}
            fullWidth
            onClick={() => fetchEventsFromMS()}
          >
            {t('eventsPage.refreshButton')}
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography gutterBottom variant="h5">{t('eventsPage.startDate')}</Typography>
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
          <Typography gutterBottom variant="h5">{t('eventsPage.endDate')}</Typography>
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
    </React.Fragment >
  )
}