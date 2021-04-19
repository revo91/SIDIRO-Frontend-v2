export const fetchEvents = async (assetID: string, fromDate: string, toDate: string) => {
  const response = await fetch(`/api/eventmanagement/v3/events?size=500&page=0&filter={"timestamp":{"between":"[${fromDate},${toDate})"},"entityId":"${assetID}","typeId":"com.siemens.mindsphere.eventmgmt.event.type.MindSphereStandardEvent"}`)
  const data = await response.json()
  const dataWithCustomFields = {
    ...data,
    assetID,
  }
  return dataWithCustomFields
}
