import React from 'react';
import { ICompartmentDevice } from './CompartmentSVG.component';
import { circuitBreaker3WLWidthPixels, circuitBreaker3WLHeightPixels } from '../Elevation.component';

export const CircuitBreaker3WLSVG: React.FC<ICompartmentDevice> = ({ x, y, scale }) => {
  return (
    <React.Fragment>
      <g transform={`scale(${scale})`} style={{ transformOrigin: `${x + circuitBreaker3WLWidthPixels / 2}px ${y + circuitBreaker3WLHeightPixels / 2}px` }}>
        <rect x={`${x + 0.46}`} y={`${y + 0.46}`} width="199.07" height="259.26" fill="#a6c7d5" />
        <path d="M1051.84,660h-200V399.8h200Zm-199.07-.93h198.15V400.72H852.77Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M1043,637.7H860.7V405.94H1043Zm-181.35-.93h180.43V406.87H861.63Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 9.32}`} y={`${y + 204.75}`} width="181.36" height="0.93" fill="#005f87" />
        <path d="M1014.81,605.47H919.17V549.84h95.64Zm-94.71-.92h93.79V550.76H920.1Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 162.04}`} y={`${y + 6.6}`} width="0.93" height="198.61" fill="#005f87" />
        <rect x={`${x + 67.33}`} y={`${y + 6.6}`} width="0.93" height="198.61" fill="#005f87" />
        <path d="M940.44,443a12.49,12.49,0,1,1,12.49-12.49A12.51,12.51,0,0,1,940.44,443Zm0-24.74a12.25,12.25,0,1,0,12.25,12.25A12.26,12.26,0,0,0,940.44,418.24Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M977,440.12a8.24,8.24,0,1,1,8.24-8.23A8.24,8.24,0,0,1,977,440.12Zm0-16.22a8,8,0,1,0,8,8A8,8,0,0,0,977,423.9Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M1038.43,469.62h-23.88V410.28h23.88Zm-23.63-.25h23.39V410.53H1014.8Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 131.03}`} y={`${y + 14.26}`} width="13.34" height="4.93" fill="#d9e7ed" />
        <rect x={`${x + 145.12}`} y={`${y + 14.26}`} width="13.34" height="4.93" fill="#d9e7ed" />
        <path d="M901.57,628.59a9.34,9.34,0,1,1,9.34-9.34A9.35,9.35,0,0,1,901.57,628.59Zm0-18.43a9.1,9.1,0,1,0,9.09,9.09A9.11,9.11,0,0,0,901.57,610.16Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 67.79}`} y={`${y + 205.21}`} width="118.68" height="26" fill="#a6c7d5" />
        <path d="M1038.77,631.48H919.17V604.55h119.6Zm-118.67-.93h117.75V605.47H920.1Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M984.71,546H925.38V467h59.33Zm-59.08-.24h58.84V467.28H925.63Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M1006.86,457.13v0a8.62,8.62,0,0,0-17.24,0,7.72,7.72,0,0,0,.1,1.18V600H1007V457.13Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" />
        <path d="M1007.42,600.45H989.25V458.28a8,8,0,0,1-.09-1.18,9.09,9.09,0,0,1,18.15-.43h0l.1.46Zm-17.24-.92h16.31V457.6l-.1-.47a8.15,8.15,0,0,0-16.3,0,7.85,7.85,0,0,0,.09,1.11Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M1006.86,465.19v0c0-4.4-3.86-8-8.62-8s-8.62,3.57-8.62,8a7,7,0,0,0,.1,1.12V600H1007V465.19Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" />
        <path d="M1007.42,600.45H989.25V466.27a7.24,7.24,0,0,1-.09-1.12c0-4.65,4.07-8.43,9.08-8.43,4.85,0,8.83,3.55,9.07,8h0l.1.47Zm-17.24-.92h16.31V465.65l-.1-.46c0-4.18-3.65-7.55-8.15-7.55s-8.15,3.37-8.15,7.51a7,7,0,0,0,.09,1.05Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <line x1={`${x + 155.11}`} y1={`${y + 163.09}`} x2={`${x + 137.87}`} y2={`${y + 163.09}`} fill="#a6c7d5" />
        <rect x={`${x + 137.87}`} y={`${y + 162.62}`} width="17.24" height="0.93" fill="#005f87" />
        <rect x={`${x + 9.32}`} y={`${y + 10.48}`} width="153.51" height="0.25" fill="#005f87" />
        <path d="M933.8,586.31h-8.42V569.4h8.42Zm-8.17-.24h7.93V569.65h-7.93Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 77.63}`} y={`${y + 136.27}`} width="21.38" height="6.11" fill="#005f87" />
        <path d="M972.11,517.77a8.31,8.31,0,1,1,8.3-8.3A8.31,8.31,0,0,1,972.11,517.77Zm0-16.36a8.06,8.06,0,1,0,8.06,8.06A8.07,8.07,0,0,0,972.11,501.41Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M937.57,517.77a8.31,8.31,0,1,1,8.3-8.3A8.31,8.31,0,0,1,937.57,517.77Zm0-16.36a8.06,8.06,0,1,0,8,8.06A8.06,8.06,0,0,0,937.57,501.41Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 78.23}`} y={`${y + 74.59}`} width="15.22" height="7.61" fill="#a6c7d5" />
        <path d="M945.42,482.12H930v-7.85h15.47Zm-15.22-.24h15v-7.37h-15Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 167.97}`} y={`${y + 175.46}`} width="16.65" height="7.71" fill="#a6c7d5" />
        <path d="M1036.59,583.08h-16.9v-8h16.9Zm-16.65-.24h16.41v-7.46h-16.41Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 9.32}`} y={`${y + 36.96}`} width="58.47" height="162.54" fill="#a6c7d5" />
        <path d="M920.1,599.77H860.7V436.3h59.4Zm-58.47-.93h57.54V437.23H861.63Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 47.95}`} y={`${y + 153.4}`} width="5.22" height="4.24" fill="#a6c7d5" />
        <path d="M905.14,557.56h-5.47v-4.48h5.47Zm-5.22-.24h5v-4h-5Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 28.02}`} y={`${y + 45.54}`} width="2.45" height="2.42" fill="#a6c7d5" />
        <path d="M882.44,447.88h-2.7v-2.67h2.7Zm-2.46-.25h2.21v-2.17H880Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 20.01}`} y={`${y + 100.71}`} width="2.46" height="2.42" fill="#e5f5f9" />
        <rect x={`${x + 24.09}`} y={`${y + 100.71}`} width="2.45" height="2.42" fill="#e5f5f9" />
        <rect x={`${x + 28.17}`} y={`${y + 100.71}`} width="2.46" height="2.42" fill="#e5f5f9" />
        <rect x={`${x + 32.26}`} y={`${y + 100.71}`} width="2.45" height="2.42" fill="#e5f5f9" />
        <rect x={`${x + 43}`} y={`${y + 108.4}`} width="2.46" height="2.42" fill="#e5f5f9" />
        <rect x={`${x + 43}`} y={`${y + 118.76}`} width="2.46" height="2.42" fill="#e5f5f9" />
        <rect x={`${x + 43}`} y={`${y + 132.73}`} width="2.46" height="2.42" fill="#e5f5f9" />
        <rect x={`${x + 43}`} y={`${y + 145.92}`} width="2.46" height="2.42" fill="#e5f5f9" />
        <path d="M916.06,596.08H864.74V440h51.32ZM865,595.83h50.82V440.24H865Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M875,582.11a2.71,2.71,0,1,1-2.71-2.71A2.71,2.71,0,0,1,875,582.11Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" fillRule="evenodd" />
        <path d="M872.26,584.94a2.83,2.83,0,1,1,2.84-2.83A2.83,2.83,0,0,1,872.26,584.94Zm0-5.42a2.59,2.59,0,1,0,2.59,2.59A2.59,2.59,0,0,0,872.26,579.52Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M890.68,582.11A2.71,2.71,0,1,1,888,579.4,2.71,2.71,0,0,1,890.68,582.11Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" fillRule="evenodd" />
        <path d="M888,584.94a2.83,2.83,0,1,1,2.83-2.83A2.84,2.84,0,0,1,888,584.94Zm0-5.42a2.59,2.59,0,1,0,2.59,2.59A2.59,2.59,0,0,0,888,579.52Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M911.8,582.11a2.71,2.71,0,1,1-2.71-2.71A2.71,2.71,0,0,1,911.8,582.11Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" fillRule="evenodd" />
        <path d="M909.09,584.94a2.83,2.83,0,1,1,2.84-2.83A2.83,2.83,0,0,1,909.09,584.94Zm0-5.42a2.59,2.59,0,1,0,2.59,2.59A2.59,2.59,0,0,0,909.09,579.52Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M911.32,538.15a2.71,2.71,0,1,1-2.71-2.71A2.71,2.71,0,0,1,911.32,538.15Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" fillRule="evenodd" />
        <path d="M908.61,541a2.84,2.84,0,1,1,2.83-2.83A2.83,2.83,0,0,1,908.61,541Zm0-5.42a2.59,2.59,0,1,0,2.59,2.59A2.59,2.59,0,0,0,908.61,535.56Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M880.24,538.15a2.71,2.71,0,1,1-2.71-2.71A2.71,2.71,0,0,1,880.24,538.15Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" fillRule="evenodd" />
        <path d="M877.53,541a2.84,2.84,0,1,1,2.83-2.83A2.83,2.83,0,0,1,877.53,541Zm0-5.42a2.59,2.59,0,1,0,2.58,2.59A2.59,2.59,0,0,0,877.53,535.56Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M880.24,524.33a2.71,2.71,0,1,1-2.71-2.71A2.71,2.71,0,0,1,880.24,524.33Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#a6c7d5" fillRule="evenodd" />
        <path d="M877.53,527.17a2.84,2.84,0,1,1,2.83-2.84A2.84,2.84,0,0,1,877.53,527.17Zm0-5.43a2.59,2.59,0,1,0,2.58,2.59A2.59,2.59,0,0,0,877.53,521.74Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 15.42}`} y={`${y + 43.39}`} width="12.66" height="6.56" fill="#a6c7d5" />
        <path d="M880,449.88h-12.9v-6.81H880Zm-12.66-.25H879.8v-6.32H867.38Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M909.22,451.2a4.48,4.48,0,1,1,4.48-4.48A4.49,4.49,0,0,1,909.22,451.2Zm0-8.72a4.24,4.24,0,1,0,4.24,4.24A4.24,4.24,0,0,0,909.22,442.48Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M909.88,448.61h-1.32v-3.79h1.32Zm-1.07-.24h.82v-3.31h-.82Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        
        <path d="M904.85,598.73h-5.68V595H883v3.77h-5.69V595h-7.07v-8.08h41.63V595h-7Zm-5.44-.25h5.2v-3.76h7v-7.59H870.44v7.59h7.07v3.76h5.2v-3.76h16.7Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <path d="M916.06,489.72H864.74V453.11h51.32ZM865,489.48h50.82V453.36H865Z" transform={`translate(${x - 851.84} ${y - 399.8})`} fill="#005f87" />
        <rect x={`${x + 16.08}`} y={`${y + 61.5}`} width="44.95" height="19.77" fill="#e5f5f9" />
        <rect x={`${x + 23.94}`} y={`${y + 83.9}`} width="3.03" height="3.03" fill="#e5f5f9" />
        <rect x={`${x + 50.15}`} y={`${y + 83.9}`} width="3.03" height="3.03" fill="#e5f5f9" />
      </g>
    </React.Fragment>
  )
}