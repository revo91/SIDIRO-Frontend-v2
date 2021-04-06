import React from 'react';
import { lineLength, circleRadius, useStyles } from '../Overview.component';
import { ParametersTableSVG } from './ParametersTableSVG.component';
import { DeviceTypes } from '../../utilities/DeviceTypes.utility';
import { ITransformerSVGProps } from './TransformerSVG.component';

export const GeneratorSVG: React.FC<ITransformerSVGProps> = ({ x, y, name, sectionName, tableName, activePower, current, powerFactor, voltageApplied, noTable, overview, breakerName }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      {/* generator name if not overview mode */}
      {!overview ?
        <text
          x={x + 2 * lineLength}
          y={y}
          className={classes.infeedsNameStyle}
        >
          {name}&nbsp;
      </text>
        : null
      }
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
      {!noTable && tableName ?
        <ParametersTableSVG
          x={x + 0.7 * lineLength}
          y={y + 0.5 * lineLength}
          tableName={tableName}
          parameter1={`${activePower} kW`}
          parameter2={`${current} A`}
          parameter3={`${powerFactor} PF`}
          deviceType={DeviceTypes.generator}
          breakerName={breakerName}
          sectionName={sectionName}
        />
        : null
      }
      {/* DeviceDataDialog's OverviewTab visualization */}
      {overview ?
        <text
          x={x + circleRadius}
          y={y}
          className={classes.overviewTabSVGTextsCentralLeftAnchor}
        >
          &nbsp;&nbsp;{name}
        </text>
        : null
      }
    </React.Fragment>
  )
}