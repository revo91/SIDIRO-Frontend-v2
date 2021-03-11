import React from 'react';
import { compartmentHeight, reservedTopSpace, panelHeight, panelWidth, useStyles } from '../Elevation.component';

interface IPanelSVG {
  x: number,
  y: number,
  name?: string
}

export const PanelSVG: React.FC<IPanelSVG> = ({ x, y, name, children }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top sivacon plate */}
      <text
        x={x + 0.5 * panelWidth}
        y={y + 0.2 * compartmentHeight}
        className={classes.siemensLogoPlate}
      >
        SIEMENS
      </text>
      <rect
        x={x + 0.3 * panelWidth}
        y={y + 0.05 * compartmentHeight}
        width={0.4 * panelWidth}
        height={0.3 * compartmentHeight}
        className={classes.siemensLogoOutline}
      />
      {/* horizontal divider */}
      <line
        x1={x}
        y1={y + reservedTopSpace}
        x2={x + panelWidth}
        y2={y + reservedTopSpace}
        className={classes.lineStyle}
      />
      {/* top edge */}
      <line
        x1={x}
        y1={y}
        x2={x + panelWidth}
        y2={y}
        className={classes.lineStyle}
      />
      {/* left edge */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + panelHeight}
        className={classes.lineStyle}
      />
      {/* right edge */}
      <line
        x1={x + panelWidth}
        y1={y}
        x2={x + panelWidth}
        y2={y + panelHeight}
        className={classes.lineStyle}
      />
      {/* bottom edge */}
      <line
        x1={x}
        y1={y + panelHeight}
        x2={x + panelWidth}
        y2={y + panelHeight}
        className={classes.lineStyle}
      />
      {/* decorative base */}
      <rect
        x={x}
        y={y + panelHeight}
        width={panelWidth}
        height={reservedTopSpace}
        className={classes.panelBase}
      />
      {/* /////////////////////////
      Children (compartments inside)
      ///////////////////////// */}
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return
        return child
      })}
      {/* panel name */}
      <text
        x={x + 0.5 * panelWidth}
        y={y + panelHeight + 2*reservedTopSpace}
        className={classes.panelName}
      >
        {name}
      </text>
    </React.Fragment>
  )
}