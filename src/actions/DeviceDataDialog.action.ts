export const SET_DEVICE_DATA_DIALOG_OPEN = 'SET_DEVICE_DATA_DIALOG_OPEN';
export const setDeviceDataDialogOpen = (open: boolean, deviceName: string, deviceType: string) => ({ type: SET_DEVICE_DATA_DIALOG_OPEN, open, deviceName, deviceType });