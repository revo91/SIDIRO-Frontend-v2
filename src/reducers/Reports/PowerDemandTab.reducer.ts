import {
  SET_REPORTS_POWER_DEMAND_STRUCTURE
} from '../../actions/Reports.action';

interface ICommonReportsReducerAction {
  type: string,
  powerDemandStructure: IPowerDemandTabState
}

interface IPowerDemandTabState {
  infeeds: Array<string> | undefined,
  outfeeds: Array<string> | undefined,
  warningThreshold: number | undefined,
  alarmThreshold: number | undefined,
  transformerLosses: number | undefined
}

const initialState: IPowerDemandTabState = {
  infeeds: undefined,
  outfeeds: undefined,
  warningThreshold: undefined,
  alarmThreshold: undefined,
  transformerLosses: undefined
}

export const PowerDemandTabReducer = (state = initialState, action: ICommonReportsReducerAction) => {
  switch (action.type) {
    case SET_REPORTS_POWER_DEMAND_STRUCTURE:
      return {
        ...state,
        ...action.powerDemandStructure
      }
    default:
      return state
  }
}