export const SET_ASSETS_REPORTS_DATA = 'SET_ASSETS_REPORTS_DATA'
export const SET_REPORTS_DATE = 'SET_REPORTS_DATE'

export const setAssetsReportsData = (assetData: any) => ({ type: SET_ASSETS_REPORTS_DATA, assetData })
export const setReportsDate = (dateFrom: string, dateTo: string) => ({ type: SET_REPORTS_DATE, dateFrom, dateTo })