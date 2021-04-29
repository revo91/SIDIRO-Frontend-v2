import { SET_CIRCUIT_DIAGRAM } from '../actions/Overview.action';

interface IDiagramAction {
  type: string,
  diagrams: Array<{
    name: string,
    assetID?: string,
    sections: Array<{
      name: string,
      infeeds?: Array<{
        name: string,
        tableName: string,
        type: string,
        breaker: {
          name: string,
          type: string,
          assetID: string,
          state?: number,
          tableName?: string
        }
      }>,
      breakers?: Array<{
        name: string,
        tableName: string,
        type: string,
        assetID: string
        nextSwitchboardName?: string,
        state?: number
      }>,
      coupling?: {
        name: string,
        type: string,
        assetID: string,
        tableName?: string
      }
    }>
  }>
}

export interface IDiagramStructure {
  diagrams: Array<{
    name: string,
    assetID?: string,
    sections: Array<{
      name: string,
      infeeds?: Array<{
        name: string,
        tableName: string,
        type: string,
        breaker: {
          name: string,
          type: string,
          assetID: string,
          state?: number,
          tableName?: string
        }
      }>,
      breakers?: Array<{
        name: string,
        tableName: string,
        type: string,
        assetID: string
        nextSwitchboardName?: string,
        state?: number
      }>,
      coupling?: {
        name: string,
        type: string,
        assetID: string,
        tableName?: string
      }
    }>
  }>
}

const initialState: IDiagramStructure = {
  diagrams: []
}

export const OverviewReducer = (state = initialState, action: IDiagramAction) => {
  switch (action.type) {
    case SET_CIRCUIT_DIAGRAM:
      return {
        ...state,
        diagrams: action.diagrams
      }
    default:
      return state
  }
}