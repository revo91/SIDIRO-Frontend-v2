import React from 'react';
import { useStyles } from '../Overview.component';

interface ISectionSVG {
  x: number,
  y: number,
  length: number,
  voltageApplied?: boolean
}

export const SectionSVG: React.FC<ISectionSVG> = ({ x, y, length, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      <line
        x1={x}
        y1={y}
        x2={x  + length}
        y2={y}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
    </React.Fragment>
  )
}