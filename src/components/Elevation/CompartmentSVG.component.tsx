import React from 'react';
import { compartmentHeight, reservedTopSpace, panelWidth, strokeWidth, useStyles } from '../Elevation.component';

interface ICompartmentSVG {
  x: number,
  y: number,
  span: number
}

export const CompartmentSVG: React.FC<ICompartmentSVG> = ({ x, y, span, children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* /////////////////////////
      Children (compartments inside)
      ///////////////////////// */}
      {children}
      {/* {React.Children.map(children, (child, index) => {
        return (index)
      })} */}
      {/* clickable rectangle */}
      <rect
        x={x + strokeWidth}
        y={y + reservedTopSpace + strokeWidth}
        width={panelWidth - 2 * strokeWidth}
        height={span * compartmentHeight - 2 * strokeWidth}
        className={classes.clickableOverlay}
      />
      {/* compartment rectangle */}
      <rect
        x={x}
        y={y + reservedTopSpace}
        width={panelWidth}
        height={span * compartmentHeight}
        className={classes.lineStyle}
      />

    </React.Fragment>
  )
}