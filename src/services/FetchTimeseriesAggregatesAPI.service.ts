export const fetchTimeseriesAggregates = async (assetID: string) => {
  const response = await fetch(`/api/iottsaggregates/v3/aggregates/${assetID}/DATA_1_MIN?from=2021-03-31T22:00:00.000Z&to=2021-04-30T22:00:00.000Z&intervalUnit=month&intervalValue=1`)
  const data = await response.json()
  const dataWithCustomFields = {
    ...data[0],
    assetID
  }
  return dataWithCustomFields
}
