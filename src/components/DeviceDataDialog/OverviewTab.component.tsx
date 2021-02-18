import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { UniversalTable } from '../UniversalTable.component';
import { useTranslation } from 'react-i18next';

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

  return (
    <Grid container justify='center' spacing={2}>
      <Grid container spacing={1} item xs={12} sm={12} md={4}>
        <Grid container item xs={12}>
          <p>Diagram</p>
        </Grid>
      </Grid>
      <Grid container spacing={1} item xs={12} sm={12} md={8}>
        <Grid item xs={12}>
          <Alert severity="success">
            <AlertTitle>{t('deviceDataDialog.breakerClosed')}</AlertTitle>
            {t('deviceDataDialog.switchingDeviceStateTitle')}
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <Alert severity="success">
            <AlertTitle>{t('deviceDataDialog.noTrippingOrAcknowledged')}</AlertTitle>
            {t('deviceDataDialog.lastTripTitle')}
          </Alert>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.masonryLayout}>
            <div className={classes.masonryLayoutPanel}>
              <UniversalTable
                columns={[t('deviceDataDialog.current'), '']}
                rows={[[`${t('deviceDataDialog.current')} L1`, '100 A'], [`${t('deviceDataDialog.current')} L2`, '50 A'], [`${t('deviceDataDialog.current')} L3`, '30 A']]}
                small />
            </div>
            <div className={classes.masonryLayoutPanel}>
              <UniversalTable
                columns={[t('deviceDataDialog.power'), '']}
                rows={[[`${t('deviceDataDialog.activePower')}`, '100 kW'], [`${t('deviceDataDialog.reactivePower')}`, '50 kvar'], [`${t('deviceDataDialog.apparentPower')}`, '30 kVA'], [`${t('deviceDataDialog.cosTotal')}`, '0.99 PF']]}
                small />
            </div>
            <div className={classes.masonryLayoutPanel}>
              <UniversalTable
                columns={['THDI', '']}
                rows={[['THD I L1', '10 %'], ['THD I L2', '10 %'], ['THD I L3', '10 %']]}
                small />
            </div>
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}