import { SET_LEVEL1, SET_LEVEL2, SET_LEVEL3, SET_LEVEL2_DATA_SOURCE } from '../../actions/Reports/EnergyConsumptionTab.action';


interface IEnergyConsumptionChartDataReducer extends IEnergyConsumptionChartData {
  type: string,
}

export interface IEnergyConsumptionChartData {
  title: string | null,
  labels: Array<string> | null,
  values: Array<number> | null,
  groupIndex?: number,
  level2DataSource?: any
}

interface IEnergyConsumptionTabReducer {
  level1: IEnergyConsumptionChartData,
  level2: IEnergyConsumptionChartData,
  level3: IEnergyConsumptionChartData,
  level2DataSource: any
}

const initialState: IEnergyConsumptionTabReducer = {
  level1: {
    title: null,
    labels: null,
    values: null
  },
  level2: {
    title: null,
    labels: null,
    values: null
  },
  level3: {
    title: null,
    labels: null,
    values: null
  },
  level2DataSource: {}
}

export const EnergyConsumptionTabReducer = (state = initialState, action: IEnergyConsumptionChartDataReducer) => {
  switch (action.type) {
    case SET_LEVEL1:
      return {
        ...state,
        level1: {
          title: action.title,
          labels: action.labels,
          values: action.values
        }
      }
    case SET_LEVEL2:
      return {
        ...state,
        level2: {
          title: action.title,
          labels: action.labels,
          values: action.values,
          groupIndex: action.groupIndex
        }
      }
    case SET_LEVEL3:
      return {
        ...state,
        level3: {
          title: action.title,
          labels: action.labels,
          values: action.values
        }
      }
    case SET_LEVEL2_DATA_SOURCE:
      return {
        ...state,
        level2DataSource: action.level2DataSource
      }
    default:
      return state
  }
}