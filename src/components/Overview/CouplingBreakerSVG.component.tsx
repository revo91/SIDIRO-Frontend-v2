import React from 'react';
import { lineLength } from '../Overview.component';
import { useStyles } from '../Overview.component';

interface ICouplingBreakerSVG {
  x: number,
  y: number,
  state: {
    closed: boolean,
    tripped: boolean,
    drawnOut: boolean
  },
  name: string,
  voltageApplied?: boolean,
  drawOut?: boolean,
  //for DeviceDataDialog.component's OverviewTab visualization
  overview?: boolean,
  sectionName?: string,
  bottomSection?: boolean
}

export const CouplingBreakerSVG: React.FC<ICouplingBreakerSVG> = ({ x, y, state, name, voltageApplied, drawOut, overview, sectionName, bottomSection }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      {/* circuit breaker name */}
      {!overview ?
        <text
          x={x - 0.2 * lineLength}
          y={y + 0.65 * lineLength}
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
        y2={y + 1 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {drawOut ?
        /* top dashes if drawOut - 4 * 90deg connected lines */
        <React.Fragment>
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
        </React.Fragment>
        : null
      }

      {/* 'X' symbol - 2 * 90deg crossed lines*/}
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(45 ${x} ${y + 1 * lineLength})`}
      />
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
        transform={`rotate(-45 ${x} ${y + 1 * lineLength})`}
      />
      {/* breaker's rotating element */}
      <line
        x1={x}
        y1={y + 1 * lineLength}
        x2={x}
        y2={y + 2 * lineLength}
        transform={state.closed ? `rotate(0 ${x} ${y + 2 * lineLength})` : `rotate(-45 ${x} ${y + 2 * lineLength})`}
        className={voltageApplied && state.closed ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      <line
        x1={x}
        y1={y + 2 * lineLength}
        x2={x}
        y2={y + 3 * lineLength}
        className={voltageApplied && state.closed ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {drawOut ?
        /* bottom dashes - 4 * 90deg connected lines */
        <React.Fragment>
          <line
            x1={x}
            y1={y + 2.6 * lineLength}
            x2={x}
            y2={y + 2.85 * lineLength}
            className={voltageApplied && state.closed ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(135 ${x} ${y + 2.6 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 2.6 * lineLength}
            x2={x}
            y2={y + 2.85 * lineLength}
            className={voltageApplied && state.closed ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(225 ${x} ${y + 2.6 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 2.5 * lineLength}
            x2={x}
            y2={y + 2.75 * lineLength}
            className={voltageApplied && state.closed ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(45 ${x} ${y + 2.75 * lineLength})`}
          />
          <line
            x1={x}
            y1={y + 2.5 * lineLength}
            x2={x}
            y2={y + 2.75 * lineLength}
            className={voltageApplied && state.closed ? classes.lineStyleVoltageApplied : classes.lineStyle}
            transform={`rotate(315 ${x} ${y + 2.75 * lineLength})`}
          />
        </React.Fragment>
        : null
      }
      {/* DeviceDataDialog's OverviewTab visualization */}
      {overview && bottomSection ?
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
          {/* central circuit breaker name */}
          <text
            x={x}
            y={y + 1.75 * lineLength}
            className={classes.overviewTabSVGTextsCentralLeftAnchor}
          >
            &nbsp;&nbsp;{name}
          </text>
        </React.Fragment>
        : null
      }
    </React.Fragment>
  )
}