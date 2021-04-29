import { SET_POWERMONITOR_CONFIG } from '../actions/Powermonitor.action';

export interface IPowermonitorConfig {
  appId: string,
  plantId: string,
  sampleTime: number,
  serviceType: string,
  enabled: boolean,
  tenant: string,
  assetIds: Array<{
    assetId: string,
    aspectId: string,
    variableName: string,
    multiplier: number
  }>
  powerLosses: number,
  alertLimit: number,
  warningLimit: number,
  mailingList: Array<{
    email: string,
    language: string
  }>,
  interval: number,
  id: string
}

interface IPowermonitorAction {
  type: string,
  config: IPowermonitorConfig
}

const initialState: IPowermonitorConfig = {
  appId: '',
  plantId: '',
  sampleTime: 0,
  serviceType: '',
  enabled: false,
  tenant: '',
  assetIds: [],
  powerLosses: 0,
  alertLimit: 0,
  warningLimit: 0,
  mailingList: [],
  interval: 0,
  id: ''
}

export const PowermonitorReducer = (state = initialState, action: IPowermonitorAction) => {
  switch (action.type) {
    case SET_POWERMONITOR_CONFIG:
      return {
        ...state,
        appId: action.config.appId,
        plantId: action.config.plantId,
        sampleTime: action.config.sampleTime,
        serviceType: action.config.serviceType,
        enabled: action.config.enabled,
        tenant: action.config.tenant,
        assetIds: action.config.assetIds,
        powerLosses: action.config.powerLosses,
        alertLimit: action.config.alertLimit,
        warningLimit: action.config.warningLimit,
        mailingList: action.config.mailingList,
        interval: action.config.interval,
        id: action.config.id
      }
    default:
      return state
  }
}