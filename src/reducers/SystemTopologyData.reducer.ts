import { SET_ASSET_DATA } from '../actions/SystemTopologyData.action';

export interface IDeviceParameters1Min {
  Active_Energy_Export: number
  Active_Energy_Export_qc: number
  Active_Energy_Import: number
  Active_Energy_Import_qc: number
  Breaker_State: number
  Breaker_State_qc: number
  Connection_State: number
  Connection_State_qc: number
  Current_L1: number
  Current_L1_qc: number
  Current_L2: number
  Current_L2_qc: number
  Current_L3: number
  Current_L3_qc: number
  Reactive_Energy_Export: number
  Reactive_Energy_Export_qc: number
  Reactive_Energy_Import: number
  Reactive_Energy_Import_qc: number
  THD_I_L1: number
  THD_I_L1_qc: number
  THD_I_L2: number
  THD_I_L2_qc: number
  THD_I_L3: number
  THD_I_L3_qc: number
  THD_U_L1: number
  THD_U_L1_qc: number
  THD_U_L2: number
  THD_U_L2_qc: number
  THD_U_L3: number
  THD_U_L3_qc: number
  Voltage_L1_L2: number
  Voltage_L1_L2_qc: number
  Voltage_L1_N: number
  Voltage_L1_N_qc: number
  Voltage_L2_L3: number
  Voltage_L2_L3_qc: number
  Voltage_L2_N: number
  Voltage_L2_N_qc: number
  Voltage_L3_L1: number
  Voltage_L3_L1_qc: number
  Voltage_L3_N: number
  Voltage_L3_N_qc: number
  _time: string
}

export interface IDeviceParameters15Min extends IDeviceParameters1Min {
  Active_Power_Export: number
  Active_Power_Export_qc: number
  Active_Power_Import: number
  Active_Power_Import_qc: number
  Reactive_Power_Export: number
  Reactive_Power_Export_qc: number
  Reactive_Power_Import: number
  Reactive_Power_Import_qc: number
}

interface ISystemTopologyData {
  type: string,
  assetID: string,
  parameters: IDeviceParameters15Min
}

interface DeviceID {
  [index: string]: IDeviceParameters15Min
}

const initialState: DeviceID = {}

export const SystemTopologyData = (state = initialState, action: ISystemTopologyData) => {
  switch (action.type) {
    case SET_ASSET_DATA:
      return {
        ...state,
        [action.assetID]: {
          ...state[action.assetID],
          ...action.parameters
        }
      }
    default:
      return state
  }
}