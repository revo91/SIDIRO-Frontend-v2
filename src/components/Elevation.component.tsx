import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PanelSVG } from './Elevation/PanelSVG.component';
import { SiemensAccentTeal, SiemensAccentYellow, SiemensAccentBlue } from '../utilities/SiemensColors.utility';
import { CompartmentSVG } from './Elevation/CompartmentSVG.component';
import { CircuitBreaker3VAVerticalSVG } from './Elevation/CircuitBreaker3VAVerticalSVG.component';
import { CircuitBreaker3WLSVG } from './Elevation/CircuitBreaker3WLSVG.component';
import { CircuitBreaker3VAHorizontalSVG } from './Elevation/CircuitBreaker3VAHorizontalSVG.component';
import { SwitchDisconnector3NP1VerticalSVG } from './Elevation/SwitchDisconnector3NP1VerticalSVG.component';
import { SwitchDisconnector3NJ6SVG } from './Elevation/SwitchDisconnector3NJ6SVG.component';
import { SwitchDisconnector3NJ4SVG } from './Elevation/SwitchDisconnector3NJ4SVG.component';
import { UniversalTabs } from './UniversalTabs.component';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/Root.reducer';
import { useTranslation } from 'react-i18next';
import { decodeState } from '../utilities/DecodeState.utility';
import { DeviceTypes } from '../utilities/DeviceTypes.utility';
import { IDeviceData } from '../reducers/DeviceDataDialogElevationDataSource.reducer';

//common constants for SVGs to import /////////////////
export const panelWidth = 600;
export const panelHeight = 2100;
export const reservedTopSpace = 100;
export const compartmentHeight = (panelHeight - reservedTopSpace) / 12;
export const strokeWidth = compartmentHeight / 32;
// DO NOT MODIFY THESE - WILL MAKE SVG DISPLACE - SCALING PERFORMED BY SCALE PROP !! @@@@
export const circuitBreaker3WLWidthPixels = 200;
export const circuitBreaker3WLHeightPixels = 260;
export const circuitBreaker3VAHorizontalWidthPixels = 100;
export const circuitBreaker3VAHorizontalHeightPixels = 100;
export const circuitBreaker3VAVerticalWidthPixels = 150;
export const circuitBreaker3VAVerticalHeightPixels = 255;
export const switchDisconnector3NP1VerticalWidthPixels = 150;
export const switchDisconnector3NP1VerticalHeightPixels = 184;
export const switchDisconnector3NJ6WidthPixels = 300;
export const switchDisconnector3NJ6HeightPixels = 53;
export const switchDisconnector3NJ4WidthPixels = 50;
export const switchDisconnector3NJ4HeightPixels = 314;
// @@@@

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lineStyle: {
      stroke: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentBlue.light1,
      strokeWidth: strokeWidth,
      strokeLinecap: 'round',
      fill: 'none'
    },
    siemensLogoPlate: {
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
      textAnchor: 'middle',
      dominantBaseline: 'central',
      letterSpacing: '-0.02em',
      font: `bold ${panelWidth / 200}em sans-serif `
    },
    siemensLogoOutline: {
      stroke: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
      strokeWidth: panelWidth / 400,
      fill: 'none'
    },
    clickableOverlay: {
      fill: 'rgba(255, 255, 255, 0)',
      "&:hover, &:focus": {
        stroke: SiemensAccentYellow.light3,
        strokeWidth: 3 * strokeWidth,
      }
    },
    panelBase: {
      stroke: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentBlue.light1,
      strokeWidth: strokeWidth,
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentBlue.light1
    },
    panelName: {
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentBlue.dark5,
      textAnchor: 'middle',
      dominantBaseline: 'central',
      letterSpacing: '-0.02em',
      font: `bold ${panelWidth / 150}em sans-serif`
    },
    compartmentNameHorizontal: {
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentBlue.dark1,
      textAnchor: 'end',
      dominantBaseline: 'hanging',
      font: `bold ${panelWidth / 200}em sans-serif`
    },
    compartmentNameVertical: {
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentBlue.dark1,
      textAnchor: 'end',
      font: `bold ${panelWidth / 200}em sans-serif`
    },
    svgContainer: {
      overflowX: 'auto',
      whiteSpace: 'nowrap'
    },
    svgElement: {
      height: 'calc(100vh - 150px)'
    },
    switchboardName: {
      fontSize: `6em`,
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
      textAnchor: 'end',
      dominantBaseline: 'hanging',
      letterSpacing: '-0.05em'
    },
    cbTrippedOverlay: {
      fill: 'rgba(255, 0, 0, 0.4)'
    },
    cbOpenOverlay: {
      fill: 'rgba(255, 206, 53, 0.4)'
    },
    transparent: {
      fill: 'none'
    },
    noConnectionAlarmHorizontal: {
      fill: 'red',
      textAnchor: 'start',
      font: `bold ${panelWidth / 240}em sans-serif`,
      dominantBaseline: 'hanging'
    },
    noConnectionAlarmVertical: {
      fill: 'red',
      textAnchor: 'start',
      font: `bold ${panelWidth / 240}em sans-serif`,
      dominantBaseline: 'ideographic'
    },
  }));
///////////////////////////////////////////////////


export const Elevation = () => {
  const elevation = useSelector((state: RootState) => state.elevation);
  const classes = useStyles();
  const systemTopologyData = useSelector((state: RootState) => state.systemTopologyData);
  const dialogData = useSelector((state: RootState) => state.deviceDataDialogElevationDataSource);
  const { t } = useTranslation()

  const renderCompartmentContent = (type: string, compartmentX: number, compartmentY: number, columns: number) => {
    switch (type) {
      case 'infeed3VA':
        return <CircuitBreaker3VAVerticalSVG scale={scaleService(columns)} x={compartmentX - circuitBreaker3VAVerticalWidthPixels / 2} y={compartmentY - compartmentHeight / 2} />
      case 'infeed3WL':
        return <CircuitBreaker3WLSVG scale={1.5} x={compartmentX - circuitBreaker3WLWidthPixels / 2} y={compartmentY - compartmentHeight / 2} />
      case 'outgoingFeeder3VAHorizontal':
        return <CircuitBreaker3VAHorizontalSVG scale={1} x={compartmentX - circuitBreaker3VAHorizontalWidthPixels / 2} y={compartmentY} />
      case 'outgoingFeeder3VAVertical':
        return <CircuitBreaker3VAVerticalSVG scale={scaleService(columns)} x={compartmentX - circuitBreaker3VAVerticalWidthPixels / 2} y={compartmentY - compartmentHeight / 2} />
      case 'outgoingFeeder3NP1Vertical':
        return <SwitchDisconnector3NP1VerticalSVG scale={scaleService(columns)} x={compartmentX - switchDisconnector3NP1VerticalWidthPixels / 2} y={compartmentY - switchDisconnector3NP1VerticalHeightPixels / 4} />
      case 'outgoingFeeder3NJ6':
        return <SwitchDisconnector3NJ6SVG scale={1.9} x={compartmentX - switchDisconnector3NJ6WidthPixels / 2} y={compartmentY + switchDisconnector3NJ6HeightPixels / 2} />
      case 'outgoingFeeder3NJ4':
        return <SwitchDisconnector3NJ4SVG scale={1.8} x={compartmentX - switchDisconnector3NJ4WidthPixels / 2} y={compartmentY - switchDisconnector3NJ4HeightPixels / 3} />
      default:
        return null;
    }
  }

  const associateTypeWithDisplayData = (obj: IDeviceData) => {
    if (obj) {
      if (obj.infeedType && obj.infeedType !== '') {
        return {
          deviceName: obj.infeedTableName || '',
          deviceType: obj.infeedType || '',
          breakerName: obj.breakerName,
          sectionName: `${t('deviceDataDialog.section')} ${obj.sectionName}`,
        }
      }
      else {
        if (obj.breakerType === DeviceTypes.circuitBreaker) {
          return {
            deviceName: obj.breakerTableName || '',
            deviceType: obj.breakerType,
            breakerName: obj.breakerName,
            sectionName: `${obj.switchboardName} ${t('deviceDataDialog.section')} ${obj.sectionName}`,
          }
        }
        else if (obj.breakerType === DeviceTypes.infeedBreaker) {
          return {
            deviceName: obj.breakerTableName || '',
            deviceType: obj.breakerType,
            breakerName: obj.breakerName,
            sectionName: `${t('deviceDataDialog.section')} ${obj.sectionName}`,
          }
        }
        return {
          deviceName: obj.breakerTableName || '',
          deviceType: obj.breakerType,
          breakerName: obj.breakerName,
          sectionName: `${t('deviceDataDialog.section')} ${obj.sectionName}`,
        }
      }
    }
    return {
      deviceName: '',
      deviceType: '',
      breakerName: '',
      sectionName: '',
    }
  }

  const renderTabsWithSwitchboards = (): Array<{ label: string, content: React.ReactNode }> => {
    let tabs: Array<{ label: string, content: React.ReactNode }> = [];
    elevation.switchboards.map(switchboard => {
      const content = (
        <div className={classes.svgContainer}>
          <svg viewBox={`-80 -5 ${switchboard.panels.length * 620} 2350`} className={classes.svgElement}>
            {renderSwitchboardName(switchboard.name, -80, 0)}
            {switchboard.panels.map((panel, panelIndex) => {
              let span: number = 0
              return (
                <PanelSVG key={panelIndex} x={panelIndex * panelWidth} y={0} name={panel.name} empty={panel.name === 'empty'}>
                  {panel.compartments.map((compartment, compartmentIndex) => {
                    span += panel.compartments[compartmentIndex - 1] ? panel.compartments[compartmentIndex - 1].rowSpan : 0;
                    const columns = compartment.columns.length;
                    return compartment.columns.map((column, columnIndex) => {
                      //console.log(dialogData[column.assetID]?.breakerType)
                      return (
                        <CompartmentSVG
                          key={`${compartmentIndex}-${columnIndex}`}
                          x={(panelIndex * panelWidth) + columnIndex * panelWidth / columns}
                          y={span * compartmentHeight} span={compartment.rowSpan}
                          columns={columns}
                          name={column.name}
                          nonInteractive={column.nonInteractive}
                          state={column.assetID ? checkBreakerState(column.assetID) : { closed: true, tripped: false, drawnOut: false }} //mock if not interactive so it doesnt highlight on visualization
                          assetID={column.assetID ? column.assetID : ''}
                          breakerName={column.assetID ? associateTypeWithDisplayData(dialogData[`${switchboard.name}-${column.assetID}`]).breakerName : ''}
                          deviceName={column.assetID ? associateTypeWithDisplayData(dialogData[`${switchboard.name}-${column.assetID}`]).deviceName : ''}
                          deviceType={column.assetID ? associateTypeWithDisplayData(dialogData[`${switchboard.name}-${column.assetID}`]).deviceType : ''}
                          sectionName={column.assetID ? associateTypeWithDisplayData(dialogData[`${switchboard.name}-${column.assetID}`]).sectionName : ''}
                          switchboardAssetID={switchboard.assetID ? switchboard.assetID : ''}
                          connectionState={checkConnectionState(column.assetID, column.nonInteractive)}
                        >
                          {renderCompartmentContent(column.type,
                            (panelIndex * panelWidth) + columnIndex * panelWidth / columns + (panelWidth / columns) / 2,
                            span * compartmentHeight + (compartment.rowSpan * compartmentHeight + reservedTopSpace) / 2,
                            columns)}
                        </CompartmentSVG>
                      )
                    })
                  })}
                </PanelSVG>
              )
            })}
          </svg>
        </div>
      )
      return tabs.push({ label: switchboard.name, content: content })
    })
    return tabs
  }

  const renderSwitchboardName = (name: string, x: number, y: number) => {
    return (
      <text
        x={x}
        y={y}
        className={classes.switchboardName}
        transform={`rotate(-90 ${x} ${y})`}
      >
        {`${t('overviewPage.switchboard')} ${name}`}
      </text>
    )
  }

  const scaleService = (columnNumber: number) => {
    if (columnNumber >= 7) {
      return 0.3
    }
    else if (columnNumber >= 4) {
      return 0.5
    }
    else if (columnNumber >= 2) {
      return 0.8
    }
    else {
      return 1
    }
  }

  const checkBreakerState = (assetID: string) => {
    return decodeState(systemTopologyData[assetID]?.Breaker_State)
  }

  const checkConnectionState = (assetID: string | false, nonInteractive: boolean) => {
    if (assetID && systemTopologyData[assetID] && systemTopologyData[assetID].Connection_State && !nonInteractive) {
      return systemTopologyData[assetID].Connection_State
    }
    else if (nonInteractive) {
      return 1
    }
    return 0
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <UniversalTabs
            name='overview'
            tabs={renderTabsWithSwitchboards()}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}