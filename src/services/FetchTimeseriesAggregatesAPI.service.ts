export const fetchTimeseriesAggregates = async (assetID: string, aspectName: string, intervalUnit: string, intervalValue: number, dateFrom: string, dateTo: string) => {
  const response = await fetch(`/api/iottsaggregates/v3/aggregates/${assetID}/${aspectName}?from=${dateFrom}&to=${dateTo}&intervalUnit=${intervalUnit}&intervalValue=${intervalValue}`)
  const data = await response.json()
  const dataWithCustomFields = intervalUnit === 'month' ? {
    ...data[0],
    assetID
  }
    : {
      data,
      assetID
    }
  return dataWithCustomFields
}

//from=2021-03-31T22:00:00.000Z&to=2021-04-30T22:00:00.000Z
