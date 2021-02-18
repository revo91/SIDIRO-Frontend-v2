import React from 'react';
import { lineLength, circleRadius } from '../Overview.component';
import { useStyles } from '../Overview.component';

interface ITransformerSVGProps {
  x: number,
  y: number,
  voltageApplied?: boolean
}

export const TransformerSVG: React.FC<ITransformerSVGProps> = ({ x, y, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + lineLength/2}
        className={voltageApplied? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      <circle
        cx={x}
        cy={y + lineLength/2 + circleRadius}
        r={circleRadius}
        className={voltageApplied ? classes.circleStyleVoltageApplied : classes.circleStyle}
      />
      <circle
        cx={x}
        cy={y + lineLength/2 + 2 * circleRadius}
        r={circleRadius}
        className={voltageApplied ? classes.circleStyleVoltageApplied : classes.circleStyle}
      />
      <line
        x1={x}
        y1={y + lineLength/2 + 3 * circleRadius}
        x2={x}
        y2={y + 1.5*lineLength + 3 * circleRadius}
        className={voltageApplied? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
    </React.Fragment>
  )
}