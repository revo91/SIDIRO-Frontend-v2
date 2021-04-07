import { fetchTimeseries } from '../services/FetchTimeseriesAPI.service';
/* eslint-disable */

let interval;

self.addEventListener("message", message => {
  const promises = []
  const { data } = message;
  //once instantly
  data.ids.forEach((assetID) => {
    promises.push(fetchTimeseries(assetID, 1))
    promises.push(fetchTimeseries(assetID, 15))
  })
  Promise.all(promises).then(res => {
    postMessage(res)
  })
  //intervally every x seconds
  interval = setInterval(() => {
    data.ids.forEach((assetID) => {
      promises.push(fetchTimeseries(assetID, 1))
      promises.push(fetchTimeseries(assetID, 15))
    })
    Promise.all(promises).then(res => {
      postMessage(res)
    })
  }, 60000) // 1 minute

});

