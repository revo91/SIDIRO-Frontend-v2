import React from 'react';
import { ICompartmentDevice } from './CompartmentSVG.component';
import { circuitBreaker3VAHorizontalWidthPixels, circuitBreaker3VAHorizontalHeightPixels } from '../Elevation.component';

export const CircuitBreaker3VAHorizontalSVG: React.FC<ICompartmentDevice> = ({ x, y, scale }) => {
  return (
    <React.Fragment>
      <g transform={`scale(${scale})`} style={{ transformOrigin: `${x + circuitBreaker3VAHorizontalWidthPixels / 2}px ${y + circuitBreaker3VAHorizontalHeightPixels / 2}px` }}>
        <rect x={`${x + 0.16}`} y={`${y + 0.16}`} width="99.68" height="99.68" fill="#a6c7d5" />
        <path d="M671.36,357.86h-100v-100h100Zm-99.68-.32H671V258.18H571.68Z" transform={`translate(${x - 571.36} ${y - 257.86})`} fill="#005f87" />
        <path d="M611.35,350.15l-.89-.08V291.6h21.79v58.47l-.82.08Zm.31-57.35V349h19.39V292.8Z" transform={`translate(${x - 571.36} ${y - 257.86})`} fill="#005f87" />
        <path d="M632.25,350.15H610.46V335l-.83-.35a29.18,29.18,0,0,1,2.72-54.37,29.46,29.46,0,0,1,18,0c1,.34,1.92.69,2.8,1.08a29.13,29.13,0,0,1-.08,53.29h0c-.28.13-.55.24-.83.35ZM611.66,349h19.39V334.16l.38-.15,1.17-.49a27.92,27.92,0,0,0,.07-51.09,24.73,24.73,0,0,0-2.69-1,28.26,28.26,0,0,0-17.26,0,23.4,23.4,0,0,0-2.79,1.09,27.91,27.91,0,0,0,.19,51l1.16.49.38.15Z" transform={`translate(${x - 571.36} ${y - 257.86})`} fill="#005f87" />
        <rect x={`${x + 39.1}`} y={`${y + 23.49}`} width="1.2" height="10.84" fill="#005f87" />
        <rect x={`${x + 59.68}`} y={`${y + 23.49}`} width="1.2" height="10.84" fill="#005f87" />
      </g>
    </React.Fragment>
  )
}