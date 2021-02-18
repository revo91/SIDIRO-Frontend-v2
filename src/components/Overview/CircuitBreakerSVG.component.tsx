import React from 'react';
import { lineLength } from '../Overview.component';
import { useStyles } from '../Overview.component';

interface ICircuitBreakerSVG {
  x: number,
  y: number,
  state: string,
  voltageApplied?: boolean
}

export const CircuitBreakerSVG: React.FC<ICircuitBreakerSVG> = ({ x, y, state, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
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
      <line
        x1={x}
        y1={y + 2 * lineLength}
        x2={x}
        y2={y + 3 * lineLength}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
    </React.Fragment>
  )
}