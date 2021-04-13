import { IDeviceDataDialog } from '../reducers/DeviceDataDialog.reducer';

export const SET_DEVICE_DATA_DIALOG_OPEN = 'SET_DEVICE_DATA_DIALOG_OPEN';
export const SET_DEVICE_DATA_DIALOG_DATE_FROM = 'SET_DEVICE_DATA_DIALOG_DATE_FROM';

export const setDeviceDataDialogOpen = (params: IDeviceDataDialog) => (
  {
    type: SET_DEVICE_DATA_DIALOG_OPEN,
    open: params.open,
    deviceName: params.deviceName,
    deviceType: params.deviceType,
    breakerName: params.breakerName,
    sectionName: params.sectionName,
    assetID: params.assetID,
    switchboardAssetID: params.switchboardAssetID
  }
);

export const setDeviceDataDialogDateFrom = (dateFrom: Date | null) => ({ type: SET_DEVICE_DATA_DIALOG_DATE_FROM, dateFrom })