import React from 'react';
import { compartmentHeight, reservedTopSpace, panelWidth, strokeWidth, useStyles } from '../Elevation.component';
import { setDeviceDataDialogOpen } from '../../actions/DeviceDataDialog.action';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

interface ICompartmentSVG {
  x: number,
  y: number,
  span: number,
  columns: number,
  name?: string,
  nonInteractive?: boolean,
  state: {
    closed: boolean,
    tripped: boolean,
    drawnOut: boolean
  },
  deviceName: string,
  deviceType: string,
  sectionName: string,
  breakerName: string,
  assetID: string,
  switchboardAssetID: string,
  connectionState: number
}

export interface ICompartmentDevice {
  x: number,
  y: number,
  scale: number
}

export const CompartmentSVG: React.FC<ICompartmentSVG> = ({ x, y, span, columns, name, nonInteractive, children, state, deviceName, deviceType, sectionName, breakerName, assetID, switchboardAssetID, connectionState }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const width = panelWidth / columns - 2 * strokeWidth
  const height = span * compartmentHeight - 2 * strokeWidth
  return (
    <React.Fragment>
      {children}
      {/* special compartment state colors */}
      <rect
        x={x + strokeWidth}
        y={y + reservedTopSpace + strokeWidth}
        width={width}
        height={height}
        className={state.drawnOut || state.tripped ? classes.cbTrippedOverlay : !state.closed ? classes.cbOpenOverlay : classes.transparent}
      />
      {/* compartment name */}
      {/* compartment width > length ? text horizontally : text vertically to accomodate physically */}
      <text
        x={x + width}
        y={y + reservedTopSpace + 3 * strokeWidth}
        className={width <= height ? classes.compartmentNameVertical : classes.compartmentNameHorizontal}
        transform={width <= height ?
          `rotate(-90, ${x + width}, ${y + reservedTopSpace + 4 * strokeWidth})`
          : undefined}
      >
        {name}
      </text>
      {/* no connection text */}
      {connectionState !== 1 ?
        <text
          x={x}
          y={y + reservedTopSpace + 3 * strokeWidth}
          className={width <= height ? classes.noConnectionAlarmVertical : classes.noConnectionAlarmHorizontal}
          transform={width <= height ?
            `rotate(90, ${x + strokeWidth}, ${y + reservedTopSpace + 3 * strokeWidth})`
            : undefined}
        >
          &nbsp;{`${t('svgCompartment.noConnection')}`}
        </text>
        : null
      }
      {/* clickable rectangle */}
      {!nonInteractive ?
        <rect
          x={x + strokeWidth}
          y={y + reservedTopSpace + strokeWidth}
          width={width}
          height={height}
          className={classes.clickableOverlay}
          onClick={() => {
            dispatch(setDeviceDataDialogOpen({
              open: true,
              deviceName: deviceName,
              deviceType: deviceType,
              breakerName: breakerName,
              sectionName: sectionName,
              assetID: assetID,
              switchboardAssetID: switchboardAssetID
            }))
          }}
        />
        : null
      }
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