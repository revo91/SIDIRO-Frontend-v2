import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { TransformerSVG } from './Overview/TransformerSVG.component';
import { CircuitBreakerSVG } from './Overview/CircuitBreakerSVG.component';
import { GeneratorSVG } from './Overview/GeneratorSVG.component';
import { SiemensAccentBlue, SiemensAccentTeal, SiemensAccentYellow } from '../utilities/SiemensColors.utility';
import { SectionSVG } from './Overview/SectionSVG.component';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/Root.reducer';
import { UniversalTabs } from './UniversalTabs.component';
import { DeviceTypes } from '../utilities/DeviceTypes.utility';
import { decodeState } from '../utilities/DecodeState.utility';
import { powerFactorCalculator } from '../utilities/PowerFactorCalculator.utility';

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
      fontSize: `${circleRadius / 39}em`,
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
    },
    noConnectionAlarmVertical: {
      fill: 'red',
      textAnchor: 'start',
      font: `bold ${circleRadius / 36}em sans-serif`,
      dominantBaseline: 'ideographic',
      letterSpacing: '-0.03em'
    },
  }));
///////////////////////////////////////////////////

const negativeOffsetX = -4;
const negativeOffsetY = -3;

export const Overview = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const overview = useSelector((state: RootState) => state.overview);
  const systemTopologyData = useSelector((state: RootState) => state.systemTopologyData);

  const svgViewBoxX = 150;
  const svgViewBoxY = 74;

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
                  `${t('deviceDataDialog.section')} ${section.name}`,
                  section,
                  infeed.tableName,
                  infeed.breaker,
                  infeed.type,
                  ((svgViewBoxX / diagram.sections.length) / section.infeeds.length) / 2 + infeedIndex * (svgViewBoxX / diagram.sections.length) / section.infeeds.length + sectionIndex * (svgViewBoxX / diagram.sections.length),
                  0,
                  diagram.assetID ? diagram.assetID : '') //switchboard name
              })
              ///////////////////////////
              const sectionLines = renderSection(sectionIndex * svgViewBoxX / diagram.sections.length + lineLength / 2, // x
                6 * lineLength, // y
                svgViewBoxX / diagram.sections.length - lineLength, // length
                section, //voltageApplied
                diagram.sections[sectionIndex - 1] !== undefined ? checkSectionVoltageApplied(diagram.sections[sectionIndex - 1]) : false, // previousSectionUnderVoltage
                diagram.assetID ? diagram.assetID : '', //switchboard name
                section.coupling ? {
                  assetID: section.coupling.assetID,
                  name: section.coupling.name,
                  type: section.coupling.type,
                  nextSectionUnderVoltage: diagram.sections[sectionIndex + 1] !== undefined ? checkSectionVoltageApplied(diagram.sections[sectionIndex + 1]) : false,
                  fixedState: section.coupling.state,
                  tableName: section.coupling.name
                } :
                  false)
              const breakers = section.breakers?.map((breaker: any, breakerIndex: any) => {
                const nextSwitchboardIndex = overview.diagrams.findIndex(diagram => diagram.name === breaker.nextSwitchboardName);
                return renderBreaker(breaker.name,
                  `${diagram.name} ${t('deviceDataDialog.section')} ${section.name}`,
                  section,
                  breaker.tableName,
                  breaker.type,
                  breaker.assetID,
                  sectionIndex * svgViewBoxX / diagram.sections.length + lineLength / 2 + breakerIndex * lineLength * 1.2,
                  6 * lineLength,
                  nextSwitchboardIndex !== -1 ? nextSwitchboardIndex : undefined,
                  undefined,
                  undefined,
                  breaker.state,
                  undefined,
                  diagram.assetID ? diagram.assetID : ''
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

  const renderInfeed = (name: string,
    sectionName: string,
    sectionObject: object,
    tableName: string,
    breaker: {
      name: string,
      type: string,
      tableName: string,
      assetID: string,
      state?: number
    },
    type: string,
    x: number,
    y: number,
    switchboardAssetID: string) => {
    switch (type) {
      case DeviceTypes.transformer:
        return (
          <React.Fragment key={`${x}-${y}`}>
            <TransformerSVG
              x={x}
              y={y}
              name={name}
              tableName={tableName}
              assetID={breaker.assetID}
              activePower={systemTopologyData[breaker.assetID]?.Active_Power_Import || 0}
              current={sumCurrent(systemTopologyData[breaker.assetID]?.Current_L1, systemTopologyData[breaker.assetID]?.Current_L2, systemTopologyData[breaker.assetID]?.Current_L3)}
              powerFactor={powerFactorCalculator(systemTopologyData[breaker.assetID]?.Active_Power_Import, Math.max(systemTopologyData[breaker.assetID]?.Reactive_Power_Import, systemTopologyData[breaker.assetID]?.Reactive_Power_Export))}
              breakerName={breaker.name}
              sectionName={sectionName}
              voltageApplied={checkSectionVoltageApplied(sectionObject) && checkBreakerState(breaker.assetID).closed}
              switchboardAssetID={switchboardAssetID}
            />
            {renderBreaker(breaker.name,
              sectionName,
              sectionObject,
              '',
              breaker.type,
              breaker.assetID,
              x,
              y + 3 * lineLength,
              undefined,
              undefined,
              undefined,
              breaker.state,
              true,
              switchboardAssetID)}
          </React.Fragment>
        )
      case DeviceTypes.generator:
        return (
          <React.Fragment key={`${x}-${y}`}>
            <GeneratorSVG
              x={x}
              y={y}
              name={name}
              tableName={tableName}
              assetID={breaker.assetID}
              activePower={systemTopologyData[breaker.assetID]?.Active_Power_Import || 0}
              current={sumCurrent(systemTopologyData[breaker.assetID]?.Current_L1, systemTopologyData[breaker.assetID]?.Current_L2, systemTopologyData[breaker.assetID]?.Current_L3)}
              powerFactor={powerFactorCalculator(systemTopologyData[breaker.assetID]?.Active_Power_Import, Math.max(systemTopologyData[breaker.assetID]?.Reactive_Power_Import, systemTopologyData[breaker.assetID]?.Reactive_Power_Export))}
              breakerName={breaker.name}
              sectionName={sectionName}
              voltageApplied={checkSectionVoltageApplied(sectionObject) && checkBreakerState(breaker.assetID).closed}
              switchboardAssetID={switchboardAssetID}
            />
            {renderBreaker(breaker.name,
              sectionName,
              sectionObject,
              '',
              breaker.type,
              breaker.assetID,
              x,
              y + 3 * lineLength,
              undefined,
              undefined,
              undefined,
              breaker.state,
              true,
              switchboardAssetID)}
          </React.Fragment>
        )
      case '': //no infeed - for distribution boards to not show gen/tr and table above cb
        const previousSwitchboardIndex = overview.diagrams.findIndex(diagram => diagram.name === breaker.tableName)
        return renderBreaker(breaker.name,
          sectionName,
          sectionObject,
          breaker.tableName,
          breaker.type,
          breaker.assetID,
          x,
          y + 3 * lineLength,
          undefined,
          true,
          previousSwitchboardIndex !== -1 ? previousSwitchboardIndex : undefined,
          breaker.state,
          undefined,
          switchboardAssetID)
      default:
        return null
    }
  }

  const renderBreaker = (name: string,
    sectionName: string,
    sectionObject: object,
    tableName: string | undefined,
    type: string,
    assetID: string,
    x: number,
    y: number,
    nextSwitchboardIndex: number | undefined = undefined,
    tableAbove: boolean | undefined = undefined,
    previousSwitchboardIndex: number | undefined = undefined,
    fixedState: number | undefined = undefined,
    infeedBreaker: boolean | undefined = undefined, // reversed voltageAbove with voltageBelow
    switchboardAssetID: string
  ) => {
    //console.log(name, sectionName, sectionObject, tableName, type, assetID)
    switch (type) {
      case DeviceTypes.circuitBreaker:
      case DeviceTypes.infeedBreaker:
      case DeviceTypes.drawOutCircuitBreaker:
        return (
          <CircuitBreakerSVG
            key={`${x}-${y}`}
            x={x}
            y={y}
            state={fixedState !== undefined ? decodeState(fixedState) : decodeState(systemTopologyData[assetID]?.Breaker_State) || false}
            name={name}
            tableName={tableName}
            assetID={assetID}
            activePower={systemTopologyData[assetID]?.Active_Power_Import || 0}
            current={sumCurrent(systemTopologyData[assetID]?.Current_L1, systemTopologyData[assetID]?.Current_L2, systemTopologyData[assetID]?.Current_L3)}
            powerFactor={powerFactorCalculator(systemTopologyData[assetID]?.Active_Power_Import, Math.max(systemTopologyData[assetID]?.Reactive_Power_Import, systemTopologyData[assetID]?.Reactive_Power_Export))}
            noTable={tableName === undefined}
            nextSwitchboardIndex={nextSwitchboardIndex}
            previousSwitchboardIndex={previousSwitchboardIndex}
            tableAbove={tableAbove}
            sectionName={sectionName}
            deviceType={type}
            drawOut={type === DeviceTypes.drawOutCircuitBreaker}
            voltageBelow={infeedBreaker ? checkSectionVoltageApplied(sectionObject) : decodeState(systemTopologyData[assetID]?.Breaker_State).closed && checkSectionVoltageApplied(sectionObject)}
            voltageAbove={infeedBreaker ? checkVoltageApplied(assetID) : checkSectionVoltageApplied(sectionObject)}
            switchboardAssetID={switchboardAssetID}
            connectionState={checkConnectionState(assetID, false)}
          />
        )
      default:
        return null
    }
  }

  const renderSection = (x: number,
    y: number,
    length: number,
    section: object,
    previousSectionUnderVoltage: boolean,
    switchboardAssetID: string,
    endCoupling?: {
      assetID: string,
      name: string,
      type: string,
      nextSectionUnderVoltage: boolean,
      fixedState: number,
      tableName?: string,
    } | false
  ) => {

    return (
      <SectionSVG
        key={`${x}-${y}`}
        x={x}
        y={y}
        length={length}
        voltageApplied={checkSectionVoltageApplied(section)}
        nextSectionVoltageApplied={endCoupling ? endCoupling.nextSectionUnderVoltage : false}
        endCoupling={endCoupling ?
          <CircuitBreakerSVG
            x={x + length}
            y={y - 3 * lineLength}
            state={endCoupling.fixedState !== undefined ? decodeState(endCoupling.fixedState) : decodeState(systemTopologyData[endCoupling.assetID]?.Breaker_State)}
            name={endCoupling.name}
            assetID={endCoupling.assetID}
            activePower={systemTopologyData[endCoupling.assetID]?.Active_Power_Import || 0}
            current={sumCurrent(systemTopologyData[endCoupling.assetID]?.Current_L1, systemTopologyData[endCoupling.assetID]?.Current_L2, systemTopologyData[endCoupling.assetID]?.Current_L3)}
            powerFactor={powerFactorCalculator(systemTopologyData[endCoupling.assetID]?.Active_Power_Import, Math.max(systemTopologyData[endCoupling.assetID]?.Reactive_Power_Import, systemTopologyData[endCoupling.assetID]?.Reactive_Power_Export))}
            drawOut={endCoupling.type === DeviceTypes.drawOutCircuitBreaker}
            deviceType={endCoupling.type}
            noTable={true}
            tableName={endCoupling.tableName}
            tableAbove
            sectionName=''
            voltageBelow={checkSectionVoltageApplied(section) || previousSectionUnderVoltage}
            voltageAbove={endCoupling ? endCoupling.nextSectionUnderVoltage : false}
            switchboardAssetID={switchboardAssetID}
            connectionState={checkConnectionState(endCoupling.assetID, false)}
          />
          : false}
      />
    )
  }

  const sumCurrent = (L1: number, L2: number, L3: number) => {
    const result = parseFloat(Math.max(L1,L2,L3).toFixed(2))
    if (isNaN(result)) {
      return 0
    }
    else {
      return result
    }
  }

  const checkVoltageApplied = (deviceID: string) => {
    const voltage = Math.min(systemTopologyData[deviceID]?.Voltage_L1_N, systemTopologyData[deviceID]?.Voltage_L2_N, systemTopologyData[deviceID]?.Voltage_L3_N)
    return voltage > 0 ? true : false
  }

  const checkSectionVoltageApplied = (section: any) => {
    return section.breakers.filter((breaker: any) => checkVoltageApplied(breaker.assetID)).length > 0 ? true : false
  }

  const checkBreakerState = (assetID: string) => {
    return decodeState(systemTopologyData[assetID]?.Breaker_State)
  }

  const checkConnectionState = (assetID: string | false, nonInteractive: boolean) => {
    if (assetID && systemTopologyData[assetID] && systemTopologyData[assetID].Connection_State && !nonInteractive) {
      return systemTopologyData[assetID].Connection_State
    }
    else if (nonInteractive) {
      return 1
    }
    return 0
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