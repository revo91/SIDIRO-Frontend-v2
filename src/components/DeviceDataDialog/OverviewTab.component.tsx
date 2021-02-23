import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UniversalTable } from '../UniversalTable.component';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { DeviceTypes } from '../../utilities/DeviceTypes.utility';

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
  }),
);

export const OverviewTab = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const deviceType = useSelector((state: RootState) => state.deviceDataDialog.deviceType);

  const currentTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.current'), '']}
        rows={[[`${t('deviceDataDialog.current')} L1`, '100 A'], [`${t('deviceDataDialog.current')} L2`, '50 A'], [`${t('deviceDataDialog.current')} L3`, '30 A']]}
        small />
    </div>
  )
  const powerTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.power'), '']}
        rows={[[`${t('deviceDataDialog.activePower')}`, '100 kW'], [`${t('deviceDataDialog.reactivePower')}`, '50 kvar'], [`${t('deviceDataDialog.apparentPower')}`, '30 kVA'], [`${t('deviceDataDialog.cosTotal')}`, '0.99 PF']]}
        small />
    </div>
  )
  const thdiTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={['THD I', '']}
        rows={[['THD I L1', '10 %'], ['THD I L2', '10 %'], ['THD I L3', '10 %']]}
        small />
    </div>
  )
  const thduTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={['THD U', '']}
        rows={[['THD U L1', '10 %'], ['THD U L2', '10 %'], ['THD U L3', '10 %']]}
        small />
    </div>
  )
  const voltageLLTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.voltageLL'), '']}
        rows={[[t('deviceDataDialog.voltageL1L2'), '401 V'], [t('deviceDataDialog.voltageL2L3'), '399 V'], [t('deviceDataDialog.voltageL3L1'), '402 V']]}
        small />
    </div>
  )
  const voltageLNTable = (
    <div className={classes.masonryLayoutPanel}>
      <UniversalTable
        columns={[t('deviceDataDialog.voltageLN'), '']}
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

  return (
    <Grid container justify='center' spacing={2}>
      <Grid container spacing={1} item xs={12} sm={12} md={4}>
        <Grid container item xs={12}>
          <p>Diagram</p>
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
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? thduTable : null}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? voltageLLTable : null}
            {deviceType === DeviceTypes.transformer || deviceType === DeviceTypes.generator ? voltageLNTable : null}
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}