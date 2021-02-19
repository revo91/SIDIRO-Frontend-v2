import React from 'react';
import { lineLength, circleRadius } from '../Overview.component';
import { useStyles } from '../Overview.component';

interface IGeneratorSVGProps {
  x: number,
  y: number,
  voltageApplied?: boolean
}

export const GeneratorSVG: React.FC<IGeneratorSVGProps> = ({ x, y, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      <circle
        cx={x}
        cy={y + circleRadius}
        r={circleRadius}
        className={voltageApplied ? classes.circleStyleVoltageApplied : classes.circleStyle}
      />
      <text
        x={x}
        y={y + circleRadius}
        className={classes.generatorSymbolTextStyle}
      >
        G
      </text>
      <line
        x1={x}
        y1={y + 2 * circleRadius}
        x2={x}
        y2={y + 2 * circleRadius + 2 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
    </React.Fragment>
  )
}