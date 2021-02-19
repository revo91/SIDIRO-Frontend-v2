import React from 'react';
import { lineLength, circleRadius } from '../Overview.component';
import { ParametersTableSVG } from './ParametersTableSVG.component';
import { useStyles } from '../Overview.component';

interface ITransformerSVGProps {
  x: number,
  y: number,
  name: string,
  tableName: string,
  activePower: number,
  reactivePower: number,
  powerFactor: number,
  voltageApplied?: boolean
}

export const TransformerSVG: React.FC<ITransformerSVGProps> = ({ x, y, name, tableName, activePower, reactivePower, powerFactor, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      {/* transformer name */}
      <text
        x={x}
        y={y}
        className={classes.infeedsNameStyle}
      >
        {name}&nbsp;
      </text>
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
      <line
        x1={x}
        y1={y + 0.5 * lineLength + 3 * circleRadius}
        x2={x}
        y2={y + 1.5 * lineLength + 3 * circleRadius}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      <ParametersTableSVG x={x + 0.7 * lineLength} y={y + 0.5 * lineLength} tableName={tableName} parameter1={`${activePower} kW`} parameter2={`${reactivePower} kVar`} parameter3={`${powerFactor} PF`} />
    </React.Fragment>
  )
}