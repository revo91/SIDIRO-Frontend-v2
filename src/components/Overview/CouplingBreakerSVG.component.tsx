import React from 'react';
import { lineLength } from '../Overview.component';
import { useStyles } from '../Overview.component';

interface ICouplingBreakerSVG {
  x: number,
  y: number,
  state: string,
  voltageApplied?: boolean
}

export const CouplingBreakerSVG: React.FC<ICouplingBreakerSVG> = ({ x, y, state, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* top dashes - 4 * 90deg connected lines */}
      <line
        x1={x}
        y1={y + 0.25 * lineLength}
        x2={x}
        y2={y + 0.5 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(45 ${x} ${y + 0.25 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 0.25 * lineLength}
        x2={x}
        y2={y + 0.5 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(315 ${x} ${y + 0.25 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 0.15 * lineLength}
        x2={x}
        y2={y + 0.4 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(135 ${x} ${y + 0.4 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 0.15 * lineLength}
        x2={x}
        y2={y + 0.4 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(225 ${x} ${y + 0.4 * lineLength})`}
      />
      {/* 'X' symbol - 2 * 90deg crossed lines*/}
      <line
        x1={x}
        y1={y + 1 * lineLength}
        x2={x}
        y2={y + 1.5 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(45 ${x} ${y + 1.25 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 1 * lineLength}
        x2={x}
        y2={y + 1.5 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(-45 ${x} ${y + 1.25 * lineLength})`}
      />
      {/* breaker's rotating element */}
      <line
        x1={x}
        y1={y + 1.25 * lineLength}
        x2={x}
        y2={y + 2.25 * lineLength}
        transform={state === 'open' ? `rotate(-45 ${x} ${y + 2.25 * lineLength})` : `rotate(0 ${x} ${y + 2.25 * lineLength})`}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      <line
        x1={x}
        y1={y + 2.25 * lineLength}
        x2={x}
        y2={y + 3 * lineLength}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* bottom dashes - 4 * 90deg connected lines */}
      <line
        x1={x}
        y1={y + 2.6 * lineLength}
        x2={x}
        y2={y + 2.85 * lineLength}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(135 ${x} ${y + 2.6 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 2.6 * lineLength}
        x2={x}
        y2={y + 2.85 * lineLength}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(225 ${x} ${y + 2.6 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 2.5 * lineLength}
        x2={x}
        y2={y + 2.75 * lineLength}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(45 ${x} ${y + 2.75 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 2.5 * lineLength}
        x2={x}
        y2={y + 2.75 * lineLength}
        className={voltageApplied && state === 'closed' ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(315 ${x} ${y + 2.75 * lineLength})`}
      />
    </React.Fragment>
  )
}