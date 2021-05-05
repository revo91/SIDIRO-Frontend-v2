import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { LineChart } from '../LineChart.component';
import { DatePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';
import { fetchTimeseriesInterval } from '../../services/FetchTimeseriesAPI.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { setDeviceDataDialogDateFrom } from '../../actions/DeviceDataDialog.action';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { ExportCSVButton } from '../ExportCSVButton.component';
import { parseISO, format } from 'date-fns';

interface IPower {
  Active_Power_Export: number
  Active_Power_Import: number
  Reactive_Power_Export: number
  Reactive_Power_Import: number
  _time: string
}

export const PowerTab = () => {
  const { t } = useTranslation();
  const [activePowerExport, setActivePowerExport] = useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [reactivePowerExport, setReactivePowerExport] = useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [activePowerImport, setActivePowerImport] = useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [reactivePowerImport, setRectivePowerImport] = useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [csvData, setCSVData] = useState<Array<Array<any>>>()
  const assetID = useSelector((state: RootState) => state.deviceDataDialog.assetID);
  const dateFrom = useSelector((state: RootState) => state.deviceDataDialog.dateFrom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateFrom) {
      fetchTimeseriesInterval(assetID, 15,
        new Date(new Date(dateFrom.setHours(0, 0, 0, 0))).toISOString(),
        new Date(new Date(dateFrom.setHours(23, 59, 59, 999))).toISOString(),
        'Active_Power_Export,Active_Power_Import,Reactive_Power_Export,Reactive_Power_Import').then(res => {
          const activePowerExportPoints: Array<{ x: number, y: number }> = []
          const reactivePowerExportPoints: Array<{ x: number, y: number }> = []
          const activePowerImportPoints: Array<{ x: number, y: number }> = []
          const reactivePowerImportPoints: Array<{ x: number, y: number }> = []
          const csvArray: Array<Array<any>> = [[t('chart.timeAxisLabel'), `${t('deviceDataDialog.activePowerExport')} [kW]`, `${t('deviceDataDialog.reactivePowerExport')} [kvar]`, `${t('deviceDataDialog.activePowerImport')} [kW]`, `${t('deviceDataDialog.reactivePowerImport')} [kvar]`]]
          res.forEach((point: IPower) => {
            activePowerExportPoints.push({
              x: new Date(point._time).valueOf(),
              y: point.Active_Power_Export
            })
            reactivePowerExportPoints.push({
              x: new Date(point._time).valueOf(),
              y: point.Reactive_Power_Export
            })
            activePowerImportPoints.push({
              x: new Date(point._time).valueOf(),
              y: point.Active_Power_Import
            })
            reactivePowerImportPoints.push({
              x: new Date(point._time).valueOf(),
              y: point.Reactive_Power_Import
            })
            csvArray.push([format(parseISO(point._time), 'dd.MM.yyyy HH:mm:ss'), point.Active_Power_Export, point.Reactive_Power_Export, point.Active_Power_Import, point.Reactive_Power_Import])
          })
          setCSVData(csvArray)
          setActivePowerExport(activePowerExportPoints)
          setReactivePowerExport(reactivePowerExportPoints)
          setActivePowerImport(activePowerImportPoints)
          setRectivePowerImport(reactivePowerImportPoints)
        })
    }
  }, [dateFrom, assetID, t])

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <LineChart
            data={{
              datasets: [
                {
                  label: `${t('deviceDataDialog.activePowerExport')} [kW]`,
                  backgroundColor: decideDataColor(0),
                  borderColor: decideDataColor(0),
                  fill: false,
                  lineTension: 0,
                  data: activePowerExport,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.activePowerImport')} [kW]`,
                  backgroundColor: decideDataColor(1),
                  borderColor: decideDataColor(1),
                  fill: false,
                  lineTension: 0,
                  data: activePowerImport,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.reactivePowerExport')} [kvar]`,
                  backgroundColor: decideDataColor(2),
                  borderColor: decideDataColor(2),
                  fill: false,
                  lineTension: 0,
                  data: reactivePowerExport,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.reactivePowerImport')} [kvar]`,
                  backgroundColor: decideDataColor(3),
                  borderColor: decideDataColor(3),
                  fill: false,
                  lineTension: 0,
                  data: reactivePowerImport,
                  pointRadius: 0
                }
              ]
            }}
            xAxisTitle={t('chart.timeAxisLabel')}
            yAxisTitle={t('chart.valueAxisLabel')}
          />
        </Grid>
        <Grid item xs={12}>
          <ExportCSVButton data={csvData || [[]]} />
        </Grid>
        <Grid item xs={12} md={6}>
          <DatePicker
            variant='static'
            autoOk
            label={t('eventsPage.dateFromLabel')}
            value={dateFrom}
            onChange={(date) => dispatch(setDeviceDataDialogDateFrom(date))}
            fullWidth
            disableFuture
          />
        </Grid>
      </Grid>
    </React.Fragment>
  )
}