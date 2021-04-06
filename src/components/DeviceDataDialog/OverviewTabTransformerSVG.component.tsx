import React from 'react';
import { lineLength, circleRadius, useStyles } from '../Overview.component';

export interface IOverviewTabTransformerSVG {
  x: number,
  y: number,
  name: string,
  voltageApplied?: boolean,
}

export const OverviewTabTransformerSVG: React.FC<IOverviewTabTransformerSVG> = ({ x, y, name, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* main symbol - 2 lines & 2 circles */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + 0.5 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      <circle
        cx={x}
        cy={y + 0.5 * lineLength + circleRadius}
        r={circleRadius}
        className={voltageApplied ? classes.circleStyleVoltageApplied : classes.circleStyle}
      />
      <circle
        cx={x}
        cy={y + 0.5 * lineLength + 2 * circleRadius}
        r={circleRadius}
        className={voltageApplied ? classes.circleStyleVoltageApplied : classes.circleStyle}
      />
      {/* <line
        x1={x}
        y1={y + 0.5 * lineLength + 3 * circleRadius}
        x2={x}
        y2={y + 0.75 * lineLength + 3 * circleRadius}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      /> */}
      <text
        x={x}
        y={y}
        className={classes.overviewTabSVGTextsCentralLeftAnchor}
      >
        &nbsp;&nbsp;{name}
      </text>
    </React.Fragment>
  )
}