import { SET_DEVICE_DATA_DIALOG_OPEN } from '../actions/DeviceDataDialog.action';

interface IDeviceDataDialog {
  type: string,
  open: boolean,
  deviceName: string,
  deviceType: string
}

const initialState = {
  open: false,
  deviceName: '',
  deviceType: ''
}

export const DeviceDataDialogReducer = (state = initialState, action: IDeviceDataDialog) => {
  switch (action.type) {
    case SET_DEVICE_DATA_DIALOG_OPEN:
      return {
        ...state,
        open: action.open,
        deviceName: action.deviceName,
        deviceType: action.deviceType
      }
    default:
      return state
  }
}