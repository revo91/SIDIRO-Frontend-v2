import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { PanelSVG } from './Elevation/PanelSVG.component';
import { SiemensAccentTeal, SiemensAccentYellow } from '../utilities/SiemensColors.utility';
import { CompartmentSVG } from './Elevation/CompartmentSVG.component';
import { CircuitBreaker3VASVG } from './Elevation/CircuitBreaker3VASVG.component';
import { elevation } from '../mock/elevation.mock';

//common constants for SVGs to import /////////////////
export const panelWidth = 600;
export const panelHeight = 2100;
export const reservedTopSpace = 100;
export const compartmentHeight = (panelHeight - reservedTopSpace) / 12;
export const strokeWidth = compartmentHeight / 32;
export const circuitBreaker3VAWidthPixels = 200;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    lineStyle: {
      stroke: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
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
      stroke: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3,
      strokeWidth: strokeWidth,
      fill: theme.palette.type === 'dark' ? theme.palette.text.primary : SiemensAccentTeal.dark3
    }
  }));
///////////////////////////////////////////////////

export const Elevation = () => {

  const renderCompartment = (type: string): React.ReactNode => {
    
    return <p>lol</p>
  }

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <svg viewBox={`-5 -5 5000 2400`} width='100%'>
            {elevation.panels.map((panel, panelIndex) => {
              let span: number = 0
              return (
                <PanelSVG key={panelIndex} x={panelIndex * panelWidth} y={0}>
                  {panel.compartments.map((compartment, compartmentIndex) => {
                    span += panel.compartments[compartmentIndex - 1] ? panel.compartments[compartmentIndex - 1].rowSpan : 0
                    return (
                      <CompartmentSVG key={compartmentIndex} x={panelIndex * panelWidth} y={span * compartmentHeight} span={compartment.rowSpan}>
                        <CircuitBreaker3VASVG x={10 + panelWidth / 2 - 150 / 2} y={(4 * compartmentHeight + reservedTopSpace) / 2 - 150 / 2} />
                      </CompartmentSVG>
                    )
                  })}
                </PanelSVG>
              )

            })}
            {/* <PanelSVG x={10} y={1}>
              <CompartmentSVG x={10} y={1} span={4}>
                <CircuitBreaker3VASVG x={10 + panelWidth / 2 - 150 / 2} y={(4 * compartmentHeight + reservedTopSpace) / 2 - 150 / 2} />
              </CompartmentSVG>
              <CompartmentSVG x={10} y={1 + 4 * compartmentHeight} span={4} />
              <CompartmentSVG x={10} y={1 + 8 * compartmentHeight} span={4} />
            </PanelSVG> */}
          </svg>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}