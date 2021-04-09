import { SET_DEVICE_DATA_DIALOG } from '../actions/deviceDataDialogElevationDataSource.action';

export interface IDeviceData {
  infeedName?: string,
  infeedTableName?: string,
  infeedType?: string,
  breakerName: string,
  breakerType: string,
  breakerAssetID: string,
  sectionName: string,
  switchboardName: string,
  breakerTableName?: string
}

interface IDeviceDataDialog {
  type: string,
  assetID: string,
  parameters: IDeviceData
}

interface IDeviceID {
  [index: string]: IDeviceData
}

const initialState: IDeviceID = {}

export const DeviceDataDialogElevationDataSource = (state = initialState, action: IDeviceDataDialog) => {
  switch (action.type) {
    case SET_DEVICE_DATA_DIALOG:
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