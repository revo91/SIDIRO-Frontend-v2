export enum SiemensColors {
  tealLight = 'rgb(65, 170, 170)', // Siemens Accent Teal Light 
  greenLight = 'rgb(170, 180, 20)', // Siemens Accent Green Light
  redLight = 'rgb(175, 35, 95)', // Siemens Accent Red Light
  yellowLight = 'rgb(255, 185, 0)', // Siemens Accent Yellow Light
  blueLight = 'rgb(80, 190, 215)', // Siemens Accent Blue Light
  tealDark = 'rgb(0, 100, 110)', // Siemens Accent Teal Dark
  greenDark = 'rgb(100, 125, 45)', // Siemens Accent Green Dark
  redDark = 'rgb(100, 25, 70)', // Siemens Accent Red Dark
  yellowDark = 'rgb(235, 120, 10)', // Siemens Accent Yellow Dark
  blueDark = 'rgb(0, 95, 135)', // Siemens Accent Blue Dark
}

export enum SiemensColorsAlpha {
  tealLightAlpha = 'rgba(65, 170, 170, 0.5)', // Siemens Accent Teal Light Alpha 50%
  greenLightAlpha = 'rgba(170, 180, 20, 0.5)', // Siemens Accent Green Light Alpha 50%
  redLightAlpha = 'rgba(175, 35, 95, 0.5)', // Siemens Accent Red Light Alpha 50%
  yellowLightAlpha = 'rgba(255, 185, 0, 0.5)', // Siemens Accent Yellow Light Alpha 50%
  blueLightAlpha = 'rgba(80, 190, 215, 0.5)', // Siemens Accent Blue Light Alpha 50%
  tealDarkAlpha = 'rgba(0, 100, 110, 0.5)', // Siemens Accent Teal Dark Alpha 50%
  greenDarkAlpha = 'rgba(100, 125, 45, 0.5)', // Siemens Accent Green Dark Alpha 50%
  redDarkAlpha = 'rgba(100, 25, 70, 0.5)', // Siemens Accent Red Dark Alpha 50%
  yellowDarkAlpha = 'rgba(235, 120, 10, 0.5)', // Siemens Accent Yellow Dark Alpha 50%
  blueDarkAlpha = 'rgba(0, 95, 135, 0.5)', // Siemens Accent Blue Dark Alpha 50%
}

export enum SiemensAccentTeal {
  dark1 = '#003c46',
  dark2 = '#004b55',
  dark3 = '#00646e',
  dark4 = '#00737d',
  dark5 = '#0f8287',
  dark6 = '#239196',
  light1 = '#32a0a0',
  light2 = '#41aaaa',
  light3 = '#4bb9b9',
  light4 = '#78cdcd',
  light5 = '#a5e1e1',
  light6 = '#c3f0f0'
}

export enum SiemensAccentBlue {
  dark1 = '#003750',
  dark2 = '#004669',
  dark3 = '#00557d',
  dark4 = '#005f87',
  dark5 = '#0f789b',
  dark6 = '#2387aa',
  light1 = '#3296b9',
  light2 = '#41aac8',
  light3 = '#50bed7',
  light4 = '#7dd2e6',
  light5 = '#aae6f5',
  light6 = '#c8f5ff'
}

export enum SiemensAccentYellow {
  dark1 = '#7d2d1e',
  dark2 = '#a03c23',
  dark3 = '#b44b28',
  dark4 = '#c85a1e',
  dark5 = '#dc6914',
  dark6 = '#eb780a',
  light1 = '#f58c14',
  light2 = '#faa50a',
  light3 = '#ffb900',
  light4 = '#ffcd50',
  light5 = '#ffe178',
  light6 = '#fff09b'
}

export enum SiemensAccentRed {
  dark1 = '#411432',
  dark2 = '#50143c',
  dark3 = '#641946',
  dark4 = '#781e4b',
  dark5 = '#871e50',
  dark6 = '#9b1e5a',
  light1 = '#af235f',
  light2 = '#c34673',
  light3 = '#d7698c',
  light4 = '#e687a5',
  light5 = '#f0aac3',
  light6 = '#f5c8dc'
}

export enum SiemensAccentGreen {
  dark1 = '#37500f',
  dark2 = '#465f19',
  dark3 = '#556e28',
  dark4 = '#647d28',
  dark5 = '#738732',
  dark6 = '#879628',
  light1 = '#96a51e',
  light2 = '#aab414',
  light3 = '#bec328',
  light4 = '#d2d741',
  light5 = '#e6e65f',
  light6 = '#f0f08c'
}

export const decideDataColor = (index: number) => {
  switch (index) {
    case 0: return SiemensAccentTeal.light2
    case 1: return SiemensAccentYellow.light2
    case 2: return SiemensAccentGreen.light2
    case 3: return SiemensAccentRed.light2
    case 4: return SiemensAccentBlue.light2
    case 5: return SiemensAccentTeal.light4
    case 6: return SiemensAccentYellow.light4
    case 7: return SiemensAccentGreen.light4
    case 8: return SiemensAccentRed.light4
    case 9: return SiemensAccentBlue.light4
    case 10: return SiemensAccentTeal.light6
    case 11: return SiemensAccentYellow.light6
    case 12: return SiemensAccentGreen.light6
    case 13: return SiemensAccentRed.light6
    case 14: return SiemensAccentBlue.light6
    case 15: return SiemensAccentTeal.dark2
    case 16: return SiemensAccentYellow.dark2
    case 17: return SiemensAccentGreen.dark2
    case 18: return SiemensAccentBlue.dark2
    case 20: return SiemensAccentTeal.light3
    case 21: return SiemensAccentYellow.light3
    case 22: return SiemensAccentGreen.light3
    case 23: return SiemensAccentRed.light3 
    case 24: return SiemensAccentBlue.light3
    case 25: return SiemensAccentTeal.light5 
    case 26: return SiemensAccentYellow.light5 
    case 27: return SiemensAccentGreen.light5 
    case 28: return SiemensAccentRed.light5
    case 29: return SiemensAccentBlue.light5 
    case 30: return SiemensAccentTeal.dark1 
    case 31: return SiemensAccentYellow.dark1 
    case 32: return SiemensAccentGreen.dark1 
    case 33: return SiemensAccentRed.dark1 
    case 34: return SiemensAccentBlue.dark1
    case 35: return SiemensAccentTeal.dark3 
    case 36: return SiemensAccentYellow.dark3 
    case 37: return SiemensAccentGreen.dark3
    case 38: return SiemensAccentRed.dark3 
    case 39: return SiemensAccentBlue.dark3
    default: return SiemensAccentRed.dark1
  }
}