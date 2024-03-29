import React from 'react';
import { lineLength, useStyles } from '../Overview.component';
import { setDeviceDataDialogOpen } from '../../actions/DeviceDataDialog.action';
import { useDispatch } from 'react-redux';

export interface IParametersTableSVG {
  x: number,
  y: number,
  tableName: string,
  parameter1: string | number,
  parameter2: string | number,
  parameter3: string | number,
  deviceType: string,
  breakerName: string,
  sectionName: string,
  assetID: string,
  switchboardAssetID: string
}

export const ParametersTableSVG: React.FC<IParametersTableSVG> = ({ x, y, tableName, parameter1, parameter2, parameter3, deviceType, breakerName, sectionName, assetID, switchboardAssetID }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      {/* parameters table */}
      <rect
        x={x}
        y={y}
        width={1.1 * lineLength}
        height={0.3 * lineLength}
        className={classes.paramsTableTitleStyle}
      />
      <rect
        x={x}
        y={y + 0.3 * lineLength}
        width={1.1 * lineLength}
        height={0.3 * lineLength}
        className={classes.paramsTableRowStyle}
      />
      <rect
        x={x}
        y={y + 0.6 * lineLength}
        width={1.1 * lineLength}
        height={0.3 * lineLength}
        className={classes.paramsTableRowStyle}
      />
      <rect
        x={x}
        y={y + 0.9 * lineLength}
        width={1.1 * lineLength}
        height={0.3 * lineLength}
        className={classes.paramsTableRowStyle}
      />
      {/* parameters table text rows */}
      <text
        x={x + 0.55 * lineLength}
        y={y + 0.15 * lineLength}
        className={classes.paramsTableTitleTextStyle}
      >
        {tableName}
      </text>
      <text
        x={x + 1.1 * lineLength}
        y={y + 0.45 * lineLength}
        className={classes.paramsTableRowTextStyle}
      >
        {parameter1}&nbsp;
      </text>
      <text
        x={x + 1.1 * lineLength}
        y={y + 0.75 * lineLength}
        className={classes.paramsTableRowTextStyle}
      >
        {parameter2}&nbsp;
      </text>
      <text
        x={x + 1.1 * lineLength}
        y={y + 1.05 * lineLength}
        className={classes.paramsTableRowTextStyle}
      >
        {parameter3}&nbsp;
      </text>
      {/* clickable overlay */}
      <rect
        x={x}
        y={y}
        width={1.1 * lineLength}
        height={1.2 * lineLength}
        className={classes.clickableOverlay}
        onClick={() => {
          dispatch(setDeviceDataDialogOpen({
            open: true,
            deviceName: tableName,
            deviceType: deviceType,
            breakerName: breakerName,
            sectionName: sectionName,
            assetID: assetID,
            switchboardAssetID: switchboardAssetID
          }))
        }
        }
      />
    </React.Fragment>
  )
}