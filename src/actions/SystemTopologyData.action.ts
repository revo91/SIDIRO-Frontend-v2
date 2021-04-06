export const SET_ASSET_DATA = 'SET_ASSET_DATA';
export const setAssetData = (assetID: string, parameters: object) => ({ type: SET_ASSET_DATA, assetID: assetID, parameters: parameters })