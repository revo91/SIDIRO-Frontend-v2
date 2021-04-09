import React from 'react';
import { lineLength, useStyles } from '../Overview.component';

interface IOverviewTabCircuitBreakerSVG {
  x: number,
  y: number,
  closed: boolean,
  name: string,
  sectionName?: string,
  outgoingFeederName?: string,
  bottomSection?: boolean,
  topSection?: boolean
}

export const OverviewTabCircuitBreakerSVG: React.FC<IOverviewTabCircuitBreakerSVG> = (
  {
    x,
    y,
    closed,
    name,
    sectionName,
    outgoingFeederName,
    bottomSection,
    topSection
  }
) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top line */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + lineLength}
        className={classes.lineStyle}
      />
      {/* 'X' symbol - 2 * 90deg crossed lines*/}
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={classes.lineStyle}
        transform={`rotate(45 ${x} ${y + lineLength})`}
      />
      <line
        x1={x}
        y1={y + 0.75 * lineLength}
        x2={x}
        y2={y + 1.25 * lineLength}
        className={classes.lineStyle}
        transform={`rotate(-45 ${x} ${y + lineLength})`}
      />
      {/* breaker's rotating element */}
      <line
        x1={x}
        y1={y + lineLength}
        x2={x}
        y2={y + 2 * lineLength}
        transform={closed === false ? `rotate(-45 ${x} ${y + 2 * lineLength})` : `rotate(0 ${x} ${y + 2 * lineLength})`}
        className={classes.lineStyle}
      />
      {/* end line */}
      <line
        x1={x}
        y1={y + 2 * lineLength}
        x2={x}
        y2={y + 3 * lineLength}
        className={classes.lineStyle}
      />
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
            className={classes.lineStyle}
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
          {/* infeed name */}
          <text
            x={x}
            y={y -1}
            className={classes.overviewTabSVGTextsCentralAnchor}
          >
            {outgoingFeederName}
          </text>
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
            className={classes.lineStyle}
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
  )
}