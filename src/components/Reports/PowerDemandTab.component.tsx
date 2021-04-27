import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';
import { fetchTimeseriesInterval } from '../../services/FetchTimeseriesAPI.service';
import { LineChart } from '../LineChart.component';
import { exportPDF } from '../../utilities/ExportPDF.utility';
import Button from '@material-ui/core/Button';
import { getUTCDate } from '../../utilities/GetUTCDate.utility';
import { setReportsDate } from '../../actions/Reports/CommonReports.action';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { TableWithSort } from '../TableWithSort.component';
import { useStyles } from '../Reports.component';
import Typography from '@material-ui/core/Typography';
import { setBackdropOpen } from '../../actions/Backdrop.action';
import { StackedBarChart } from '../StackedBarChart.component';
import { parseISO, format } from 'date-fns';
import { fetchTimeseriesAggregates } from '../../services/FetchTimeseriesAggregatesAPI.service';

interface IActivePowerImport {
  Active_Power_Import: number
  _time: string
}

interface IActivePowerImportAggregate {
  data: Array<{
    Active_Power_Import?: {
      lastvalue: number
    },
    starttime: string
  }>
  assetID: string
}

export const PowerDemandTab = () => {
  const [outfeedsDate, setOutfeedsDate] = useState<Date>(new Date(getUTCDate(new Date()).startOfDay))
  const [infeedPowerDemandChartData, setInfeedPowerDemandChartData] = useState<Array<{ x: number, y: number }>>()
  const [infeedPowerDemandExceedings, setInfeedPowerDemandExceedings] = useState<Array<Array<number | string | Date>>>()
  const [warningLine, setWarningLine] = useState<Array<{ x: number, y: number }>>()
  const [alarmLine, setAlarmLine] = useState<Array<{ x: number, y: number }>>()
  // const [outfeedChartElements, setOutfeedChartElements] = useState<{infeedValues: }>
  const [outfeedChartData, setOutfeedChartData] = useState<{
    xAxisLabels: Array<string> | null, //[...every 15min intervals of a day]
    datasets: Array<{ label: string, data: Array<number>, backgroundColor: string }>
  }>()
  const powerDemandAssets = useSelector((state: RootState) => state.powerDemandTab);
  const dateFrom = useSelector((state: RootState) => state.commonReports.dateFrom);
  const dateTo = useSelector((state: RootState) => state.commonReports.dateTo);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const assetsNames = useSelector((state: RootState) => state.commonReports.assets);

  useEffect(() => {
    if (powerDemandAssets.infeeds && powerDemandAssets.warningThreshold && powerDemandAssets.alarmThreshold) {
      let promises: Array<Promise<any>> = []
      const numberOfSamples = (new Date(dateTo).valueOf() - new Date(dateFrom).valueOf()) / 900000 //number of 15-min intervals in month, if >2000 need to split calls into 2 to get all data - thanks MS limit ...
      powerDemandAssets.infeeds.forEach(infeed => {
        if (numberOfSamples > 2000) {
          promises.push(fetchTimeseriesInterval(infeed, 15, dateFrom, new Date(new Date(dateTo).valueOf() - 1296000000).toISOString(), 'Active_Power_Import'))
          promises.push(fetchTimeseriesInterval(infeed, 15, new Date(new Date(dateTo).valueOf() - 1295999999).toISOString(), dateTo, 'Active_Power_Import'))
        }
      })
      dispatch(setBackdropOpen(true))
      Promise.all(promises).then((res: Array<Array<IActivePowerImport>>) => {
        dispatch(setBackdropOpen(false))
        if (res.length > 0) {
          const activePowerValuesSum: Array<{ x: number, y: number }> = []
          const reduced = res.reduce((a, b) => a.concat(b))
          reduced.forEach(single15Interval => {
            const timestampIndex = activePowerValuesSum.findIndex(element => element.x === new Date(single15Interval._time).valueOf())
            if (timestampIndex !== -1) {
              activePowerValuesSum[timestampIndex].y = activePowerValuesSum[timestampIndex].y + single15Interval.Active_Power_Import / 1000
            }
            else {
              activePowerValuesSum.push({
                x: new Date(single15Interval._time).valueOf(),
                y: single15Interval.Active_Power_Import / 1000
              })
            }
          })
          const warningLine = activePowerValuesSum.map(single15Interval => {
            return {
              x: new Date(single15Interval.x).valueOf(),
              y: powerDemandAssets.warningThreshold ? powerDemandAssets.warningThreshold : 0
            }
          })
          const alarmLine = activePowerValuesSum.map(single15Interval => {
            return {
              x: new Date(single15Interval.x).valueOf(),
              y: powerDemandAssets.alarmThreshold ? powerDemandAssets.alarmThreshold : 0
            }
          })
          setAlarmLine(alarmLine)
          setWarningLine(warningLine)
          setInfeedPowerDemandChartData(activePowerValuesSum)
        }
      })
    }
  }, [dateFrom, dateTo, powerDemandAssets, setInfeedPowerDemandChartData, dispatch])

  useEffect(() => {
    //generate warning/alarm table
    if (infeedPowerDemandChartData && powerDemandAssets.warningThreshold && powerDemandAssets.alarmThreshold) {
      const exceedings: React.SetStateAction<(string | number | Date)[][] | undefined> = []
      infeedPowerDemandChartData.forEach(value => {
        if (powerDemandAssets.warningThreshold && powerDemandAssets.alarmThreshold) {
          const parsedDate = new Date(value.x);
          if (value.y > powerDemandAssets.alarmThreshold) {
            exceedings.push([parsedDate, value.y, parseFloat((value.y - powerDemandAssets.alarmThreshold).toFixed(3)), t('reportsPage.alarm') as string])
          }
          else if (value.y > powerDemandAssets.warningThreshold) {
            exceedings.push([parsedDate, value.y, parseFloat((value.y - powerDemandAssets.warningThreshold).toFixed(3)), t('reportsPage.warning') as string])
          }
        }
      })
      setInfeedPowerDemandExceedings(exceedings)
    }
  }, [setInfeedPowerDemandExceedings, t, infeedPowerDemandChartData, powerDemandAssets.alarmThreshold, powerDemandAssets.warningThreshold])

  useEffect(() => {
    //generate outfeeds chart
    if (Object.keys(assetsNames).length > 0 && powerDemandAssets.outfeeds && powerDemandAssets.outfeeds.length > 0 && infeedPowerDemandChartData && powerDemandAssets.infeeds) {
      const promisesOutfeeds = powerDemandAssets.outfeeds.map(outfeed => {
        return fetchTimeseriesAggregates(outfeed, 'DATA_15_MIN', 'minute', 15, getUTCDate(outfeedsDate).startOfDay, getUTCDate(outfeedsDate).endOfDay)
      })
      const promisesInfeeds = powerDemandAssets.infeeds.map(infeed => {
        return fetchTimeseriesAggregates(infeed, 'DATA_15_MIN', 'minute', 15, getUTCDate(outfeedsDate).startOfDay, getUTCDate(outfeedsDate).endOfDay)
      })
      const promises = promisesOutfeeds.concat(promisesInfeeds)
      dispatch(setBackdropOpen(true))
      Promise.all(promises).then(res => {
        dispatch(setBackdropOpen(false))
        if (res.length > 0) {
          const infeedsPart = res.slice(-promisesInfeeds.length)
          res.length = res.length - infeedsPart.length
          const outfeedsPart = res;

          let xAxisLabels: Array<string> = []
          let respectiveDatasetsActivePowers: Array<Array<number>> = []
          const datasetsOutfeeds = outfeedsPart.map((outfeeds: IActivePowerImportAggregate, outfeedGroupIndex: number) => {
            const data = outfeeds.data.map((outfeed) => {
              const formattedDate = `${format(parseISO(outfeed.starttime), 'HH:mm')}`
              if (xAxisLabels.indexOf(formattedDate) === -1) {
                xAxisLabels.push(formattedDate)
              }
              if (outfeed.Active_Power_Import) {
                return outfeed.Active_Power_Import.lastvalue / 1000
              }
              else {
                return 0
              }
            })
            respectiveDatasetsActivePowers.push(data)
            return {
              label: powerDemandAssets.outfeeds ? assetsNames[powerDemandAssets.outfeeds[outfeedGroupIndex]].feederName : '',
              data: data,
              backgroundColor: decideDataColor(outfeedGroupIndex)
            }
          })
          const datasetsInfeeds = infeedsPart.map((infeeds: IActivePowerImportAggregate) => {
            const data = infeeds.data.map((infeed) => {
              if (infeed.Active_Power_Import) {
                return infeed.Active_Power_Import.lastvalue / 1000
              }
              else {
                return 0
              }
            })
            const outfeedsSum = respectiveDatasetsActivePowers.reduce((r, a) => a.map((b, i) => {
              return ((r[i] || 0)) + b
            }), [])
            const restPower = data.map((singleVal, index) => parseFloat((singleVal - outfeedsSum[index]).toFixed(3)))
            return {
              label: t('reportsPage.othersDataTitle'),
              data: restPower,
              backgroundColor: decideDataColor(datasetsOutfeeds.length + 1)
            }
          })

          const datasets = datasetsOutfeeds.concat(datasetsInfeeds)
          setOutfeedChartData({ xAxisLabels, datasets })
        }
      })
    }
  }, [assetsNames, outfeedsDate, powerDemandAssets.outfeeds, infeedPowerDemandChartData, powerDemandAssets.infeeds, t, dispatch])

  const handleDateChange = (date: Date) => {
    dispatch(setReportsDate(getUTCDate(date).startOfMonth, getUTCDate(date).endOfMonth))
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12} md={8} lg={9}>
        <DatePicker
          cancelLabel={t('datePicker.cancelButton')}
          autoOk
          label={t('reportsPage.chooseMonth')}
          value={dateFrom}
          onChange={(date) => date ? handleDateChange(date) : null}
          fullWidth
          views={['month']}
          format="MM/yyyy"
        />
      </Grid>
      <Grid item xs={12} md={4} lg={3}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => exportPDF()}
        >
          {t('reportsPage.exportToPDF')}
        </Button>
      </Grid>
      {infeedPowerDemandChartData && warningLine && alarmLine ?
        <React.Fragment>
          <Grid item xs={12} className={classes.sectionMargin}>
            <Typography gutterBottom variant="h5">{t('reportsPage.averageActivePower15Min')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <LineChart
              data={{
                datasets: [{
                  label: t('reportsPage.averageActivePower15Min'),
                  backgroundColor: decideDataColor(0),
                  borderColor: decideDataColor(0),
                  fill: false,
                  lineTension: 0,
                  data: infeedPowerDemandChartData,
                  pointRadius: 0
                },
                {
                  label: t('reportsPage.warningThreshold'),
                  backgroundColor: 'orange',
                  borderColor: 'orange',
                  fill: false,
                  lineTension: 0,
                  data: warningLine,
                  pointRadius: 0,
                  borderDash: [5]
                },
                {
                  label: t('reportsPage.alarmThreshold'),
                  backgroundColor: 'red',
                  borderColor: 'red',
                  fill: false,
                  lineTension: 0,
                  data: alarmLine,
                  pointRadius: 0,
                  borderDash: [5]
                }]
              }}
              xAxisTitle={t('chart.timeAxisLabel')}
              yAxisTitle={t('chart.valueAxisLabel')}
              timeInterval='day'
              yAxisUnit='kW'
            />
          </Grid>
          {infeedPowerDemandExceedings ?
            <React.Fragment>
              <Grid item xs={12} className={classes.sectionMargin}>
                <Typography gutterBottom variant="h5">{t('reportsPage.powerExceedings')}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TableWithSort
                  rows={infeedPowerDemandExceedings}
                  columns={[t('reportsPage.tableColumnTime'), t('reportsPage.tableColumnPower'), t('reportsPage.tableColumnExceeding'), t('reportsPage.tableColumnAlarmWarning')]}
                  defaultOrderColumnIndex={0}
                />
              </Grid>

            </React.Fragment>
            : null}
        </React.Fragment>
        : null}
      {outfeedChartData && outfeedChartData.xAxisLabels && outfeedChartData.datasets ?
        <React.Fragment>
          <Grid item xs={12} className={classes.sectionMargin}>
            <Typography gutterBottom variant="h5">{t('reportsPage.outfeedAverageActivePower')}</Typography>
          </Grid>
          <Grid item xs={12}>
            <StackedBarChart
              yAxisTitle={t('chart.valueAxisLabel')}
              xAxisTitle={t('chart.timeAxisLabel')}
              yAxisUnit='kW'
              chartTitle=""
              data={{
                labels: outfeedChartData.xAxisLabels,
                datasets: outfeedChartData.datasets
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <DatePicker
              cancelLabel={t('datePicker.cancelButton')}
              autoOk
              label={t('reportsPage.chooseMonth')}
              value={outfeedsDate}
              onChange={(date) => date ? setOutfeedsDate(date) : null}
              fullWidth
              format="MM/yyyy"
              variant='static'
              disableFuture
            />
          </Grid>
        </React.Fragment>
        : null}

    </Grid>
  )
}
