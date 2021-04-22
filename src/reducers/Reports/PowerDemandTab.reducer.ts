import {
  SET_ASSETS_REPORTS_DATA,
  SET_REPORTS_DATE
} from '../../actions/Reports/CommonReports.action';
//import { startOfMonth, add } from 'date-fns'

interface ICommonReportsReducerAction {
  type: string,
  assetID: string,
  assetData: any,
  dateFrom: string,
  dateTo: string
}

interface IPowerDemandTabState {
  infeeds: Array<string> | undefined,
  outfeeds: Array<string> | undefined,
  warningThreshold: number | undefined,
  alarmThreshold: number | undefined
}

const initialState: IPowerDemandTabState = {
  infeeds: ['453abff100514e52ab7d29542b550271'],
  outfeeds: ['40ffdbf4ecc14f3eb645c9cb675a9030', '17507f5b44c74398892c7021a9bd3c66', '45665da871dd4538886ff5b9f63b352a', '8968bd1b87ad463bb4b7e235a518f14d', '0ce676a0fe1f4da89d354662d734343a', '23f2d3d5dd0844fea6c5395425d036f5',
  'a091a640fcf04c2498a297e3e0d4204f'],
  warningThreshold: 75,
  alarmThreshold: 100
}

export const PowerDemandTabReducer = (state = initialState, action: ICommonReportsReducerAction) => {
  switch (action.type) {
    case SET_ASSETS_REPORTS_DATA:
      return {
        ...state,

      }
    case SET_REPORTS_DATE:
      return {
        ...state,

      }

    default:
      return state
  }
}