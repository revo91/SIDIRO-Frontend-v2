import React from 'react';
import { lineLength, useStyles } from '../Overview.component';
import { ParametersTableSVG } from './ParametersTableSVG.component';
import { DeviceTypes } from '../../utilities/DeviceTypes.utility';

interface ICircuitBreakerSVG {
  x: number,
  y: number,
  state: string,
  name: string,
  tableName?: string,
  activePower?: number,
  current?: number,
  powerFactor?: number,
  voltageApplied?: boolean,
  noTable?: boolean,
  //for DeviceDataDialog.component's OverviewTab visualization
  overview?: boolean,
  sectionName?: string,
  outgoingFeederName?: string,
  bottomSection?: boolean,
  topSection?: boolean
}

export const CircuitBreakerSVG: React.FC<ICircuitBreakerSVG> = (
  {
    x,
    y,
    state,
    name,
    tableName,
    activePower,
    current,
    powerFactor,
    voltageApplied,
    noTable,
    overview,
    sectionName,
    outgoingFeederName,
    bottomSection,
    topSection
  }
) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      {/* circuit breaker name */}
      {!overview ?
        <text
          x={x}
          y={y + 0.1 * lineLength}
          className={classes.circuitBreakersNameStyle}
        >
          {name}&nbsp;
        </text>
        : null
      }
      {/* top line */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* 'X' symbol - 2 * 90deg crossed lines*/}
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(45 ${x} ${y + lineLength})`}
      />
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(-45 ${x} ${y + lineLength})`}
      />
      {/* breaker's rotating element */}
      <line
        x1={x}
        y1={y + lineLength}
        x2={x}
        y2={y + 2 * lineLength}
        transform={state === 'open' ? `rotate(-45 ${x} ${y + 2 * lineLength})` : `rotate(0 ${x} ${y + 2 * lineLength})`}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* end line */}
      <line
        x1={x}
        y1={y + 2 * lineLength}
        x2={x}
        y2={y + 3 * lineLength}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* params table */}
      {
        !noTable && tableName ? <ParametersTableSVG
          x={x - 1.1 * lineLength / 2}
          y={y + 3 * lineLength}
          tableName={tableName}
          parameter1={`${activePower} kW`}
          parameter2={`${current} A`}
          parameter3={`${powerFactor} PF`}
          deviceType={DeviceTypes.circuitBreaker}
          breakerName={name}
        /> : null
      }
      {/* DeviceDataDialog's OverviewTab visualization */}
      {overview && outgoingFeederName ?
        <React.Fragment>
          {topSection ?
            <React.Fragment>
              {/* topSection name */}
              <text
                x={x}
                y={y - 1}
                className={classes.overviewTabSVGTextsCentralAnchor}
              >
                {sectionName}
              </text>
              {/* topSection horizontal line */}
              <line
                x1={x - lineLength}
                y1={y}
                x2={x + lineLength}
                y2={y}
                className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
              />
              {/* outgoing feeder name */}
              <text
                x={x}
                y={y + 3.2 * lineLength}
                className={classes.overviewTabSVGTextsCentralAnchor}
              >
                {outgoingFeederName}
              </text>
            </React.Fragment>
            : null
          }
          {bottomSection ?
            <React.Fragment>
              {/* bottomSection name */}
              <text
                x={x}
                y={y + 3.2 * lineLength}
                className={classes.overviewTabSVGTextsCentralAnchor}
              >
                {sectionName}
              </text>
              {/* bottomSection horizontal line */}
              <line
                x1={x - lineLength}
                y1={y + 3 * lineLength}
                x2={x + lineLength}
                y2={y + 3 * lineLength}
                className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
              />
            </React.Fragment>
            : null}
          {/* central circuit breaker name */}
          <text
            x={x}
            y={y + 1.5 * lineLength}
            className={classes.overviewTabSVGTextsCentralLeftAnchor}
          >
            &nbsp;&nbsp;{name}
          </text>
        </React.Fragment>
        : null}
    </React.Fragment>
  )
}