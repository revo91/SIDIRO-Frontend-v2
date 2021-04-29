import { SET_ELEVATION } from '../actions/Elevation.action';

interface IElevation {
  type: string,
  elevation: Array<{
    name: string,
    assetID?: string,
    panels: Array<{
      name: string,
      compartments: Array<{
        rowSpan: number,
        columns: Array<{
          type: string,
          name: string,
          assetID: string | false,
          nonInteractive: boolean
        }>
      }>
    }>
  }>
}

export interface IElevationSchema {
  switchboards: Array<{
    name: string,
    assetID?: string,
    panels: Array<{
      name: string,
      compartments: Array<{
        rowSpan: number,
        columns: Array<{
          type: string,
          name: string,
          assetID: string | false,
          nonInteractive: boolean
        }>
      }>
    }>
  }>
}

const initialState: IElevationSchema = {
  switchboards: []
}

export const ElevationReducer = (state = initialState, action: IElevation) => {
  switch (action.type) {
    case SET_ELEVATION:
      return {
        ...state,
        switchboards: action.elevation
      }
    default:
      return state
  }
}