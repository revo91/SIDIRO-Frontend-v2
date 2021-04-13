import { fetchTimeseriesLastValue } from '../services/FetchTimeseriesAPI.service';
/* eslint-disable */

let interval;

self.addEventListener("message", message => {
  let promises = []
  const { data } = message;
  //once instantly
  data.deviceData.forEach((device) => {
    promises.push(fetchTimeseriesLastValue(device.assetID, 1))
    promises.push(fetchTimeseriesLastValue(device.assetID, 15))
  })
  Promise.all(promises).then(res => {
    postMessage(res)
  })
  //intervally every x seconds
  interval = setInterval(() => {
    promises = []
    data.deviceData.forEach((device) => {
      promises.push(fetchTimeseriesLastValue(device.assetID, 1))
      promises.push(fetchTimeseriesLastValue(device.assetID, 15))
    })
    Promise.all(promises).then(res => {
      postMessage(res)
    })
  }, 60000) // 1 minute
});

