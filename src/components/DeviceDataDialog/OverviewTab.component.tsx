import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UniversalTable } from '../UniversalTable.component';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { DeviceTypes } from '../../utilities/DeviceTypes.utility';
import IconButton from '@material-ui/core/IconButton';
import TimelineIcon from '@material-ui/icons/Timeline';
import { setUniversalTabsNameIndex } from '../../actions/UniversalTabs.action';
import Tooltip from '@material-ui/core/Tooltip';
import { OverviewTabCircuitBreakerSVG } from './OverviewTabCircuitBreakerSVG.component';
import { OverviewTabTransformerSVG } from './OverviewTabTransformerSVG.component';
import { OverviewTabGeneratorSVG } from './OverviewTabGeneratorSVG.component';
import WarningIcon from '@material-ui/icons/Warning';
import InfoIcon from '@material-ui/icons/Info';
import Typography from '@material-ui/core/Typography';
import { powerFactorCalculator } from '../../utilities/PowerFactorCalculator.utility';
import { decodeState } from '../../utilities/DecodeState.utility';
import { TableWithSort } from '../TableWithSort.component';
import { fetchEvents } from '../../services/FetchEventsAPI.service';
import { setBackdropOpen } from '../../actions/Backdrop.action';
import { setEvents } from '../../actions/Events.action';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    masonryLayout: {
      columnGap: 10,
      webkitColumnGap: 10,
      width: '100%',
      [`${theme.breakpoints.down('xl')}`]: {
        columnCount: 3,
        webkitColumnCount: 3,
      },
      [`${theme.breakpoints.down('lg')}`]: {
        columnCount: 2,
        webkitColumnCount: 2,
      },
      [`${theme.breakpoints.down('md')}`]: {
        columnCount: 1,
        webkitColumnCount: 1,
      },
    },
    masonryLayoutPanel: {
      breakInside: 'avoid',
      WebkitColumnBreakInside: 'avoid',
      padding: '5px'
    },
    overviewTabSVGMaxHeight: {
      maxHeight: '600px',
      boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
    },
    warning: {
      color: 'orange'
    },
    info: {
      color: '#2196f3'
    },
    error: {
      color: 'red'
    },
  }),
);

export const OverviewTab = () => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const deviceType = useSelector((state: RootState) => state.deviceDataDialog.deviceType);
  const deviceName = useSelector((state: RootState) => state.deviceDataDialog.deviceName);
  const breakerName = useSelector((state: RootState) => state.deviceDataDialog.breakerName);
  const sectionName = useSelector((state: RootState) => state.deviceDataDialog.sectionName);
  const assetID = useSelector((state: RootState) => state.deviceDataDialog.assetID);
  const switchboardAssetID = useSelector((state: RootState) => state.deviceDataDialog.switchboardAssetID);
  const systemTopologyData = useSelector((state: RootState) => state.systemTopologyData);
  const events = useSelector((state: RootState) => state.events);
  const dispatch = useDispatch();

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

  useEffect(() => {
    if (!events[switchboardAssetID]) {
      //no data - need to refresh events
      dispatch(setBackdropOpen(true))
      fetchEvents(switchboardAssetID, new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(), new Date().toISOString()).then(res => {
        if (res._embedded && res._embedded.events && switchboardAssetID) {
          dispatch(setEvents(switchboardAssetID, res._embedded.events))
          dispatch(setBackdropOpen(false))
        }
        else {
          dispatch(setEvents(switchboardAssetID, []))
          dispatch(setBackdropOpen(false))
        }
      }).catch(err => {
        console.log(err)
        dispatch(setBackdropOpen(false))
      })
    }
  }, [dispatch, events, switchboardAssetID])

  const eventTable = (
    <div className={classes.masonryLayoutPanel}>
      <TableWithSort
        defaultOrderColumnIndex={2}
        columns={[t('eventsPage.severity'), t('eventsPage.event'), t('eventsPage.time')]}
        //rows={deviceEvents.map((ev)=> [ev.severity, ev.description, ev.timestamp])}
        rows={events[switchboardAssetID]? events[switchboardAssetID].filter((el) => el.source === assetID).map(ev => [setSeverityIcon(ev.severity),
        i18n.language === 'pl' ? JSON.parse(ev.description).pl : JSON.parse(ev.description).en, new Date(Date.parse(ev.timestamp))]) : [[]]}
      />
    </div>
  )

  const currentTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.current'),
        <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
          <IconButton aria-label="delete" size="small" onClick={() => dispatch(setUniversalTabsNameIndex('TransformerDeviceDetails', 3))}>
            <TimelineIcon />
          </IconButton>
        </Tooltip>]}
        rows={[[`${t('deviceDataDialog.current')} L1`, `${systemTopologyData[assetID]?.Current_L1 || 0} A`],
        [`${t('deviceDataDialog.current')} L2`, `${systemTopologyData[assetID]?.Current_L2 || 0} A`],
        [`${t('deviceDataDialog.current')} L3`, `${systemTopologyData[assetID]?.Current_L3 || 0} A`]]}
        small />
    </div>
  )
  const powerTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.power'),
        <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
          <IconButton aria-label="delete" size="small" onClick={() => dispatch(setUniversalTabsNameIndex('TransformerDeviceDetails', 4))}>
            <TimelineIcon />
          </IconButton>
        </Tooltip>]}
        rows={[[t('deviceDataDialog.activePowerImport'), `${systemTopologyData[assetID]?.Active_Power_Import || 0} kW`],
        [t('deviceDataDialog.activePowerExport'), `${systemTopologyData[assetID]?.Active_Power_Export || 0} kW`],
        [t('deviceDataDialog.reactivePowerImport'), `${systemTopologyData[assetID]?.Reactive_Power_Import || 0} kvar`],
        [t('deviceDataDialog.reactivePowerExport'), `${systemTopologyData[assetID]?.Reactive_Power_Import || 0} kvar`],
        [t('deviceDataDialog.powerFactor'), `${systemTopologyData[assetID] ? powerFactorCalculator(systemTopologyData[assetID].Active_Power_Import, systemTopologyData[assetID].Reactive_Power_Import) : 0} PF`]]}
        small />
    </div>
  )
  const thdiTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={['THD I',
          <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
            <IconButton aria-label="delete" size="small" onClick={() => dispatch(setUniversalTabsNameIndex('TransformerDeviceDetails', 6))}>
              <TimelineIcon />
            </IconButton>
          </Tooltip>]}
        rows={[['THD I L1', `${systemTopologyData[assetID]?.THD_I_L1 || 0} %`],
        ['THD I L2', `${systemTopologyData[assetID]?.THD_I_L2 || 0} %`],
        ['THD I L3', `${systemTopologyData[assetID]?.THD_I_L3 || 0} %`]]}
        small />
    </div>
  )
  const thduTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={['THD U',
          <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
            <IconButton aria-label="delete" size="small" onClick={() => dispatch(setUniversalTabsNameIndex('TransformerDeviceDetails', 5))}>
              <TimelineIcon />
            </IconButton>
          </Tooltip>]}
        rows={[['THD U L1', `${systemTopologyData[assetID]?.THD_U_L1 || 0} %`],
        ['THD U L2', `${systemTopologyData[assetID]?.THD_U_L2 || 0} %`],
        ['THD U L3', `${systemTopologyData[assetID]?.THD_U_L3 || 0} %`]]}
        small />
    </div>
  )
  const voltageLLTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.voltageLL'),
        <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
          <IconButton aria-label="delete" size="small" onClick={() => dispatch(setUniversalTabsNameIndex('TransformerDeviceDetails', 2))}>
            <TimelineIcon />
          </IconButton>
        </Tooltip>]}
        rows={[[t('deviceDataDialog.voltageL1L2'), `${systemTopologyData[assetID]?.Voltage_L1_L2 || 0} V`],
        [t('deviceDataDialog.voltageL2L3'), `${systemTopologyData[assetID]?.Voltage_L2_L3 || 0} V`],
        [t('deviceDataDialog.voltageL3L1'), `${systemTopologyData[assetID]?.Voltage_L3_L1 || 0} V`]]}
        small />
    </div>
  )
  const voltageLNTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.voltageLN'),
        <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
          <IconButton aria-label="delete" size="small" onClick={() => dispatch(setUniversalTabsNameIndex('TransformerDeviceDetails', 1))}>
            <TimelineIcon />
          </IconButton>
        </Tooltip>]}
        rows={[[t('deviceDataDialog.voltageL1N'), `${systemTopologyData[assetID]?.Voltage_L1_N || 0} V`],
        [t('deviceDataDialog.voltageL2N'), `${systemTopologyData[assetID]?.Voltage_L2_N || 0} V`],
        [t('deviceDataDialog.voltageL3N'), `${systemTopologyData[assetID]?.Voltage_L3_N || 0} V`]]}
        small />
    </div>
  )
  const breakerStateAlert = () => {
    const state = decodeState(systemTopologyData[assetID]?.Breaker_State || 0)
    if (state.drawnOut) {
      //red alert
      return (
        <Grid item xs={12}>
          <Alert severity='error'>
            <AlertTitle>{t('deviceDataDialog.breakerDrawnOut')}</AlertTitle>
            {t('deviceDataDialog.switchingDeviceStateTitle')}
          </Alert>
        </Grid>
      )
    }
    else if (state.tripped) {
      //red alert
      return (
        <Grid item xs={12}>
          <Alert severity='error'>
            <AlertTitle>{t('deviceDataDialog.breakerTripped')}</AlertTitle>
            {t('deviceDataDialog.switchingDeviceStateTitle')}
          </Alert>
        </Grid>
      )
    }
    else if (!state.closed) {
      //yellow alert
      return (
        <Grid item xs={12}>
          <Alert severity='warning'>
            <AlertTitle>{t('deviceDataDialog.breakerOpen')}</AlertTitle>
            {t('deviceDataDialog.switchingDeviceStateTitle')}
          </Alert>
        </Grid>
      )
    }
    //all ok
    return (
      <Grid item xs={12}>
        <Alert severity='success'>
          <AlertTitle>{t('deviceDataDialog.breakerClosed')}</AlertTitle>
          {t('deviceDataDialog.switchingDeviceStateTitle')}
        </Alert>
      </Grid>
    )
  }

  const svgVisualization = () => {
    switch (deviceType) {
      case DeviceTypes.circuitBreaker:
        return (
          <svg width='100%' viewBox={`0 -2 16 24`} className={classes.overviewTabSVGMaxHeight}>
            <OverviewTabCircuitBreakerSVG
              x={8}
              y={0}
              closed={decodeState(systemTopologyData[assetID]?.Breaker_State || 0).closed}
              sectionName={sectionName}
              outgoingFeederName={deviceName}
              name={breakerName}
              topSection
            />
          </svg>
        )
      case DeviceTypes.transformer:
        return (
          <svg width='100%' viewBox={`0 -2 16 36`} className={classes.overviewTabSVGMaxHeight}>
            <OverviewTabTransformerSVG
              x={8}
              y={0}
              name={deviceName}
            />
            <OverviewTabCircuitBreakerSVG
              x={8}
              y={12}
              closed={decodeState(systemTopologyData[assetID]?.Breaker_State || 0).closed}
              name={breakerName}
              sectionName={sectionName}
              bottomSection
            />
          </svg>
        )
      case DeviceTypes.generator:
        return (
          <svg width='100%' viewBox={`0 -2 16 32`} className={classes.overviewTabSVGMaxHeight}>
            <OverviewTabGeneratorSVG
              x={8}
              y={0}
              name={deviceName}
            />
            <OverviewTabCircuitBreakerSVG
              x={8}
              y={6}
              closed={decodeState(systemTopologyData[assetID]?.Breaker_State || 0).closed}
              name={breakerName}
              sectionName={sectionName}
              bottomSection
            />
          </svg>
        )
      case DeviceTypes.infeedBreaker:
        return (
          <svg width='100%' viewBox={`0 -2 16 24`} className={classes.overviewTabSVGMaxHeight}>
            <OverviewTabCircuitBreakerSVG
              x={8}
              y={0}
              closed={decodeState(systemTopologyData[assetID]?.Breaker_State || 0).closed}
              sectionName={sectionName}
              outgoingFeederName={deviceName}
              name={breakerName}
              bottomSection
            />
          </svg>
        )
      case DeviceTypes.couplingBreaker:
        return (
          <svg width='100%' viewBox={`0 -2 16 24`} className={classes.overviewTabSVGMaxHeight}>
            <OverviewTabCircuitBreakerSVG
              x={8}
              y={0}
              closed={decodeState(systemTopologyData[assetID]?.Breaker_State || 0).closed}
              sectionName=''
              outgoingFeederName=''
              name={breakerName}
              topSection
              bottomSection
            />
          </svg>
        )
      default:
        return null
    }
  }

  return (
    <Grid container justify='center' alignItems='flex-start' spacing={2}>
      <Grid container spacing={1} item xs={12} sm={12} md={4}>
        <Grid item xs={12}>
          {svgVisualization()}
        </Grid>
        {events[switchboardAssetID] ?
          <React.Fragment>
            <Grid item xs={12}>
              <Typography variant='h5'>{t('deviceDataDialog.events')}</Typography>
            </Grid>
            <Grid item xs={12}>
              {eventTable}
            </Grid>
          </React.Fragment>
          : null}
      </Grid>
      <Grid container spacing={1} item xs={12} sm={12} md={8}>
        {breakerStateAlert()}
        <Grid item xs={12}>
          <div className={classes.masonryLayout}>
            {currentTable}
            {powerTable}
            {thdiTable}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? thduTable : null}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? voltageLLTable : null}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? voltageLNTable : null}
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}