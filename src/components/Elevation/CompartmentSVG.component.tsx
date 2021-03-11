import React from 'react';
import { compartmentHeight, reservedTopSpace, panelWidth, strokeWidth, useStyles } from '../Elevation.component';

interface ICompartmentSVG {
  x: number,
  y: number,
  span: number,
  columns?: number
}

export interface ICompartmentDevice {
  x: number,
  y: number,
  scale: number
}

export const CompartmentSVG: React.FC<ICompartmentSVG> = ({ x, y, span, columns, children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {children}
      {/* clickable rectangle */}
      <rect
        x={x + strokeWidth}
        y={y + reservedTopSpace + strokeWidth}
        width={columns ? (panelWidth / columns - 2 * strokeWidth) : (panelWidth - 2 * strokeWidth)}
        height={span * compartmentHeight - 2 * strokeWidth}
        className={classes.clickableOverlay}
      />
      {/* compartment rectangle */}
      <rect
        x={x}
        y={y + reservedTopSpace}
        width={columns ? panelWidth / columns : panelWidth}
        height={span * compartmentHeight}
        className={classes.lineStyle}
      />

    </React.Fragment>
  )
}