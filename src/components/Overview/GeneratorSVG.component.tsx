import React from 'react';
import { lineLength, circleRadius, useStyles } from '../Overview.component';
import { ParametersTableSVG } from './ParametersTableSVG.component';
import { DeviceTypes } from '../../utilities/DeviceTypes.utility';
import { ITransformerSVGProps } from './TransformerSVG.component';

export const GeneratorSVG: React.FC<ITransformerSVGProps> = ({ x, y, name, tableName, activePower, reactivePower, powerFactor, voltageApplied }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      {/* transformer name */}
      <text
        x={x + 2 * lineLength}
        y={y}
        className={classes.infeedsNameStyle}
      >
        {name}&nbsp;
      </text>
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
      <line
        x1={x}
        y1={y + 2 * circleRadius}
        x2={x}
        y2={y + 2 * circleRadius + 2 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      <ParametersTableSVG
        x={x + 0.7 * lineLength}
        y={y + 0.5 * lineLength}
        tableName={tableName}
        parameter1={`${activePower} kW`}
        parameter2={`${reactivePower} kVar`}
        parameter3={`${powerFactor} PF`}
        deviceType={DeviceTypes.generator}
      />
    </React.Fragment>
  )
}