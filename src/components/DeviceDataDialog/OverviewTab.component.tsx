import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UniversalTable } from '../UniversalTable.component';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { DeviceTypes } from '../../utilities/DeviceTypes.utility';
import { CircuitBreakerSVG } from '../Overview/CircuitBreakerSVG.component';
import { GeneratorSVG } from '../Overview/GeneratorSVG.component';
import { TransformerSVG } from '../Overview/TransformerSVG.component';
import { CouplingBreakerSVG } from '../Overview/CouplingBreakerSVG.component';
import { BreakerStates } from '../../utilities/BreakerStates.utility';
import IconButton from '@material-ui/core/IconButton';
import TimelineIcon from '@material-ui/icons/Timeline';
import { setUniversalTabsNameIndex } from '../../actions/UniversalTabs.action';
import Tooltip from '@material-ui/core/Tooltip';

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
    }
  }),
);

export const OverviewTab = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const deviceType = useSelector((state: RootState) => state.deviceDataDialog.deviceType);
  const deviceName = useSelector((state: RootState) => state.deviceDataDialog.deviceName);
  const breakerName = useSelector((state: RootState) => state.deviceDataDialog.breakerName);
  const dispatch = useDispatch();

  const eventTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={['Ważność', 'Zdarzenie', 'Czas']}
        rows={[[`Wysoka`, 'Wyłączenie wyłącznika QT01', '2021.03.11'], [`Wysoka`, 'Wyłączenie wyłącznika QT01', '2021.03.10'], [`Wysoka`, 'Wyłączenie wyłącznika QT01', '2021.03.09']]}
        small />
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
        rows={[[`${t('deviceDataDialog.current')} L1`, '100 A'], [`${t('deviceDataDialog.current')} L2`, '50 A'], [`${t('deviceDataDialog.current')} L3`, '30 A']]}
        small />
    </div>
  )
  const powerTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.power'),
        <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
          <IconButton aria-label="delete" size="small">
            <TimelineIcon />
          </IconButton>
        </Tooltip>]}
        rows={[['Moc czynna pobrana z sieci', '100 kW'], ['Moc czynna oddana do sieci', '10 kW'], ['Moc bierna indukcyjna', '100 kvar'], ['Moc indukcyjna pojemnościowa', '100 kvar'],
        ['Współczynnik mocy', '0.99 PF']]}
        small />
    </div>
  )
  const thdiTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={['THD I',
          <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
            <IconButton aria-label="delete" size="small">
              <TimelineIcon />
            </IconButton>
          </Tooltip>]}
        rows={[['THD I L1', '10 %'], ['THD I L2', '10 %'], ['THD I L3', '10 %']]}
        small />
    </div>
  )
  const thduTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={['THD U',
          <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
            <IconButton aria-label="delete" size="small">
              <TimelineIcon />
            </IconButton>
          </Tooltip>]}
        rows={[['THD U L1', '10 %'], ['THD U L2', '10 %'], ['THD U L3', '10 %']]}
        small />
    </div>
  )
  const voltageLLTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.voltageLL'),
        <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
          <IconButton aria-label="delete" size="small">
            <TimelineIcon />
          </IconButton>
        </Tooltip>]}
        rows={[[t('deviceDataDialog.voltageL1L2'), '401 V'], [t('deviceDataDialog.voltageL2L3'), '399 V'], [t('deviceDataDialog.voltageL3L1'), '402 V']]}
        small />
    </div>
  )
  const voltageLNTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.voltageLN'),
        <Tooltip title={t<string>('deviceDataDialog.showChartTooltip')} placement="left">
          <IconButton aria-label="delete" size="small">
            <TimelineIcon />
          </IconButton>
        </Tooltip>]}
        rows={[[t('deviceDataDialog.voltageL1N'), '229 V'], [t('deviceDataDialog.voltageL2N'), '224 V'], [t('deviceDataDialog.voltageL3N'), '226 V']]}
        small />
    </div>
  )
  const breakerStateAlert = (
    <Grid item xs={12}>
      <Alert severity="success">
        <AlertTitle>{t('deviceDataDialog.breakerClosed')}</AlertTitle>
        {t('deviceDataDialog.switchingDeviceStateTitle')}
      </Alert>
    </Grid>
  )
  const breakerLastTripAlert = (
    <Grid item xs={12}>
      <Alert severity="success">
        <AlertTitle>{t('deviceDataDialog.noTrippingOrAcknowledged')}</AlertTitle>
        {t('deviceDataDialog.lastTripTitle')}
      </Alert>
    </Grid>
  )
  const generatorReadyAlert = (
    <Grid item xs={12}>
      <Alert severity="success">
        <AlertTitle>{t('deviceDataDialog.generatorReady')}</AlertTitle>
        {t('deviceDataDialog.generatorState')}
      </Alert>
    </Grid>
  )
  const generatorRunningAlert = (
    <Grid item xs={12}>
      <Alert severity="warning">
        <AlertTitle>{t('deviceDataDialog.generatorStopped')}</AlertTitle>
        {t('deviceDataDialog.generatorState')}
      </Alert>
    </Grid>
  )
  const svgVisualization = () => {
    switch (deviceType) {
      case DeviceTypes.circuitBreaker:
        return (
          <svg width='100%' viewBox={`0 -2 16 24`} className={classes.overviewTabSVGMaxHeight}>
            <CircuitBreakerSVG
              x={8}
              y={0}
              state={BreakerStates.open}
              overview
              sectionName=''
              outgoingFeederName={deviceName}
              name={breakerName}
              topSection
            />
          </svg>
        )
      case DeviceTypes.transformer:
        return (
          <svg width='100%' viewBox={`0 -2 16 40`} className={classes.overviewTabSVGMaxHeight}>
            <TransformerSVG
              x={8}
              y={0}
              name={deviceName}
              noTable
              overview
              breakerName='kk'
            />
            <CouplingBreakerSVG
              x={8}
              y={18}
              state={BreakerStates.open}
              name={breakerName}
              overview
              sectionName=''
              bottomSection
            />
          </svg>
        )
      case DeviceTypes.generator:
        return (
          <svg width='100%' viewBox={`0 -2 16 40`} className={classes.overviewTabSVGMaxHeight}>
            <GeneratorSVG
              x={8}
              y={0}
              name={deviceName}
              noTable
              overview
              breakerName='df'
            />
            <CouplingBreakerSVG
              x={8}
              y={18}
              state={BreakerStates.open}
              name={breakerName}
              overview
              sectionName=''
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
        <Grid container item xs={12}>
          {svgVisualization()}
        </Grid>
      </Grid>
      <Grid container spacing={1} item xs={12} sm={12} md={8}>
        {breakerStateAlert}
        {deviceType === DeviceTypes.circuitBreaker ? breakerLastTripAlert : null}
        {deviceType === DeviceTypes.generator ? generatorReadyAlert : null}
        {deviceType === DeviceTypes.generator ? generatorRunningAlert : null}
        <Grid item xs={12}>
          <div className={classes.masonryLayout}>
            {currentTable}
            {powerTable}
            {thdiTable}
            {eventTable}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? thduTable : null}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? voltageLLTable : null}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? voltageLNTable : null}
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}