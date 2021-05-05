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

interface IVoltageLL {
  Voltage_L1_L2: number
  Voltage_L2_L3: number
  Voltage_L3_L1: number
  _time: string
}

export const VoltageLLTab = () => {
  const { t } = useTranslation();
  const [l1, setL1] = useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [l2, setL2] = useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [l3, setL3] = useState<Array<{ x: number | Date, y: number }>>([{ x: 0, y: 0 }])
  const [csvData, setCSVData] = useState<Array<Array<any>>>()
  const assetID = useSelector((state: RootState) => state.deviceDataDialog.assetID);
  const dateFrom = useSelector((state: RootState) => state.deviceDataDialog.dateFrom);
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateFrom) {
      fetchTimeseriesInterval(assetID, 1, new Date(new Date(dateFrom.setHours(0, 0, 0, 0))).toISOString(), new Date(new Date(dateFrom.setHours(23, 59, 59, 999))).toISOString(), 'Voltage_L1_L2,Voltage_L2_L3,Voltage_L3_L1').then(res => {
        const pointsL1: Array<{ x: number, y: number }> = []
        const pointsL2: Array<{ x: number, y: number }> = []
        const pointsL3: Array<{ x: number, y: number }> = []
        const csvArray: Array<Array<any>> = [[t('chart.timeAxisLabel'), 'L1-L2 [V]', 'L2-L3 [V]', 'L3-L1 [V]']]
        res.forEach((point: IVoltageLL) => {
          pointsL1.push({
            x: new Date(point._time).valueOf(),
            y: point.Voltage_L1_L2
          })
          pointsL2.push({
            x: new Date(point._time).valueOf(),
            y: point.Voltage_L2_L3
          })
          pointsL3.push({
            x: new Date(point._time).valueOf(),
            y: point.Voltage_L3_L1
          })
          csvArray.push([format(parseISO(point._time), 'dd.MM.yyyy HH:mm:ss'), point.Voltage_L1_L2, point.Voltage_L2_L3, point.Voltage_L3_L1])
        })
        setCSVData(csvArray)
        setL1(pointsL1)
        setL2(pointsL2)
        setL3(pointsL3)
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
                  label: `${t('deviceDataDialog.voltageL1L2')}`,
                  backgroundColor: decideDataColor(0),
                  borderColor: decideDataColor(0),
                  fill: false,
                  lineTension: 0,
                  data: l1,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.voltageL2L3')}`,
                  backgroundColor: decideDataColor(1),
                  borderColor: decideDataColor(1),
                  fill: false,
                  lineTension: 0,
                  data: l2,
                  pointRadius: 0
                },
                {
                  label: `${t('deviceDataDialog.voltageL3L1')}`,
                  backgroundColor: decideDataColor(2),
                  borderColor: decideDataColor(2),
                  fill: false,
                  lineTension: 0,
                  data: l3,
                  pointRadius: 0
                }
              ]
            }}
            yAxisUnit={'V'}
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