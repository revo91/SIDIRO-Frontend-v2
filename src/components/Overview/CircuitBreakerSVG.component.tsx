import React from 'react';
import { lineLength, useStyles } from '../Overview.component';
import { ParametersTableSVG } from './ParametersTableSVG.component';
import { useDispatch } from 'react-redux';
import { setUniversalTabsNameIndex } from '../../actions/UniversalTabs.action';

interface ICircuitBreakerSVG {
  x: number,
  y: number,
  state: {
    closed: boolean,
    tripped: boolean,
    drawnOut: boolean
  },
  name: string,
  deviceType: string,
  sectionName: string,
  assetID: string,
  tableName?: string,
  activePower?: number,
  current?: number,
  powerFactor?: number,
  voltageApplied?: boolean,
  noTable?: boolean,
  tableAbove?: boolean,
  nextSwitchboardIndex?: number,
  previousSwitchboardIndex?: number,
  drawOut?: boolean,
  voltageAbove?: boolean,
  voltageBelow?: boolean,
  switchboardAssetID: string
}

export const CircuitBreakerSVG: React.FC<ICircuitBreakerSVG> = (
  {
    x,
    y,
    state,
    name,
    deviceType,
    sectionName,
    assetID,
    tableName,
    activePower,
    current,
    powerFactor,
    noTable,
    tableAbove,
    nextSwitchboardIndex,
    previousSwitchboardIndex,
    drawOut,
    voltageAbove,
    voltageBelow,
    switchboardAssetID
  }
) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {/* top to bottom */}
      <text
        x={x}
        y={y + 0.07 * lineLength}
        className={classes.circuitBreakersNameStyle}
      >
        {name}&nbsp;
        </text>
      {/* top line */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + lineLength}
        className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {drawOut ?
        /* top dashes if drawOut - 4 * 90deg connected lines */
        <React.Fragment>
          <line
            x1={x}
            y1={y + 0.25 * lineLength}
            x2={x}
            y2={y + 0.5 * lineLength}
            className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(45 ${x} ${y + 0.25 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 0.25 * lineLength}
            x2={x}
            y2={y + 0.5 * lineLength}
            className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(315 ${x} ${y + 0.25 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 0.15 * lineLength}
            x2={x}
            y2={y + 0.4 * lineLength}
            className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(135 ${x} ${y + 0.4 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 0.15 * lineLength}
            x2={x}
            y2={y + 0.4 * lineLength}
            className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(225 ${x} ${y + 0.4 * lineLength})`}
          />
          {/* bottom dashes - 4 * 90deg connected lines */}
          <line
            x1={x}
            y1={y + 2.6 * lineLength}
            x2={x}
            y2={y + 2.85 * lineLength}
            className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(135 ${x} ${y + 2.6 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 2.6 * lineLength}
            x2={x}
            y2={y + 2.85 * lineLength}
            className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(225 ${x} ${y + 2.6 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 2.5 * lineLength}
            x2={x}
            y2={y + 2.75 * lineLength}
            className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(45 ${x} ${y + 2.75 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 2.5 * lineLength}
            x2={x}
            y2={y + 2.75 * lineLength}
            className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(315 ${x} ${y + 2.75 * lineLength})`}
          />
        </React.Fragment>
        : null
      }
      {/* 'X' symbol - 2 * 90deg crossed lines*/}
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(45 ${x} ${y + lineLength})`}
      />
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(-45 ${x} ${y + lineLength})`}
      />
      {/* breaker's rotating element */}
      <line
        x1={x}
        y1={y + lineLength}
        x2={x}
        y2={y + 2 * lineLength}
        transform={state.closed ? `rotate(0 ${x} ${y + 2 * lineLength})` : `rotate(-45 ${x} ${y + 2 * lineLength})`}
        className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* end line */}
      <line
        x1={x}
        y1={y + 2 * lineLength}
        x2={x}
        y2={y + 3 * lineLength}
        className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* params table */}
      {
        !noTable && tableName ? <ParametersTableSVG
          x={x - 1.1 * lineLength / 2}
          y={tableAbove ? y - 1.25 * lineLength : y + 3 * lineLength}
          tableName={tableName}
          parameter1={`${activePower} kW`}
          parameter2={`${current} A`}
          parameter3={`${powerFactor} PF`}
          deviceType={deviceType}
          breakerName={name}
          sectionName={sectionName}
          assetID={assetID}
          switchboardAssetID={switchboardAssetID}
        /> : null
      }
      {/* arrow top if tableAbove */}
      {!noTable && tableName && tableAbove && previousSwitchboardIndex !== undefined ?
        <React.Fragment>
          {/* top arrow */}
          <line
            x1={x}
            x2={x}
            y1={y - 2.2 * lineLength}
            y2={y - 1.3 * lineLength}
            className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
          />
          {/* 2 crossed lines forming arrow */}
          <line
            x1={x}
            y1={y - 2.2 * lineLength}
            x2={x}
            y2={y - 1.95 * lineLength}
            className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(45 ${x} ${y - 2.2 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + -2.2 * lineLength}
            x2={x}
            y2={y - 1.95 * lineLength}
            className={voltageAbove ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(315 ${x} ${y - 2.2 * lineLength})`}
          />
          {/* clickable overlay */}
          <rect
            onClick={() => dispatch(setUniversalTabsNameIndex('overview', previousSwitchboardIndex))}
            x={x - 0.55 * lineLength}
            y={y - 2.3 * lineLength}
            width={1.1 * lineLength}
            height={1.05 * lineLength}
            className={classes.clickableOverlay}
          />
        </React.Fragment>
        : null
      }
      {/* arrow to next diagram if the circuit breaker infeeds next switchboard */}
      {nextSwitchboardIndex !== undefined ?
        <React.Fragment>
          {/* top arrow */}
          <line
            x1={x}
            x2={x}
            y1={y + 4.25 * lineLength}
            y2={y + 4.75 * lineLength}
            className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
          />
          {/* 2 crossed lines forming arrow */}
          <line
            x1={x}
            y1={y + 4.75 * lineLength}
            x2={x}
            y2={y + 5 * lineLength}
            className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(135 ${x} ${y + 4.75 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 4.75 * lineLength}
            x2={x}
            y2={y + 5 * lineLength}
            className={voltageBelow ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(225 ${x} ${y + 4.75 * lineLength})`}
          />
          {/* clickable overlay */}
          <rect
            onClick={() => dispatch(setUniversalTabsNameIndex('overview', nextSwitchboardIndex))}
            x={x - 0.55 * lineLength}
            y={y + 4.2 * lineLength}
            width={1.1 * lineLength}
            height={0.75 * lineLength}
            className={classes.clickableOverlay}
          />
        </React.Fragment>
        : null
      }
    </React.Fragment>
  )
}