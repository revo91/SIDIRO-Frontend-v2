import { SET_DEVICE_DATA_DIALOG_OPEN } from '../actions/DeviceDataDialog.action';

interface IDeviceDataDialog {
  type: string,
  open: boolean
}

const initialState = {
  open: false,
}

export const DeviceDataDialogReducer = (state = initialState, action: IDeviceDataDialog) => {
  switch (action.type) {
    case SET_DEVICE_DATA_DIALOG_OPEN:
      return {
        ...state,
        open: action.open
      }
    default:
      return state
  }
}