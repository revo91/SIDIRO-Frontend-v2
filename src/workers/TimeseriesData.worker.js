import { fetchTimeseriesLastValue } from '../services/FetchTimeseriesAPI.service';
/* eslint-disable */

let interval1min;
let interval15min;

self.addEventListener("message", message => {
  let promises1min = []
  let promises15min = []
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
  interval1min = setInterval(() => {
    promises1min = []
    data.deviceData.forEach((device) => {
      promises1min.push(fetchTimeseriesLastValue(device.assetID, 1))
    })
    Promise.all(promises1min).then(res => {
      postMessage(res)
    })
  }, 60000) // 1 minute
  interval15min = setInterval(() => {
    promises15min = []
    data.deviceData.forEach((device) => {
      promises15min.push(fetchTimeseriesLastValue(device.assetID, 15))
    })
    Promise.all(promises15min).then(res => {
      postMessage(res)
    })
  }, 900000) // 15 minutes
});

