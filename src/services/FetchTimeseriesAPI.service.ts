const API_URL = "/api";

export const fetchTimeseries = async (assetID: string, interval: number) => {
  const response = await fetch(`${API_URL}`, {
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
  return data
}
