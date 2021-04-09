import React from 'react';
import { lineLength, circleRadius, useStyles } from '../Overview.component';
import { ParametersTableSVG } from './ParametersTableSVG.component';
import { DeviceTypes } from '../../utilities/DeviceTypes.utility';

export interface ITransformerSVGProps {
  x: number,
  y: number,
  name: string,
  sectionName: string,
  assetID: string,
  tableName?: string,
  activePower?: number,
  current?: number,
  powerFactor?: number,
  voltageApplied?: boolean,
  noTable?: boolean,
  //for DeviceDataDialog.component's OverviewTab visualization
  overview?: boolean,
  breakerName: string,
  switchboardAssetID: string
}

export const TransformerSVG: React.FC<ITransformerSVGProps> = ({ x, y, name, sectionName, tableName, assetID, activePower, current, powerFactor, voltageApplied, noTable, overview, breakerName, switchboardAssetID }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {/* top to bottom */}
      {/* transformer name if not overview mode */}
      {!overview ?
        <text
          x={x}
          y={y}
          className={classes.infeedsNameStyle}
        >
          {name}&nbsp;
        </text>
        : null
      }
      {/* main symbol - 2 lines & 2 circles */}
      <line
        x1={x}
        y1={y}
        x2={x}
        y2={y + 0.5 * lineLength}
        className={voltageApplied ? classes.lineStyleVoltageApplied : classes.lineStyle}
      />
      <circle
        cx={x}
        cy={y + 0.5 * lineLength + circleRadius}
        r={circleRadius}
        className={voltageApplied ? classes.circleStyleVoltageApplied : classes.circleStyle}
      />
      <circle
        cx={x}
        cy={y + 0.5 * lineLength + 2 * circleRadius}
        r={circleRadius}
        className={voltageApplied ? classes.circleStyleVoltageApplied : classes.circleStyle}
      />
      <line
        x1={x}
        y1={y + 0.5 * lineLength + 3 * circleRadius}
        x2={x}
        y2={y + 1.5 * lineLength + 3 * circleRadius}
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
          deviceType={DeviceTypes.transformer}
          breakerName={breakerName}
          sectionName={sectionName}
          assetID={assetID}
          switchboardAssetID={switchboardAssetID}
        />
        : null
      }
      {/* DeviceDataDialog's OverviewTab visualization */}
      {overview ?
        <text
          x={x}
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