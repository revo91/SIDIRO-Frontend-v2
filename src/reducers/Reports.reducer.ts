import { SET_REPORTS_STRUCTURE } from '../actions/Reports.action';

interface IReports {
  type: string,
  reportsStructure: Array<IGroupStructure>
}

export interface IGroupsStructure {
  groups: Array<IGroupStructure>
}

export interface IGroupStructure {
  name: string,
  plName: string,
  enName: string,
  subgroups?: Array<IGroupStructure>
  assets?: Array<IGroupElementStructure>
}

export interface IGroupElementStructure {
  feederName: string,
  feederDescription: string,
  assetID: string,
}

const initialState: IGroupsStructure = {
  groups: []
}

export const ReportsReducer = (state = initialState, action: IReports) => {
  switch (action.type) {
    case SET_REPORTS_STRUCTURE:
      return {
        ...state,
        groups: action.reportsStructure
      }
    default:
      return state
  }
}