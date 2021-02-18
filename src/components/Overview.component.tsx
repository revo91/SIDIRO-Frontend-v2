import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { setDeviceDataDialogOpen } from '../actions/DeviceDataDialog.action';
import { useDispatch } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { TransformerSVG } from './Overview/TransformerSVG.component';
import { CircuitBreakerSVG } from './Overview/CircuitBreakerSVG.component';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { GeneratorSVG } from './Overview/GeneratorSVG.component';
import { CouplingBreakerSVG } from './Overview/CouplingBreakerSVG.component';

//common constants for SVGs to import /////////////////
export const lineLength = 7;
export const circleRadius = 0.5 * lineLength;

const lineStyle: CSSProperties = {
  stroke: '#000000',
  strokeWidth: 0.3,
  strokeLinecap: 'round'
}
const circleStyle: CSSProperties = {
  ...lineStyle,
  fill: 'none'
}
const infeedsTextStyle: CSSProperties = {
  fontSize: `${circleRadius / 10}em`,
  fill: '#055f87',
  textAnchor: 'middle',
  dominantBaseline: 'central'
}

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lineStyle: {
      ...lineStyle
    },
    circleStyle: {
      ...circleStyle
    },
    lineStyleVoltageApplied: {
      ...lineStyle,
      stroke: '#10b115',
    },
    circleStyleVoltageApplied: {
      ...circleStyle,
      stroke: '#10b115',
    },
    infeedsTextStyle: {
      ...infeedsTextStyle
    }
  }));
///////////////////////////////////////////////////

export const Overview = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{t('overviewPage.title')}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <button onClick={() => dispatch(setDeviceDataDialogOpen(true))}>open DeviceDataDialog</button>
        </Grid>
        <Grid item xs={12}>
          <svg viewBox={`0 0 150 70`} width='100%'>
            <TransformerSVG x={10} y={5} voltageApplied={true} />
            <CircuitBreakerSVG x={20} y={5} state='closed' voltageApplied={true} />
            <GeneratorSVG x={30} y={5} voltageApplied />
            <CouplingBreakerSVG x={40} y={5} state='closed' voltageApplied />
          </svg>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}