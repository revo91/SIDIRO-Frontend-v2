import { SET_DEVICE_DATA_DIALOG_OPEN, SET_DEVICE_DATA_DIALOG_DATE_FROM } from '../actions/DeviceDataDialog.action';

export interface IDeviceDataDialog {
  open: boolean,
  deviceName: string,
  deviceType: string,
  breakerName: string,
  sectionName: string,
  assetID: string,
  switchboardAssetID: string
}

interface IDate extends IDeviceDataDialog {
  dateFrom: Date
}

interface IDeviceDataDialogReducer extends IDate {
  type: string
}

const initialState = {
  open: false,
  deviceName: '',
  deviceType: '',
  breakerName: '',
  sectionName: '',
  assetID: '',
  switchboardAssetID: '',
  // for charts
  dateFrom: new Date()
}

export const DeviceDataDialogReducer = (state = initialState, action: IDeviceDataDialogReducer) => {
  switch (action.type) {
    case SET_DEVICE_DATA_DIALOG_OPEN:
      return {
        ...state,
        open: action.open,
        deviceName: action.deviceName,
        deviceType: action.deviceType,
        breakerName: action.breakerName,
        sectionName: action.sectionName,
        assetID: action.assetID,
        switchboardAssetID: action.switchboardAssetID
      }
    case SET_DEVICE_DATA_DIALOG_DATE_FROM:
      return {
        ...state,
        dateFrom: action.dateFrom
      }
    default:
      return state
  }
}