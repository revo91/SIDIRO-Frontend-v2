const API_URL_LASTVALUE = "/apiTimeseries";
const API_URL_INTERVAL = "/apiTimeseriesInterval";

export const fetchTimeseriesLastValue = async (assetID: string, interval: number) => {
  const response = await fetch(`${API_URL_LASTVALUE}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      asset: assetID,
      interval: interval
    })
  })
  const data = await response.json()
  const dataWithCustomFields = {
    ...data[0],
    assetID,
  }
  return dataWithCustomFields
}


export const fetchTimeseriesInterval = async (assetID: string, interval: number, fromDate: string, toDate: string, select: string) => {
  const response = await fetch(`${API_URL_INTERVAL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      asset: assetID,
      interval: interval,
      fromDate: fromDate,
      toDate: toDate,
      select: select
    })
  })
  const data = await response.json()
  return data
}
