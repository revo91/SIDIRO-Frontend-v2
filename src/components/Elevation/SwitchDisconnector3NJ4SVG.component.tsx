import React from 'react';
import { ICompartmentDevice } from './CompartmentSVG.component';
import { switchDisconnector3NJ4WidthPixels, switchDisconnector3NJ4HeightPixels } from '../Elevation.component';

export const SwitchDisconnector3NJ4SVG: React.FC<ICompartmentDevice> = ({ x, y, scale }) => {
  return (
    <React.Fragment>
      <g transform={`scale(${scale})`} style={{ transformOrigin: `${x + switchDisconnector3NJ4WidthPixels / 2}px ${y + switchDisconnector3NJ4HeightPixels / 2}px` }}>
        <path d="M582.89,97.75V84.38h50V399h-50V97.75" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#a6c7d5" />
        <path d="M627.47,168.54H588.3V101.17h39.17ZM589.89,167h36V102.76h-36Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
        <path d="M627.47,356.49H588.3V289.12h39.17Zm-37.58-1.59h36V290.71h-36Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
        <path d="M626.68,248.21H589.1V203h37.58Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#d9e7ed" />
        <path d="M621.1,248.21H594.68V215.32H621.1Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#a6c7d5" />
        <path d="M621.9,249h-28V214.52h28Zm-26.43-1.6H620.3v-31.3H595.47Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
        <path d="M632.89,399h-50V84.38h50Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="none" stroke="#005f87" strokeMiterlimit="10" />
        <path d="M632.89,272.29h-50v-1.61h50Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
        <path d="M632.89,191.84h-50v-1.61h50Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
        <path d="M632.89,184.41h-50V182.8h50Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
        <path d="M632.89,370h-50V368.4h50Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
        <path d="M632.89,381.76h-50v-1.61h50Z" transform={`translate(${x - 582.39} ${y - 83.88})`} fill="#005f87" />
      </g>
    </React.Fragment>
  )
}