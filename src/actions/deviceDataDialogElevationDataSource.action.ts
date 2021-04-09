import { IDeviceData } from '../reducers/DeviceDataDialogElevationDataSource.reducer';

export const SET_DEVICE_DATA_DIALOG = 'SET_DEVICE_DATA_DIALOG';
export const setDeviceDataDialog = (assetID: string, parameters: IDeviceData) => (
  {
    type: SET_DEVICE_DATA_DIALOG,
    assetID,
    parameters
  }
);