import React from 'react';
import { lineLength, circleRadius, useStyles } from '../Overview.component';
import { IOverviewTabTransformerSVG } from './OverviewTabTransformerSVG.component';

export const OverviewTabGeneratorSVG: React.FC<IOverviewTabTransformerSVG> = ({ x, y, name, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* circle, 'G' symbol & end line */}
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

      <text
        x={x + circleRadius}
        y={y}
        className={classes.overviewTabSVGTextsCentralLeftAnchor}
      >
        &nbsp;&nbsp;{name}
      </text>
    </React.Fragment>
  )
}