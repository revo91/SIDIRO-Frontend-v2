const API_URL = "/apiEvents";

export const fetchEvents = async (assetID: string, fromDate: string, toDate: string) => {
  const response = await fetch(`${API_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      asset: assetID,
      fromDate,
      toDate
    })
  })
  const data = await response.json()
  const dataWithCustomFields = {
    ...data,
    assetID,
  }
  return dataWithCustomFields
}
