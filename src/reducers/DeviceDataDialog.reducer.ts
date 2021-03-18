import { SET_DEVICE_DATA_DIALOG_OPEN } from '../actions/DeviceDataDialog.action';

export interface IDeviceDataDialog {
  open: boolean,
  deviceName: string,
  deviceType: string,
  breakerName: string
}

interface IDeviceDataDialogReducer extends IDeviceDataDialog {
  type: string
}

const initialState = {
  open: false,
  deviceName: '',
  deviceType: '',
  breakerName: ''
}

export const DeviceDataDialogReducer = (state = initialState, action: IDeviceDataDialogReducer) => {
  switch (action.type) {
    case SET_DEVICE_DATA_DIALOG_OPEN:
      return {
        ...state,
        open: action.open,
        deviceName: action.deviceName,
        deviceType: action.deviceType,
        breakerName: action.breakerName
      }
    default:
      return state
  }
}