export const fetchTimeseriesLastValue = async (assetID: string, interval: number) => {
  const response = await fetch(`/api/iottimeseries/v3/timeseries/${assetID}/DATA_${interval}_MIN`)
  const data = await response.json()
  const dataWithCustomFields = {
    ...data[0],
    assetID,
  }
  return dataWithCustomFields
}


export const fetchTimeseriesInterval = async (assetID: string, interval: number, fromDate: string, toDate: string, select: string) => {
  const response = await fetch(`/api/iottimeseries/v3/timeseries/${assetID}/DATA_${interval}_MIN?from=${fromDate}&to=${toDate}&select=${select}`)
  const data = await response.json()
  return data
}
