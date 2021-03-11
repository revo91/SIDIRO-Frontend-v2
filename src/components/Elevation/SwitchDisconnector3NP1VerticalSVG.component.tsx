import React from 'react';
import { ICompartmentDevice } from './CompartmentSVG.component';
import { switchDisconnector3NP1VerticalWidthPixels, switchDisconnector3NP1VerticalHeightPixels } from '../Elevation.component';

export const SwitchDisconnector3NP1VerticalSVG: React.FC<ICompartmentDevice> = ({ x, y, scale }) => {
  return (
    <React.Fragment>
      <g transform={`scale(${scale})`} style={{ transformOrigin: `${x + switchDisconnector3NP1VerticalWidthPixels / 2}px ${y + switchDisconnector3NP1VerticalHeightPixels / 2}px` }}>
        <path d="M994.86,548.56H863.07v-86H994.86Zm-131.41-.39h131V462.94h-131Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <rect x={`${x + 0.72}`} y={`${y + 0.72}`} width="148.56" height="151.2" fill="#a6c7d5" />
        <path d="M1004,563.26H854V410.63h150Zm-148.56-1.44h147.11V412.07H855.41Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M860.34,562.54H997.59V594H860.34V562.54" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#a6c7d5" fillRule="evenodd" />
        <path d="M998.31,594.69H859.62V561.82H998.31Zm-137.25-1.44H996.87v-30H861.06Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M994.86,443H863.07V422.6H994.86Zm-131.41-.38h131V423h-131Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M949.16,480.05H908.77V462.56h40.39Zm-40-.39h39.63V462.94H909.15Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M875.34,594.69H859.62V561.82h15.72Zm-14.28-1.44H873.9v-30H861.06Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M998.31,594.69H982.59V561.82h15.72ZM984,593.25h12.84v-30H984Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M906.33,480.05H863.07V462.56h43.26Zm-42.88-.39h42.49V462.94H863.45Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M994.86,480.05H951.6V462.56h43.26ZM952,479.66h42.5V462.94H952Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M906.33,520H863.07V488.19h43.26Zm-42.88-.39h42.49v-31H863.45Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M949.16,520H908.77V488.19h40.39Zm-40-.39h39.63v-31H909.15Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M994.86,520H951.6V488.19h43.26ZM952,519.57h42.5v-31H952Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M906.33,548.56H863.07V528.1h43.26Zm-42.88-.39h42.49V528.49H863.45Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M949.16,548.56H908.77V528.1h40.39Zm-40-.39h39.63V528.49H909.15Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <path d="M994.86,548.56H951.6V528.1h43.26ZM952,548.17h42.5V528.49H952Z" transform={`translate(${x - 853.97 } ${y - 410.63})`} fill="#005f87" />
        <rect x={`${x + 100.93}`} y={`${y + 36.43}`} width="32.7" height="11.54" fill="#d9e7ed" />
      </g>
    </React.Fragment>
  )
}