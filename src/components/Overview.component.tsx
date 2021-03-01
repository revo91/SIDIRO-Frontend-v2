import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { TransformerSVG } from './Overview/TransformerSVG.component';
import { CircuitBreakerSVG } from './Overview/CircuitBreakerSVG.component';
import { GeneratorSVG } from './Overview/GeneratorSVG.component';
import { CouplingBreakerSVG } from './Overview/CouplingBreakerSVG.component';
import { SiemensAccentBlue, SiemensAccentTeal, SiemensAccentYellow } from '../utilities/SiemensColors.utility';
import { SectionSVG } from './Overview/SectionSVG.component';

//common constants for SVGs to import /////////////////
export const lineLength = 6;
export const circleRadius = 0.5 * lineLength;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lineStyle: {
      stroke: theme.palette.type === 'dark' ? theme.palette.text.primary : '#000000',
      strokeWidth: lineLength / 25,
      strokeLinecap: 'round'
    },
    circleStyle: {
      stroke: theme.palette.type === 'dark' ? theme.palette.text.primary : '#000000',
      strokeWidth: lineLength / 25,
      strokeLinecap: 'round',
      fill: 'none'
    },
    lineStyleVoltageApplied: {
      strokeWidth: lineLength / 25,
      strokeLinecap: 'round',
      stroke: '#10b115',
    },
    circleStyleVoltageApplied: {
      strokeWidth: lineLength / 25,
      strokeLinecap: 'round',
      fill: 'none',
      stroke: '#10b115',
    },
    generatorSymbolTextStyle: {
      fontSize: `${circleRadius / 10}em`,
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
      textAnchor: 'middle',
      dominantBaseline: 'central'
    },
    paramsTableTitleStyle: {
      stroke: theme.palette.type === 'dark' ? SiemensAccentYellow.light3 : SiemensAccentBlue.dark4,
      strokeWidth: lineLength / 64,
      fill: theme.palette.type === 'dark' ? theme.palette.background.paper : SiemensAccentBlue.dark4,
    },
    paramsTableRowStyle: {
      stroke: theme.palette.type === 'dark' ? SiemensAccentYellow.light3 : SiemensAccentBlue.dark4,
      strokeWidth: lineLength / 64,
      fill: theme.palette.type === 'dark' ? theme.palette.background.paper : SiemensAccentBlue.light6,
    },
    paramsTableTitleTextStyle: {
      fontSize: `${circleRadius / 32}em`,
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : '#ffffff',
      textAnchor: 'middle',
      dominantBaseline: 'central',
      letterSpacing: '-0.02em'
    },
    paramsTableRowTextStyle: {
      fontSize: `${circleRadius / 36}em`,
      fill: theme.palette.text.primary,
      textAnchor: 'end',
      dominantBaseline: 'central',
      letterSpacing: '-0.02em',
    },
    infeedsNameStyle: {
      fontSize: `${circleRadius / 15}em`,
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
      textAnchor: 'end',
      dominantBaseline: 'hanging',
      letterSpacing: '-0.05em'
    },
    circuitBreakersNameStyle: {
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
      textAnchor: 'end',
      dominantBaseline: 'hanging',
      letterSpacing: '-0.05em',
      fontSize: `${circleRadius / 18}em`,
    },
    clickableOverlay: {
      fill: 'rgba(255, 255, 255, 0)',
      "&:hover, &:focus": {
        stroke: SiemensAccentYellow.light3,
        strokeWidth: lineLength / 32,
      }
    },
    overviewTabSVGTextsCentralAnchor: {
      fontSize: `${circleRadius / 32}em`,
      fill: theme.palette.text.primary,
      textAnchor: 'middle',
      dominantBaseline: 'central',
      letterSpacing: '-0.02em'
    },
    overviewTabSVGTextsCentralLeftAnchor: {
      fontSize: `${circleRadius / 32}em`,
      fill: theme.palette.text.primary,
      textAnchor: 'start',
      dominantBaseline: 'hanging',
      letterSpacing: '-0.02em'
    },
  }));
///////////////////////////////////////////////////

export const Overview = () => {
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
          <svg viewBox={`0 0 150 74`} width='100%'>
            <TransformerSVG
              x={10}
              y={1}
              name='TR1'
              tableName='Trafo TR1'
              activePower={sampleParams.activePower}
              reactivePower={sampleParams.reactivePower}
              powerFactor={sampleParams.powerFactor}
              voltageApplied
            />
            <CouplingBreakerSVG
              x={10}
              y={1 + 3 * lineLength}
              state='open'
              name='Q1'
              voltageApplied
            />
            <CircuitBreakerSVG
              x={10}
              y={1 + 6 * lineLength}
              state='open'
              name='cb1'
              tableName='B1A komp.'
              activePower={sampleParams.activePower}
              current={sampleParams.current}
              powerFactor={sampleParams.powerFactor}
              voltageApplied={false}
            />
            <GeneratorSVG
              x={120}
              y={1}
              name='GEN1'
              tableName='Generator'
              activePower={sampleParams.activePower}
              reactivePower={sampleParams.reactivePower}
              powerFactor={sampleParams.powerFactor}
              voltageApplied
            />
            <SectionSVG
              x={10}
              y={1 + 6 * lineLength}
              length={50}
              voltageApplied={false}
              endCoupling={<CouplingBreakerSVG
                x={60}
                y={1 + 3 * lineLength}
                state='open'
                name='Q1'
                voltageApplied={false}
              />}
            />
          </svg>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}