import React from 'react';
import { lineLength, useStyles } from '../Overview.component';

interface ISectionSVG {
  x: number,
  y: number,
  length: number,
  voltageApplied?: boolean,
  endCoupling?: React.ReactNode
}

export const SectionSVG: React.FC<ISectionSVG> = ({ x, y, length, voltageApplied, endCoupling }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      <line
        x1={x - 0.25 * lineLength}
        y1={y}
        x2={x + length + 0.25 * lineLength}
        y2={y}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* breaker component passed as a prop, if coupling */}
      {endCoupling ?
        endCoupling
        : null
      }
      {/* line connection to next section */}
      {endCoupling ?
        <React.Fragment>
          {/* horizontal line */}
          <line
            x1={x + length}
            y1={y - 3 * lineLength}
            x2={x + length + lineLength}
            y2={y - 3 * lineLength}
            className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
          />
          {/* vertical line */}
          <line
            x1={x + length + lineLength}
            y1={y - 3 * lineLength}
            x2={x + length + lineLength}
            y2={y}
            className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
          />
        </React.Fragment>
        : null
      }
    </React.Fragment>
  )
}
