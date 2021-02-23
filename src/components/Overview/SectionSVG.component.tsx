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
        x1={x}
        y1={y}
        x2={x + length}
        y2={y}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      {/* breaker component if coupling */}
      {endCoupling !== undefined ?
        endCoupling
        : null
      }
      {/* line connection to next section */}
      {endCoupling !== undefined ?
        <React.Fragment>
          <line
            x1={x + length}
            y1={y - 3 * lineLength}
            x2={x + length + lineLength}
            y2={y - 3 * lineLength}
            className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
          />
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