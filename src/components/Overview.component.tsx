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
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/Root.reducer';
import { UniversalTabs } from './UniversalTabs.component';

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
      fontSize: `${circleRadius / 36}em`,
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : '#ffffff',
      textAnchor: 'middle',
      dominantBaseline: 'central',
      letterSpacing: '-0.03em'
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
      fontSize: `${circleRadius / 26}em`,
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
    svgContainer: {
      overflowX: 'auto',
      whiteSpace: 'nowrap'
    },
    svgElement: {
      minWidth: '1500px',
    }
  }));
///////////////////////////////////////////////////

enum InfeedTypes {
  transformer = 'transformer',
  generator = 'generator'
}

enum BreakerTypes {
  circuitBreaker = 'circuitBreaker',
  drawOutCircuitBreaker = 'drawOutCircuitBreaker'
}

const negativeOffsetX = -4;
const negativeOffsetY = -3;

export const Overview = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const overview = useSelector((state: RootState) => state.overview);
  const svgViewBoxX = 150;
  const svgViewBoxY = 74;
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

  const renderTabsWithCircuitDiagrams = (): Array<{ label: string, content: React.ReactNode }> => {
    let tabs: Array<{ label: string, content: React.ReactNode }> = [];
    overview.diagrams.forEach((diagram, diagramIndex) => {
      const content = (
        <div className={classes.svgContainer}>
          <svg viewBox={`${negativeOffsetX} ${negativeOffsetY} ${svgViewBoxX} ${svgViewBoxY}`} className={classes.svgElement}>
            {renderDiagramName(diagram.name, svgViewBoxX + negativeOffsetX, 0 + negativeOffsetY)}
            {diagram.sections.map((section: any, sectionIndex: any) => {
              const infeeds = section.infeeds?.map((infeed: any, infeedIndex: any) => {
                return renderInfeed(infeed.name,
                  infeed.tableName,
                  infeed.breaker,
                  infeed.type,
                  ((svgViewBoxX / diagram.sections.length) / section.infeeds.length) / 2 + infeedIndex * (svgViewBoxX / diagram.sections.length) / section.infeeds.length + sectionIndex * (svgViewBoxX / diagram.sections.length),
                  0)
              })
              ///////////////////////////
              const sectionLines = renderSection(sectionIndex * svgViewBoxX / diagram.sections.length + lineLength / 2, // x
                6 * lineLength, // y
                svgViewBoxX / diagram.sections.length - lineLength, // length
                section.coupling.type !== '' ? {
                  state: section.coupling.state,
                  name: section.coupling.name,
                  drawOut: section.coupling.type === 'drawOutcircuitBreaker' ? true : false
                } :
                  false);
              const breakers = section.breakers?.map((breaker: any, breakerIndex: any) => {
                const nextSwitchboardIndex = overview.diagrams.findIndex(diagram => diagram.name === breaker.nextSwitchboardName);
                return renderBreaker(breaker.name,
                  breaker.tableName,
                  breaker.type,
                  breaker.state,
                  sectionIndex * svgViewBoxX / diagram.sections.length + lineLength / 2 + breakerIndex * lineLength * 1.2,
                  6 * lineLength,
                  nextSwitchboardIndex !== -1 ? nextSwitchboardIndex : undefined
                )
              })
              return <React.Fragment key={sectionIndex}>{infeeds}{sectionLines}{breakers}</React.Fragment>

            })}
          </svg>
        </div>
      )
      return tabs.push({ label: diagram.name, content: content })
    })
    return tabs
  }

  const renderDiagramName = (name: string, x: number, y: number) => {
    return (
      <text
        x={x}
        y={y}
        className={classes.infeedsNameStyle}
      >
        {`${t('overviewPage.switchboard')} ${name}`}
      </text>
    )
  }

  const renderInfeed = (name: string, tableName: string, breaker: { name: string, type: string, tableName: string, state: string }, type: string, x: number, y: number) => {
    switch (type) {
      case InfeedTypes.transformer:
        return (
          <React.Fragment key={`${x}-${y}`}>
            <TransformerSVG
              x={x}
              y={y}
              name={name}
              tableName={tableName}
              activePower={sampleParams.activePower}
              current={sampleParams.current}
              powerFactor={sampleParams.powerFactor}
              breakerName={breaker.name}

            />
            {renderBreaker(breaker.name, 'test', breaker.type, breaker.state, x, y + 3 * lineLength)}
          </React.Fragment>
        )
      case InfeedTypes.generator:
        return (
          <React.Fragment key={`${x}-${y}`}>
            <GeneratorSVG
              x={x}
              y={y}
              name={name}
              tableName={tableName}
              activePower={sampleParams.activePower}
              current={sampleParams.current}
              powerFactor={sampleParams.powerFactor}
              breakerName={breaker.name}
              voltageApplied
            />
            {renderBreaker(breaker.name, 'test', breaker.type, breaker.state, x, y + 3 * lineLength)}
          </React.Fragment>
        )
      case '': //no infeed - for distribution boards to not show gen/tr and table above cb
        const previousSwitchboardIndex = overview.diagrams.findIndex(diagram => diagram.name === breaker.tableName)
        return renderBreaker(breaker.name, breaker.tableName, breaker.type, breaker.state, x, y + 3 * lineLength, undefined, true, previousSwitchboardIndex !== -1 ? previousSwitchboardIndex : undefined)
      default:
        return renderBreaker(breaker.name, '', breaker.type, breaker.state, x, y + 3 * lineLength)

    }
  }

  const renderBreaker = (name: string,
    tableName: string | undefined,
    type: string,
    state: string,
    x: number,
    y: number,
    nextSwitchboardIndex: number | undefined = undefined,
    tableAbove: boolean | undefined = undefined,
    previousSwitchboardIndex: number | undefined = undefined) => {
    switch (type) {
      case BreakerTypes.circuitBreaker:
        return (
          <CircuitBreakerSVG
            key={`${x}-${y}`}
            x={x}
            y={y}
            state={state}
            name={name}
            tableName={tableName}
            activePower={sampleParams.activePower}
            current={sampleParams.current}
            powerFactor={sampleParams.powerFactor}
            voltageApplied={false}
            noTable={tableName === undefined}
            nextSwitchboardIndex={nextSwitchboardIndex}
            previousSwitchboardIndex={previousSwitchboardIndex}
            tableAbove={tableAbove}
          />
        )
      case BreakerTypes.drawOutCircuitBreaker:
        return (
          <CouplingBreakerSVG
            key={`${name}-${tableName}`}
            x={x}
            y={y}
            state={state}
            name={name}
            voltageApplied={false}
            drawOut
          />
        )
    }
  }

  const renderSection = (x: number, y: number, length: number, endCoupling?: { state: string, name: string, drawOut: boolean } | false,) => {
    return (
      <SectionSVG
        key={`${x}-${y}`}
        x={x}
        y={y}
        length={length}
        voltageApplied={false}
        endCoupling={endCoupling ?
          <CouplingBreakerSVG
            x={x + length}
            y={y - 3 * lineLength}
            state={endCoupling.state}
            name={endCoupling.name}
            voltageApplied={false}
            drawOut={endCoupling.drawOut === true}
          />
          : false}
      />
    )
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <UniversalTabs
            name='overview'
            tabs={renderTabsWithCircuitDiagrams()}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}