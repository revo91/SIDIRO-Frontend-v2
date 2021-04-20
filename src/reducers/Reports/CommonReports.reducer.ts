import {
  SET_ASSETS_REPORTS_DATA,
  SET_REPORTS_DATE
} from '../../actions/Reports/CommonReports.action';
import { startOfMonth, add } from 'date-fns'

interface ICommonReportsReducerAction {
  type: string,
  assetID: string,
  assetData: any,
  dateFrom: string,
  dateTo: string
}

interface IAssetIDProperty extends ICommonReportsDate {
  assets: {
    [assetID: string]: any
  }
}

interface ICommonReportsDate {
  dateFrom: string,
  dateTo: string
}

const initialState: IAssetIDProperty = {
  assets: {},
  dateFrom: startOfMonth(new Date()).toISOString(),
  dateTo: startOfMonth(add((new Date()), {
    months: 1
  })).toISOString()
}

export const CommonReportsReducer = (state = initialState, action: ICommonReportsReducerAction) => {
  switch (action.type) {
    case SET_ASSETS_REPORTS_DATA:
      return {
        ...state,
        assets: {
          ...action.assetData
        }
      }
    case SET_REPORTS_DATE:
      return {
        ...state,
        dateFrom: action.dateFrom,
        dateTo: action.dateTo
      }

    default:
      return state
  }
}