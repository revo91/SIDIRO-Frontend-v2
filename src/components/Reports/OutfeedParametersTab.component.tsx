import React, { useState, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "@material-ui/pickers";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { useTranslation } from 'react-i18next';
import { getUTCDate } from '../../utilities/GetUTCDate.utility';
import { setReportsDate } from '../../actions/Reports/CommonReports.action';
import { useStyles } from '../Reports.component';
import { exportPDF } from '../../utilities/ExportPDF.utility';
import { setBackdropOpen } from '../../actions/Backdrop.action';
import { fetchTimeseriesAggregates } from '../../services/FetchTimeseriesAggregatesAPI.service';
import { parseISO, format } from 'date-fns';
import { UniversalTable } from '../UniversalTable.component';
import { LineChart } from '../LineChart.component';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { setDeviceDataDialogOpen } from '../../actions/DeviceDataDialog.action';
import { setDeviceDataDialogDateFrom } from '../../actions/DeviceDataDialog.action';
import { setUniversalTabsNameIndex } from '../../actions/UniversalTabs.action';

interface IAggregatedParameterValues {
  maxtime: string
  mintime: string
  maxvalue: number
  minvalue: number
  firstvalue: number
  average: number
}

interface IOutfeedAggregatedValues {
  Current_L1: IAggregatedParameterValues
  Current_L2: IAggregatedParameterValues
  Current_L3: IAggregatedParameterValues
  THD_I_L1: IAggregatedParameterValues
  THD_I_L2: IAggregatedParameterValues
  THD_I_L3: IAggregatedParameterValues
  THD_U_L1: IAggregatedParameterValues
  THD_U_L2: IAggregatedParameterValues
  THD_U_L3: IAggregatedParameterValues
  Voltage_L1_L2: IAggregatedParameterValues
  Voltage_L1_N: IAggregatedParameterValues
  Voltage_L2_L3: IAggregatedParameterValues
  Voltage_L2_N: IAggregatedParameterValues
  Voltage_L3_L1: IAggregatedParameterValues
  Voltage_L3_N: IAggregatedParameterValues,
  starttime: string
}

export const OutfeedParametersTab = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const dateFrom = useSelector((state: RootState) => state.commonReports.dateFrom);
  const dateTo = useSelector((state: RootState) => state.commonReports.dateTo);
  const overview = useSelector((state: RootState) => state.overview);
  const [availableSwitchboards, setAvailableSwitchboards] = useState<Array<string>>()
  const [switchboard, setSwitchboard] = useState<string>('');
  const [availableOutfeeds, setAvailableOutfeeds] = useState<Array<{
    name: string,
    assetID: string
  }>>()
  const [dialogData, setDialogData] = useState<{
    deviceName: string,
    deviceType: string,
    breakerName: string,
    breakerType: string,
    sectionName: string,
    assetID: string,
    switchboardAssetID: string
  }>()
  const [outfeedAssetID, setOutfeedAssetID] = useState<string>();
  const [outfeedAssetName, setOutfeedAssetName] = useState<string>();
  const [outfeedMonthlyAggregatedData, setOutfeedMonthlyAggregatedData] = useState<IOutfeedAggregatedValues>()
  const [outfeedMonthlyAggregatedDataCurrentTable, setOutfeedMonthlyAggregatedDataCurrentTable] = useState<{ rows: Array<Array<number | string | React.ReactNode>>, columns: Array<string> }>()
  const [outfeedMonthlyAggregatedDataTHDITable, setOutfeedMonthlyAggregatedDataTHDITable] = useState<{ rows: Array<Array<number | string | React.ReactNode>>, columns: Array<string> }>()
  const [monthly1minData, setMonthly1minData] = useState<Array<IOutfeedAggregatedValues>>()
  const [currentAndTHDChartData, setCurrentAndTHDChartData] = useState<{
    maxCurrentL1: Array<{ x: number, y: number }>,
    maxCurrentL2: Array<{ x: number, y: number }>,
    maxCurrentL3: Array<{ x: number, y: number }>,
    avgCurrentL1: Array<{ x: number, y: number }>,
    avgCurrentL2: Array<{ x: number, y: number }>,
    avgCurrentL3: Array<{ x: number, y: number }>,
    maxThdiL1: Array<{ x: number, y: number }>,
    maxThdiL2: Array<{ x: number, y: number }>,
    maxThdiL3: Array<{ x: number, y: number }>,
    avgThdiL1: Array<{ x: number, y: number }>,
    avgThdiL2: Array<{ x: number, y: number }>,
    avgThdiL3: Array<{ x: number, y: number }>
  }>()

  const buttonOnClickOpenDialog = useCallback((date: string, tabIndex: number) => {
    if (dialogData) {
      dispatch(setDeviceDataDialogDateFrom(new Date(date)))
      dispatch(setUniversalTabsNameIndex('BreakerDeviceDetails', tabIndex)) // (name, value)
      dispatch(setDeviceDataDialogOpen({
        open: true,
        deviceName: dialogData.deviceName,
        deviceType: dialogData.deviceType,
        breakerName: dialogData.breakerName,
        sectionName: dialogData.sectionName,
        assetID: dialogData.assetID,
        switchboardAssetID: dialogData.switchboardAssetID
      }))
    }
  }, [dispatch, dialogData])

  const renderButton = useCallback((innerHTML: string, date: string, tabIndex: number) => {
    return (
      <Button
        onClick={() => buttonOnClickOpenDialog(date, tabIndex)}
        className={classes.smallerFont}>
        {innerHTML}
      </Button>
    )
  }, [classes.smallerFont, buttonOnClickOpenDialog])

  useEffect(() => { //GATHER SWITCHBOARDS AVAILABLE
    const switchboards = overview.diagrams.map(diagram => diagram.name)
    if (switchboards.length > 0) {
      setAvailableSwitchboards(switchboards)
      setSwitchboard(switchboards[0])
    }
  }, [overview.diagrams, setAvailableSwitchboards, setSwitchboard])

  useEffect(() => { //GATHER OUTFEEDS BELONGING TO SELECTED SWITCHBOARD
    if (switchboard !== '') {
      const switchboardContent = overview.diagrams.find(diagram => diagram.name === switchboard)
      let breakers: Array<{
        name: string,
        assetID: string
      }> = []
      if (switchboardContent) {
        switchboardContent.sections.forEach(section => {
          if (section.breakers) {
            breakers = breakers.concat(section.breakers.map(breaker => {
              return {
                name: `${breaker.name} - ${breaker.tableName}`,
                assetID: breaker.assetID,
              }
            }))
          }
        })
      }
      setAvailableOutfeeds(breakers)
      setOutfeedAssetID(breakers[0].assetID)
      setOutfeedAssetName(breakers[0].name)
    }
  }, [switchboard, overview.diagrams, setAvailableOutfeeds, setOutfeedAssetName, setOutfeedAssetID])

  useEffect(() => { // FETCH MONTHLY AGGREGATED OUTFEED DATA
    if (outfeedAssetID && outfeedAssetName) {
      dispatch(setBackdropOpen(true))
      fetchTimeseriesAggregates(outfeedAssetID, 'DATA_1_MIN', 'month', 1, dateFrom, dateTo).then(res => {
        dispatch(setBackdropOpen(false))
        setOutfeedMonthlyAggregatedData(res)
      }).catch(err => dispatch(setBackdropOpen(false)))
    }
  }, [outfeedAssetID, outfeedAssetName, dateFrom, dateTo, dispatch])

  useEffect(() => { // CURRENT AND THDI TABLES INITIALIZATION
    if (outfeedMonthlyAggregatedData && outfeedMonthlyAggregatedData.Current_L1) {
      const columnsCurrentTable = [t('reportsPage.genericParameterTitle'), t('reportsPage.averageValue'), t('reportsPage.maxValue'), t('reportsPage.minValue')]
      const rowsCurrentTable = [
        [`${t('deviceDataDialog.current')} L1`,
        setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L1.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L1.maxvalue), 'A')}</p>
          {renderButton(format(parseISO(outfeedMonthlyAggregatedData.Current_L1.maxtime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.Current_L1.maxtime, 1)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L1.minvalue), 'A')}
        </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.Current_L1.mintime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.Current_L1.mintime, 1)}
        </React.Fragment>
        ],
        [`${t('deviceDataDialog.current')} L2`,
        setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L2.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L2.maxvalue), 'A')}
        </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.Current_L2.maxtime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.Current_L2.maxtime, 1)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L2.minvalue), 'A')}
        </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.Current_L2.mintime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.Current_L2.mintime, 1)}
        </React.Fragment>
        ],
        [`${t('deviceDataDialog.current')} L3`,
        setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L3.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L3.maxvalue), 'A')}
        </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.Current_L3.maxtime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.Current_L3.maxtime, 1)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.Current_L3.minvalue), 'A')}
        </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.Current_L3.mintime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.Current_L3.mintime, 1)}
        </React.Fragment>
        ]
      ]
      const columnsTHDITable = columnsCurrentTable
      const rowsTHDITable = [
        ['THDI L1',
          setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L1.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L1.maxvalue), '%')}
          </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.THD_I_L1.maxtime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.THD_I_L1.maxtime, 3)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L1.minvalue), '%')}
          </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.THD_I_L1.mintime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.THD_I_L1.mintime, 3)}
          </React.Fragment>
        ],
        ['THDI L2',
          setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L2.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L2.maxvalue), '%')}
          </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.THD_I_L2.maxtime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.THD_I_L2.maxtime, 3)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L2.minvalue), '%')}
          </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.THD_I_L2.mintime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.THD_I_L2.mintime, 3)}
          </React.Fragment>
        ],
        ['THDI L3',
          setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L3.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L3.maxvalue), '%')}
          </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.THD_I_L3.maxtime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.THD_I_L3.maxtime, 3)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(outfeedMonthlyAggregatedData.THD_I_L3.minvalue), '%')}
          </p>{renderButton(format(parseISO(outfeedMonthlyAggregatedData.THD_I_L3.mintime), 'dd/MM/yyyy, HH:mm'), outfeedMonthlyAggregatedData.THD_I_L3.mintime, 3)}
          </React.Fragment>
        ]
      ]
      setOutfeedMonthlyAggregatedDataCurrentTable({ rows: rowsCurrentTable, columns: columnsCurrentTable })
      setOutfeedMonthlyAggregatedDataTHDITable({ rows: rowsTHDITable, columns: columnsTHDITable })
    }
    else {
      setOutfeedMonthlyAggregatedDataCurrentTable(undefined)
      setOutfeedMonthlyAggregatedDataTHDITable(undefined)
    }
  }, [outfeedMonthlyAggregatedData, classes.smallerFont, t, renderButton])

  useEffect(() => { //FETCH MONTHLY DATA_1_MIN AGGREGATED BY 1 DAY CHART DATA
    if (outfeedAssetName && outfeedAssetID) {
      dispatch(setBackdropOpen(true))
      fetchTimeseriesAggregates(outfeedAssetID, 'DATA_1_MIN', 'day', 1, dateFrom, dateTo).then(res => {
        dispatch(setBackdropOpen(false))
        if (res.data && res.data.length > 0) {
          setMonthly1minData(res.data)
        }
      }).catch(err => dispatch(setBackdropOpen(false)))
    }
  }, [dateFrom, dateTo, outfeedAssetName, outfeedAssetID, dispatch])

  useEffect(() => { //SET CURRENT && THD CHARTS DATA
    if (monthly1minData && monthly1minData.length > 0) {
      const datasets = monthly1minData.map(dailyValue => {
        return {
          maxCurrentL1Data: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.Current_L1 ? parseFloat((dailyValue.Current_L1.maxvalue).toFixed(3)) : 0
          },
          maxCurrentL2Data: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.Current_L2 ? parseFloat((dailyValue.Current_L2.maxvalue).toFixed(3)) : 0
          },
          maxCurrentL3Data: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.Current_L3 ? parseFloat((dailyValue.Current_L3.maxvalue).toFixed(3)) : 0
          },
          avgCurrentL1Data: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.Current_L1 ? parseFloat((dailyValue.Current_L1.average).toFixed(3)) : 0
          },
          avgCurrentL2Data: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.Current_L2 ? parseFloat((dailyValue.Current_L2.average).toFixed(3)) : 0
          },
          avgCurrentL3Data: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.Current_L3 ? parseFloat((dailyValue.Current_L3.average).toFixed(3)) : 0
          },
          maxThdiL1: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_I_L1 ? parseFloat((dailyValue.THD_I_L1.maxvalue).toFixed(3)) : 0
          },
          maxThdiL2: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_I_L2 ? parseFloat((dailyValue.THD_I_L2.maxvalue).toFixed(3)) : 0
          },
          maxThdiL3: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_I_L3 ? parseFloat((dailyValue.THD_I_L3.maxvalue).toFixed(3)) : 0
          },
          avgThdiL1: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_U_L1 ? parseFloat((dailyValue.THD_I_L1.average).toFixed(3)) : 0
          },
          avgThdiL2: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_U_L2 ? parseFloat((dailyValue.THD_I_L2.average).toFixed(3)) : 0
          },
          avgThdiL3: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_U_L3 ? parseFloat((dailyValue.THD_I_L3.average).toFixed(3)) : 0
          },
        }
      })
      setCurrentAndTHDChartData({
        maxCurrentL1: datasets.map(el => el.maxCurrentL1Data),
        maxCurrentL2: datasets.map(el => el.maxCurrentL2Data),
        maxCurrentL3: datasets.map(el => el.maxCurrentL3Data),
        avgCurrentL1: datasets.map(el => el.avgCurrentL1Data),
        avgCurrentL2: datasets.map(el => el.avgCurrentL2Data),
        avgCurrentL3: datasets.map(el => el.avgCurrentL3Data),
        maxThdiL1: datasets.map(el => el.maxThdiL1),
        maxThdiL2: datasets.map(el => el.maxThdiL2),
        maxThdiL3: datasets.map(el => el.maxThdiL3),
        avgThdiL1: datasets.map(el => el.avgThdiL1),
        avgThdiL2: datasets.map(el => el.avgThdiL2),
        avgThdiL3: datasets.map(el => el.avgThdiL3),
      })
    }
  }, [monthly1minData, setCurrentAndTHDChartData])

  useEffect(() => { // SET SELECTED OUTFEED DIALOG DATA
    if (outfeedAssetID && outfeedAssetName && switchboard) {
      const switchboardContent = overview.diagrams.find(diagram => diagram.name === switchboard)
      let outfeedSectionIndex = null;
      let outfeedBreakerIndex = null
      if (switchboardContent) {
        switchboardContent.sections.forEach((section, sectionIndex: number) => {
          if (section.breakers) {
            section.breakers.forEach((breaker, breakerIndex: number) => {
              if (breaker.assetID === outfeedAssetID) {
                outfeedSectionIndex = sectionIndex;
                outfeedBreakerIndex = breakerIndex
              }
            })
          }
        })
      }
      if (outfeedSectionIndex !== null && outfeedBreakerIndex !== null && switchboardContent) {
        setDialogData({
          deviceName: switchboardContent.sections[outfeedSectionIndex]?.breakers?.[outfeedBreakerIndex].tableName || '',
          deviceType: switchboardContent.sections[outfeedSectionIndex]?.breakers?.[outfeedBreakerIndex].type || '',
          breakerName: switchboardContent.sections[outfeedSectionIndex]?.breakers?.[outfeedBreakerIndex].name || '',
          breakerType: switchboardContent.sections[outfeedSectionIndex]?.breakers?.[outfeedBreakerIndex].type || '',
          sectionName: `${switchboardContent.name} ${t('deviceDataDialog.section')} ${switchboardContent.sections[outfeedSectionIndex].name}`,
          assetID: switchboardContent.sections[outfeedSectionIndex]?.breakers?.[outfeedBreakerIndex].assetID || '',
          switchboardAssetID: switchboardContent.assetID || ''
        })
      }
    }
  }, [outfeedAssetID, switchboard, outfeedAssetName, overview.diagrams, t])

  const setPrecision = (value: number) => {
    return parseFloat(value.toFixed(3))
  }

  const setValueUnit = (value: number, unit: string) => {
    return `${value} ${unit}`
  }

  const handleSwitchboardChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSwitchboard(event.target.value as string);
  };

  const handleOutfeedChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setOutfeedAssetID(event.target.value as string);
    if (availableOutfeeds) {
      setOutfeedAssetName(availableOutfeeds[availableOutfeeds.findIndex(el => el.assetID === event.target.value)].name)
    }
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3} lg={3}>
          <DatePicker
            cancelLabel={t('datePicker.cancelButton')}
            autoOk
            label={t('reportsPage.chooseMonth')}
            value={dateFrom}
            onChange={(date) => date ? dispatch(setReportsDate(getUTCDate(date).startOfMonth, getUTCDate(date).endOfMonth)) : null}
            fullWidth
            views={['month']}
            format="MM/yyyy"
          />
        </Grid>
        {availableSwitchboards && availableSwitchboards.length > 0 ?
          <Grid item xs={12} md={3} lg={3}>
            <FormControl className={classes.select}>
              <InputLabel id="switchboard-select-label">{t('reportsPage.switchboardChoice')}</InputLabel>
              <Select
                fullWidth
                labelId="switchboard-select-label"
                id="switchboard-select"
                value={switchboard}
                onChange={handleSwitchboardChange}
              >
                {availableSwitchboards.map(switchboard => {
                  return <MenuItem key={switchboard} value={switchboard}>{switchboard}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          : null}
        {availableOutfeeds && outfeedAssetName && outfeedAssetID && availableOutfeeds.length > 0 ?
          <Grid item xs={12} md={3} lg={3}>
            <FormControl className={classes.select}>
              <InputLabel id="outfeed-select-label">{t('reportsPage.outfeedChoice')}</InputLabel>
              <Select
                fullWidth
                labelId="outfeed-select-label"
                id="outfeed-select"
                value={outfeedAssetID}
                onChange={handleOutfeedChange}
              >
                {availableOutfeeds.map(outfeed => {
                  return <MenuItem key={outfeed.assetID} value={outfeed.assetID}>{outfeed.name}</MenuItem>
                })}
              </Select>
            </FormControl>
          </Grid>
          : null}
        <Grid item xs={12} md={3} lg={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => exportPDF()}
          >
            {t('reportsPage.exportToPDF')}
          </Button>
        </Grid>
        {outfeedMonthlyAggregatedDataCurrentTable && outfeedMonthlyAggregatedDataTHDITable && outfeedAssetName ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{t('reportsPage.singleOutfeedParameters')} {outfeedAssetName}</Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography gutterBottom variant="body1">{t('reportsPage.voltageParametersTitle')}</Typography>
              <UniversalTable
                columns={outfeedMonthlyAggregatedDataCurrentTable.columns}
                rows={outfeedMonthlyAggregatedDataCurrentTable.rows}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography gutterBottom variant="body1">{t('reportsPage.voltageParametersTitle')}</Typography>
              <UniversalTable
                columns={outfeedMonthlyAggregatedDataTHDITable.columns}
                rows={outfeedMonthlyAggregatedDataTHDITable.rows}
              />
            </Grid>
          </React.Fragment>
          : null}
        {currentAndTHDChartData ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{t('reportsPage.currentFlows')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LineChart
                data={{
                  datasets: [{
                    label: `${t('reportsPage.maxCurrent')} L1`,
                    backgroundColor: decideDataColor(0),
                    borderColor: decideDataColor(0),
                    fill: false,
                    lineTension: 0,
                    data: currentAndTHDChartData.maxCurrentL1,
                    pointRadius: 0
                  },
                  {
                    label: `${t('reportsPage.maxCurrent')} L2`,
                    backgroundColor: decideDataColor(1),
                    borderColor: decideDataColor(1),
                    fill: false,
                    lineTension: 0,
                    data: currentAndTHDChartData.maxCurrentL2,
                    pointRadius: 0
                  },
                  {
                    label: `${t('reportsPage.maxCurrent')} L3`,
                    backgroundColor: decideDataColor(2),
                    borderColor: decideDataColor(2),
                    fill: false,
                    lineTension: 0,
                    data: currentAndTHDChartData.maxCurrentL3,
                    pointRadius: 0
                  },
                  {
                    label: `${t('reportsPage.avgCurrent')} L1`,
                    backgroundColor: decideDataColor(3),
                    borderColor: decideDataColor(3),
                    fill: false,
                    lineTension: 0,
                    data: currentAndTHDChartData.avgCurrentL1,
                    pointRadius: 0
                  },
                  {
                    label: `${t('reportsPage.avgCurrent')} L2`,
                    backgroundColor: decideDataColor(4),
                    borderColor: decideDataColor(4),
                    fill: false,
                    lineTension: 0,
                    data: currentAndTHDChartData.avgCurrentL2,
                    pointRadius: 0
                  },
                  {
                    label: `${t('reportsPage.avgCurrent')} L3`,
                    backgroundColor: decideDataColor(5),
                    borderColor: decideDataColor(5),
                    fill: false,
                    lineTension: 0,
                    data: currentAndTHDChartData.avgCurrentL3,
                    pointRadius: 0
                  }]
                }}
                xAxisTitle={t('chart.timeAxisLabel')}
                yAxisTitle={t('chart.valueAxisLabel')}
                timeInterval='day'
                tooltipFormat='PP'
                yAxisUnit='A'
              />
            </Grid>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{t('reportsPage.totalTHD')}</Typography>
            </Grid>
            <LineChart
              data={{
                datasets: [{
                  label: `${t('reportsPage.maximum')} THDI L1`,
                  backgroundColor: decideDataColor(0),
                  borderColor: decideDataColor(0),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.maxThdiL1,
                  pointRadius: 0
                },
                {
                  label: `${t('reportsPage.maximum')} THDI L2`,
                  backgroundColor: decideDataColor(1),
                  borderColor: decideDataColor(1),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.maxThdiL2,
                  pointRadius: 0
                },
                {
                  label: `${t('reportsPage.maximum')} THDI L3`,
                  backgroundColor: decideDataColor(2),
                  borderColor: decideDataColor(2),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.maxThdiL3,
                  pointRadius: 0
                },
                {
                  label: `${t('reportsPage.average')} THDI L1`,
                  backgroundColor: decideDataColor(3),
                  borderColor: decideDataColor(3),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.avgThdiL1,
                  pointRadius: 0
                },
                {
                  label: `${t('reportsPage.average')} THDI L2`,
                  backgroundColor: decideDataColor(4),
                  borderColor: decideDataColor(4),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.avgThdiL2,
                  pointRadius: 0
                },
                {
                  label: `${t('reportsPage.average')} THDI L3`,
                  backgroundColor: decideDataColor(5),
                  borderColor: decideDataColor(5),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.avgThdiL3,
                  pointRadius: 0
                }]
              }}
              xAxisTitle={t('chart.timeAxisLabel')}
              yAxisTitle={t('chart.valueAxisLabel')}
              timeInterval='day'
              tooltipFormat='PP'
              yAxisUnit='%'
            />
          </React.Fragment>
          : null}
      </Grid>
    </React.Fragment>
  )
}