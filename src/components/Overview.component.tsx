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
import { siemensColors } from '../utilities/siemensColors';
import { SectionSVG } from './Overview/SectionSVG.component';

//common constants for SVGs to import /////////////////
export const lineLength = 7;
export const circleRadius = 0.5 * lineLength;

const lineStyle: CSSProperties = {
  stroke: '#000000',
  strokeWidth: lineLength / 25,
  strokeLinecap: 'round'
}
const circleStyle: CSSProperties = {
  ...lineStyle,
  fill: 'none'
}
const paramsTableTitleStyle: CSSProperties = {
  stroke: siemensColors.blueDark,
  strokeWidth: 0.1,
  fill: siemensColors.blueDark,
}
const infeedsNameStyle: CSSProperties = {
  fontSize: `${circleRadius / 15}em`,
  fill: siemensColors.tealDark,
  textAnchor: 'end',
  dominantBaseline: 'hanging',
  letterSpacing: '-0.05em'
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
    generatorSymbolTextStyle: {
      fontSize: `${circleRadius / 10}em`,
      fill: siemensColors.tealDark,
      textAnchor: 'middle',
      dominantBaseline: 'central'
    },
    paramsTableTitleStyle: {
      ...paramsTableTitleStyle
    },
    paramsTableRowStyle: {
      ...paramsTableTitleStyle,
      fill: '#d6f7ff',
    },
    paramsTableTitleTextStyle: {
      fontSize: `${circleRadius / 32}em`,
      fill: '#ffffff',
      textAnchor: 'middle',
      dominantBaseline: 'central',
      letterSpacing: '-0.02em'
    },
    paramsTableRowTextStyle: {
      fontSize: `${circleRadius / 36}em`,
      fill: '#000000',
      textAnchor: 'end',
      dominantBaseline: 'central',
      letterSpacing: '-0.02em',
    },
    infeedsNameStyle: {
      ...infeedsNameStyle
    },
    circuitBreakersNameStyle: {
      ...infeedsNameStyle,
      fontSize: `${circleRadius / 18}em`,
    }
  }));
///////////////////////////////////////////////////

export const Overview = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  //for testing purposes///////////////////////////
  const [sampleParams, setSampleParams] = React.useState<{ activePower: number, reactivePower: number, powerFactor: number, current: number }>({ activePower: 100, reactivePower: 50, powerFactor: 0.88, current: 10 })

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSampleParams({
        ...sampleParams,
        activePower: parseFloat((Math.random() * 1000).toFixed(2)),
        reactivePower: parseFloat((Math.random() * 100).toFixed(2)),
        powerFactor: parseFloat((Math.random()).toFixed(2)),
        current: parseFloat((Math.random() * 10).toFixed(2))
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [sampleParams])
  ////////////////////////////////////////////////

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <button onClick={() => dispatch(setDeviceDataDialogOpen(true))}>open DeviceDataDialog</button>
        </Grid>
        <Grid item xs={12}>
          <svg viewBox={`0 0 150 70`} width='100%'>
            <TransformerSVG
              x={10}
              y={1}
              name='TR1'
              tableName='Trafo TR1'
              activePower={sampleParams.activePower}
              reactivePower={sampleParams.reactivePower}
              powerFactor={sampleParams.powerFactor}
              voltageApplied />
            <CircuitBreakerSVG
              x={40}
              y={1}
              state='open'
              name='cb1'
              tableName='B1A komp.'
              activePower={sampleParams.activePower}
              current={sampleParams.current}
              powerFactor={sampleParams.powerFactor}
              voltageApplied
            />
            <GeneratorSVG
              x={70}
              y={1}
              name='GEN1'
              tableName='Generator'
              activePower={sampleParams.activePower}
              reactivePower={sampleParams.reactivePower}
              powerFactor={sampleParams.powerFactor}
              voltageApplied
            />
            <CouplingBreakerSVG
              x={100}
              y={1}
              state='open'
              name='Q1'
              voltageApplied
            />
            <SectionSVG
              x={40}
              y={60}
              length={50}
              voltageApplied
            />
          </svg>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}