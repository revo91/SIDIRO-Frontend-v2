import React from 'react';
import { lineLength } from '../Overview.component';
import { ParametersTableSVG } from './ParametersTableSVG.component';
import { useStyles } from '../Overview.component';

interface ICircuitBreakerSVG {
  x: number,
  y: number,
  state: string,
  name: string,
  tableName: string,
  activePower: number,
  current: number,
  powerFactor: number,
  voltageApplied?: boolean
}

export const CircuitBreakerSVG: React.FC<ICircuitBreakerSVG> = ({ x, y, state, name, tableName, activePower, current, powerFactor, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      {/* circuit breaker name */}
      <text
        x={x}
        y={y}
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
      <ParametersTableSVG x={x - 1.1 * lineLength / 2} y={y + 3 * lineLength} tableName={tableName} parameter1={`${activePower} kW`} parameter2={`${current} A`} parameter3={`${powerFactor} PF`} />
    </React.Fragment>
  )
}