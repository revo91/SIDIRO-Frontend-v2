import React, { useEffect, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "@material-ui/pickers";
import { useTranslation } from 'react-i18next';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { exportPDF } from '../../utilities/ExportPDF.utility';
import { RootState } from '../../reducers/Root.reducer';
import { setReportsDate } from '../../actions/Reports/CommonReports.action';
import { getUTCDate } from '../../utilities/GetUTCDate.utility';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useStyles } from '../Reports.component';
import { fetchTimeseriesAggregates } from '../../services/FetchTimeseriesAggregatesAPI.service';
import { UniversalTable } from '../UniversalTable.component';
import { parseISO, format } from 'date-fns';
import Typography from '@material-ui/core/Typography';
import { LineChart } from '../LineChart.component';
import { powerFactorCalculator } from '../../utilities/PowerFactorCalculator.utility';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { setBackdropOpen } from '../../actions/Backdrop.action';
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

interface ITransformerAggregatedValues {
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

interface ITransformer15MinAggregatedValues {
  Active_Power_Export: IAggregatedParameterValues
  Active_Power_Import: IAggregatedParameterValues
  Reactive_Power_Export: IAggregatedParameterValues
  Reactive_Power_Import: IAggregatedParameterValues
  endtime: string
  starttime: string
}

export const InfeedParametersTab = () => {
  const [availableTransformers, setAvailableTransformers] = useState<Array<{
    name: string,
    tableName: string,
    type: string,
    breaker: {
      name: string,
      type: string,
      assetID: string,
      state?: number | undefined,
      tableName?: string | undefined
    }
  }>>()
  const [transformer, setTransformer] = useState('');
  const dateFrom = useSelector((state: RootState) => state.commonReports.dateFrom);
  const dateTo = useSelector((state: RootState) => state.commonReports.dateTo);
  const overview = useSelector((state: RootState) => state.overview);
  const [transformerAggregatedData, setTransformerAggregatedData] = useState<ITransformerAggregatedValues>()
  const [transformerVoltageTableData, setTransformerVoltageTableData] = useState<{ rows: Array<Array<number | string | React.ReactNode>>, columns: Array<string> }>()
  const [transformerCurrentTableData, setTransformerCurrentTableData] = useState<{ rows: Array<Array<number | string | React.ReactNode>>, columns: Array<string> }>()
  const [monthly15minData, setMonthly15minData] = useState<Array<ITransformer15MinAggregatedValues>>()
  const [monthly1minData, setMonthly1minData] = useState<Array<ITransformerAggregatedValues>>()
  const [powerFactorChartData, setPowerFactorChartData] = useState<{ importPFData: Array<{ x: number, y: number }>, exportPFData: Array<{ x: number, y: number }> }>()
  const [currentAndTHDChartData, setCurrentAndTHDChartData] = useState<{
    maxCurrentL1: Array<{ x: number, y: number }>,
    maxCurrentL2: Array<{ x: number, y: number }>,
    maxCurrentL3: Array<{ x: number, y: number }>,
    avgCurrentL1: Array<{ x: number, y: number }>,
    avgCurrentL2: Array<{ x: number, y: number }>,
    avgCurrentL3: Array<{ x: number, y: number }>,
    thdiL1: Array<{ x: number, y: number }>,
    thdiL2: Array<{ x: number, y: number }>,
    thdiL3: Array<{ x: number, y: number }>,
    thduL1: Array<{ x: number, y: number }>,
    thduL2: Array<{ x: number, y: number }>,
    thduL3: Array<{ x: number, y: number }>
  }>()
  const [directOutfeeds, setDirectOutfeeds] = useState<Array<{ assetID: string, assetName: string }>>()
  const [dialogData, setDialogData] = useState<{
    deviceName: string,
    deviceType: string,
    breakerName: string,
    breakerType: string,
    sectionName: string,
    assetID: string,
    switchboardAssetID: string
  }>()
  const [directOutfeeds1MinData, setDirectOutfeeds1MinData] = useState<Array<{ assetID: string, assetName: string, data: Array<ITransformerAggregatedValues> }>>()
  const [directOutfeedsTHDChartDataL1, setDirectOutfeedsTHDChartDataL1] = useState<Array<{
    outfeedName: string, data: Array<{
      x: number,
      y: number
    }>
  }>>()
  const [directOutfeedsTHDChartDataL2, setDirectOutfeedsTHDChartDataL2] = useState<Array<{
    outfeedName: string, data: Array<{
      x: number,
      y: number
    }>
  }>>()
  const [directOutfeedsTHDChartDataL3, setDirectOutfeedsTHDChartDataL3] = useState<Array<{
    outfeedName: string, data: Array<{
      x: number,
      y: number
    }>
  }>>()
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  const buttonOnClickOpenDialog = useCallback((date: string, tabIndex: number) => {
    if (dialogData) {
      dispatch(setDeviceDataDialogDateFrom(new Date(date)))
      dispatch(setUniversalTabsNameIndex('TransformerDeviceDetails', tabIndex)) // (name, value)
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

  useEffect(() => { //GATHER TRANSFORMERS AVAILABLE
    const transformers: any = []
    overview.diagrams.forEach(diagram => {
      diagram.sections.forEach(section => {
        if (section.infeeds) {
          section.infeeds.forEach(infeed => {
            if (infeed.type === 'transformer') {
              transformers.push(infeed)
            }
          })
        }
      })
    })
    setAvailableTransformers(transformers)
    if (transformers.length > 0) {
      setTransformer(transformers[0].breaker.assetID)
    }
  }, [overview.diagrams, setAvailableTransformers])

  useEffect(() => { // FETCH AGGREGATED PSU DATA
    if (transformer !== '') {
      dispatch(setBackdropOpen(true))
      fetchTimeseriesAggregates(transformer, 'DATA_1_MIN', 'month', 1, dateFrom, dateTo).then(res => {
        dispatch(setBackdropOpen(false))
        setTransformerAggregatedData(res)
      }).catch(err => dispatch(setBackdropOpen(false)))
    }
  }, [transformer, dateFrom, dateTo, setTransformerAggregatedData, dispatch])

  useEffect(() => { //VOLTAGE AND CURRENT TABLES INITIALIZATION
    if (transformerAggregatedData && dialogData && transformerAggregatedData.Voltage_L1_N) {
      const columnsVoltageTable = [t('reportsPage.genericParameterTitle'), t('reportsPage.averageValue'), t('reportsPage.maxValue'), t('reportsPage.minValue')]
      const rowsVoltageTable = [
        [t('deviceDataDialog.voltageL1N'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_N.average), 'V'),
        <React.Fragment>
          <p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_N.maxvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L1_N.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L1_N.maxtime, 1)}
        </React.Fragment>,
        <React.Fragment>
          <p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_N.minvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L1_N.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L1_N.mintime, 1)}
        </React.Fragment>
        ],
        [t('deviceDataDialog.voltageL2N'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_N.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_N.maxvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L2_N.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L2_N.maxtime, 1)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_N.minvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L2_N.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L2_N.mintime, 1)}
        </React.Fragment>
        ],
        [t('deviceDataDialog.voltageL3N'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_N.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_N.maxvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L3_N.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L3_N.maxtime, 1)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_N.minvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L3_N.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L3_N.mintime, 1)}
        </React.Fragment>
        ],
        [t('deviceDataDialog.voltageL1L2'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_L2.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_L2.maxvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L1_L2.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L1_L2.maxtime, 2)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_L2.minvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L1_L2.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L1_L2.mintime, 2)}
        </React.Fragment>
        ],
        [t('deviceDataDialog.voltageL1L2'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_L3.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_L3.maxvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L2_L3.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L2_L3.maxtime, 2)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_L3.minvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L2_L3.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L2_L3.mintime, 2)}
        </React.Fragment>
        ],
        [t('deviceDataDialog.voltageL3L1'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_L1.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_L1.maxvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L3_L1.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L3_L1.maxtime, 2)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_L1.minvalue), 'V')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Voltage_L3_L1.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Voltage_L3_L1.mintime, 2)}
        </React.Fragment>
        ],
        ['THDU L1',
          setValueUnit(setPrecision(transformerAggregatedData.THD_U_L1.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L1.maxvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_U_L1.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_U_L1.maxtime, 5)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L1.minvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_U_L1.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_U_L1.mintime, 5)}
          </React.Fragment>
        ],
        ['THDU L2',
          setValueUnit(setPrecision(transformerAggregatedData.THD_U_L2.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L2.maxvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_U_L2.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_U_L2.maxtime, 5)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L2.minvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_U_L2.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_U_L2.mintime, 5)}
          </React.Fragment>
        ],
        ['THDU L3',
          setValueUnit(setPrecision(transformerAggregatedData.THD_U_L3.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L3.maxvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_U_L3.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_U_L3.maxtime, 5)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L3.minvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_U_L3.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_U_L3.mintime, 5)}
          </React.Fragment>
        ]
      ]

      const columnsCurrentTable = columnsVoltageTable
      const rowsCurrentTable = [
        [`${t('deviceDataDialog.current')} L1`,
        setValueUnit(setPrecision(transformerAggregatedData.Current_L1.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L1.maxvalue), 'A')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Current_L1.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Current_L1.maxtime, 3)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L1.minvalue), 'A')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Current_L1.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Current_L1.mintime, 3)}
        </React.Fragment>
        ],
        [`${t('deviceDataDialog.current')} L2`,
        setValueUnit(setPrecision(transformerAggregatedData.Current_L2.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L2.maxvalue), 'A')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Current_L2.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Current_L2.maxtime, 3)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L2.minvalue), 'A')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Current_L2.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Current_L2.mintime, 3)}
        </React.Fragment>
        ],
        [`${t('deviceDataDialog.current')} L3`,
        setValueUnit(setPrecision(transformerAggregatedData.Current_L3.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L3.maxvalue), 'A')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Current_L3.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Current_L3.maxtime, 3)}
        </React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L3.minvalue), 'A')}</p>
          {renderButton(format(parseISO(transformerAggregatedData.Current_L3.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.Current_L3.mintime, 3)}
        </React.Fragment>
        ],
        ['THDI L1',
          setValueUnit(setPrecision(transformerAggregatedData.THD_I_L1.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L1.maxvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_I_L1.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_I_L1.maxtime, 6)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L1.minvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_I_L1.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_I_L1.mintime, 6)}
          </React.Fragment>
        ],
        ['THDI L2',
          setValueUnit(setPrecision(transformerAggregatedData.THD_I_L2.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L2.maxvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_I_L2.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_I_L2.maxtime, 6)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L2.minvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_I_L2.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_I_L2.mintime, 6)}
          </React.Fragment>
        ],
        ['THDI L3',
          setValueUnit(setPrecision(transformerAggregatedData.THD_I_L3.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L3.maxvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_I_L3.maxtime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_I_L3.maxtime, 6)}
          </React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L3.minvalue), '%')}</p>
            {renderButton(format(parseISO(transformerAggregatedData.THD_I_L3.mintime), 'dd/MM/yyyy, HH:mm'), transformerAggregatedData.THD_I_L3.mintime, 6)}
          </React.Fragment>
        ]
      ]
      setTransformerCurrentTableData({ rows: rowsCurrentTable, columns: columnsCurrentTable })
      setTransformerVoltageTableData({ rows: rowsVoltageTable, columns: columnsVoltageTable })
    }
    else {
      setTransformerCurrentTableData(undefined)
      setTransformerVoltageTableData(undefined)
    }
  }, [transformerAggregatedData, t, classes.smallerFont, setTransformerVoltageTableData, dialogData, renderButton])

  useEffect(() => { //FETCH MONTHLY DATA_15_MIN AGGREGATED BY 1 DAY FOR CHARTS
    if (transformer !== '') {
      dispatch(setBackdropOpen(true))
      fetchTimeseriesAggregates(transformer, 'DATA_15_MIN', 'day', 1, dateFrom, dateTo).then(res => {
        dispatch(setBackdropOpen(false))
        if (res.data && res.data.length > 0) {
          setMonthly15minData(res.data)
        }
      }).catch(err => dispatch(setBackdropOpen(false)))
    }
  }, [dateFrom, dateTo, transformer, dispatch])

  useEffect(() => { //SET POWER FACTOR CHART DATA
    if (monthly15minData) {
      const importPowerFactorData = monthly15minData.map(dailyValue => {
        if (dailyValue.Active_Power_Import && dailyValue.Reactive_Power_Import) {
          return {
            x: new Date(dailyValue.starttime).valueOf(),
            y: powerFactorCalculator(dailyValue.Active_Power_Import.average, dailyValue.Reactive_Power_Import.average)
          }
        }
        else {
          return {
            x: new Date(dailyValue.starttime).valueOf(),
            y: 0
          }
        }
      })
      const exportPowerFactorData = monthly15minData.map(dailyValue => {
        if (dailyValue.Active_Power_Export && dailyValue.Reactive_Power_Export) {
          return {
            x: new Date(dailyValue.starttime).valueOf(),
            y: powerFactorCalculator(dailyValue.Active_Power_Export.average, dailyValue.Reactive_Power_Export.average)
          }
        }
        else {
          return {
            x: new Date(dailyValue.starttime).valueOf(),
            y: 0
          }
        }
      })
      setPowerFactorChartData({ importPFData: importPowerFactorData, exportPFData: exportPowerFactorData })
    }
  }, [monthly15minData])

  useEffect(() => { //FETCH MONTHLY DATA_1_MIN AGGREGATED BY 1 CHART DATA
    if (transformer !== '') {
      dispatch(setBackdropOpen(true))
      fetchTimeseriesAggregates(transformer, 'DATA_1_MIN', 'day', 1, dateFrom, dateTo).then(res => {
        dispatch(setBackdropOpen(false))
        if (res.data && res.data.length > 0) {
          setMonthly1minData(res.data)
        }
      }).catch(err => dispatch(setBackdropOpen(false)))
    }
  }, [dateFrom, dateTo, transformer, dispatch])

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
          thdiL1: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_I_L1 ? parseFloat((dailyValue.THD_I_L1.average).toFixed(3)) : 0
          },
          thdiL2: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_I_L2 ? parseFloat((dailyValue.THD_I_L2.average).toFixed(3)) : 0
          },
          thdiL3: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_I_L3 ? parseFloat((dailyValue.THD_I_L3.average).toFixed(3)) : 0
          },
          thduL1: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_U_L1 ? parseFloat((dailyValue.THD_U_L1.average).toFixed(3)) : 0
          },
          thduL2: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_U_L2 ? parseFloat((dailyValue.THD_U_L2.average).toFixed(3)) : 0
          },
          thduL3: {
            x: new Date(dailyValue.starttime).valueOf(),
            y: dailyValue.THD_U_L3 ? parseFloat((dailyValue.THD_U_L3.average).toFixed(3)) : 0
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
        thdiL1: datasets.map(el => el.thdiL1),
        thdiL2: datasets.map(el => el.thdiL2),
        thdiL3: datasets.map(el => el.thdiL3),
        thduL1: datasets.map(el => el.thduL1),
        thduL2: datasets.map(el => el.thduL2),
        thduL3: datasets.map(el => el.thduL3),
      })
    }
  }, [monthly1minData, setCurrentAndTHDChartData])

  useEffect(() => { // GATHER DIRECT OUTFEEDS BELONGING TO SELECTED INFEED
    if (transformer !== '') {
      let trDiagramIndex = null
      let trSectionIndex = null
      let trInfeedIndex = null
      overview.diagrams.forEach((diagram, diagramIndex: number) => {
        diagram.sections.forEach((section, sectionIndex: number) => {
          if (section.infeeds) {
            section.infeeds.forEach((infeed, infeedIndex: number) => {
              if (infeed.breaker.assetID === transformer) {
                trDiagramIndex = diagramIndex;
                trSectionIndex = sectionIndex;
                trInfeedIndex = infeedIndex;
              }
            })
          }
        })
      })
      if (trDiagramIndex !== null && trSectionIndex !== null && trInfeedIndex !== null) {
        const infeedDirectOutfeeds: Array<{ assetID: string, assetName: string }> = []
        overview.diagrams[trDiagramIndex].sections.forEach(section => {
          if (section.breakers) {
            section.breakers.forEach(breaker => {
              infeedDirectOutfeeds.push({
                assetID: breaker.assetID,
                assetName: breaker.tableName
              })
            })
          }
        })
        setDirectOutfeeds(infeedDirectOutfeeds)
      }
    }
  }, [transformer, overview.diagrams, setDirectOutfeeds])

  useEffect(() => { // SET SELECTED TRANSFORMER DIALOG DATA
    if (transformer !== '') {
      let trDiagramIndex = null
      let trSectionIndex = null
      let trInfeedIndex = null
      overview.diagrams.forEach((diagram, diagramIndex: number) => {
        diagram.sections.forEach((section, sectionIndex: number) => {
          if (section.infeeds) {
            section.infeeds.forEach((infeed, infeedIndex: number) => {
              if (infeed.breaker.assetID === transformer) {
                trDiagramIndex = diagramIndex;
                trSectionIndex = sectionIndex;
                trInfeedIndex = infeedIndex;
              }
            })
          }
        })
      })
      if (trDiagramIndex !== null && trSectionIndex !== null && trInfeedIndex !== null) {
        setDialogData({
          deviceName: overview.diagrams[trDiagramIndex].sections[trSectionIndex]?.infeeds?.[trInfeedIndex].tableName || '',
          deviceType: overview.diagrams[trDiagramIndex].sections[trSectionIndex]?.infeeds?.[trInfeedIndex].type || '',
          breakerName: overview.diagrams[trDiagramIndex].sections[trSectionIndex]?.infeeds?.[trInfeedIndex].breaker.name || '',
          breakerType: overview.diagrams[trDiagramIndex].sections[trSectionIndex]?.infeeds?.[trInfeedIndex].breaker.type || '',
          sectionName: `${t('deviceDataDialog.section')} ${overview.diagrams[trDiagramIndex].sections[trSectionIndex].name}`,
          assetID: overview.diagrams[trDiagramIndex].sections[trSectionIndex]?.infeeds?.[trInfeedIndex].breaker.assetID || '',
          switchboardAssetID: overview.diagrams[trDiagramIndex].assetID || ''
        })
      }
    }
  }, [transformer, overview.diagrams, setDialogData, t])

  useEffect(() => { //  FETCH DIRECT OUTFEEDS 1 MIN DATA FOR THD CHARTS
    if (directOutfeeds && directOutfeeds.length > 0) {
      const promises = directOutfeeds.map(outfeed => {
        return fetchTimeseriesAggregates(outfeed.assetID, 'DATA_1_MIN', 'day', 1, dateFrom, dateTo)
      })
      Promise.all(promises).then(res => {
        const withNames = res.map((asset, index: number) => {
          return {
            ...asset,
            assetName: directOutfeeds[index].assetName
          }
        })
        setDirectOutfeeds1MinData(withNames)
      }).catch(err => dispatch(setBackdropOpen(false)))
    }
  }, [directOutfeeds, dateFrom, dateTo, setDirectOutfeeds1MinData, dispatch])

  useEffect(() => {
    if (directOutfeeds1MinData && directOutfeeds1MinData.length > 0) {
      const datasetsL1: Array<{
        outfeedName: string, data: Array<{
          x: number,
          y: number
        }>
      }> = []
      const datasetsL2: Array<{
        outfeedName: string, data: Array<{
          x: number,
          y: number
        }>
      }> = []
      const datasetsL3: Array<{
        outfeedName: string, data: Array<{
          x: number,
          y: number
        }>
      }> = []
      directOutfeeds1MinData.forEach(outfeed => {
        datasetsL1.push({
          outfeedName: outfeed.assetName,
          data: outfeed.data.map(outfeedData => {
            return {
              x: new Date(outfeedData.starttime).valueOf(),
              y: outfeedData.THD_I_L1 ? parseFloat((outfeedData.THD_I_L1.average).toFixed(3)) : 0
            }
          })
        })
        datasetsL2.push({
          outfeedName: outfeed.assetName,
          data: outfeed.data.map(outfeedData => {
            return {
              x: new Date(outfeedData.starttime).valueOf(),
              y: outfeedData.THD_I_L2 ? parseFloat((outfeedData.THD_I_L2.average).toFixed(3)) : 0
            }
          })
        })
        datasetsL3.push({
          outfeedName: outfeed.assetName,
          data: outfeed.data.map(outfeedData => {
            return {
              x: new Date(outfeedData.starttime).valueOf(),
              y: outfeedData.THD_I_L3 ? parseFloat((outfeedData.THD_I_L3.average).toFixed(3)) : 0
            }
          })
        })
      })
      setDirectOutfeedsTHDChartDataL1(datasetsL1)
      setDirectOutfeedsTHDChartDataL2(datasetsL2)
      setDirectOutfeedsTHDChartDataL3(datasetsL3)
    }
  }, [directOutfeeds1MinData, setDirectOutfeedsTHDChartDataL1, setDirectOutfeedsTHDChartDataL2, setDirectOutfeedsTHDChartDataL3])

  const setPrecision = (value: number) => {
    return parseFloat(value.toFixed(3))
  }

  const setValueUnit = (value: number, unit: string) => {
    return `${value} ${unit}`
  }

  const handleTransformerChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setTransformer(event.target.value as string);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
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
        <Grid item xs={12} md={4} lg={4}>
          {availableTransformers && availableTransformers.length > 0 ?
            <FormControl className={classes.select}>
              <InputLabel id="transformer-select-label">{t('reportsPage.transformerChoice')}</InputLabel>
              <Select
                fullWidth
                labelId="transformer-select-label"
                id="transformer-select"
                value={transformer}
                onChange={handleTransformerChange}
              >
                {availableTransformers.map(transformer => {
                  return <MenuItem key={transformer.breaker.assetID} value={transformer.breaker.assetID}>{transformer.tableName}</MenuItem>
                })}
              </Select>
            </FormControl>
            : null}
        </Grid>
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
        {availableTransformers && transformerVoltageTableData && transformerCurrentTableData ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{`${t('reportsPage.powerSupplyFrom')} ${availableTransformers.find(tr => tr.breaker.assetID === transformer)?.tableName}` || ''}</Typography>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography gutterBottom variant="body1">{t('reportsPage.voltageParametersTitle')}</Typography>
              <UniversalTable
                columns={transformerVoltageTableData.columns}
                rows={transformerVoltageTableData.rows}
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <Typography gutterBottom variant="body1">{t('reportsPage.currentParametersTitle')}</Typography>
              <UniversalTable
                columns={transformerCurrentTableData.columns}
                rows={transformerCurrentTableData.rows}
              />
            </Grid>
          </React.Fragment>
          : null}
        {powerFactorChartData ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{t('reportsPage.powerFactorChartTitle')}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LineChart
                data={{
                  datasets: [{
                    label: t('reportsPage.reactiveImportPowerFactor'),
                    backgroundColor: decideDataColor(0),
                    borderColor: decideDataColor(0),
                    fill: false,
                    lineTension: 0,
                    data: powerFactorChartData.importPFData,
                    pointRadius: 0
                  },
                  {
                    label: t('reportsPage.reactiveExportPowerFactor'),
                    backgroundColor: decideDataColor(1),
                    borderColor: decideDataColor(1),
                    fill: false,
                    lineTension: 0,
                    data: powerFactorChartData.exportPFData,
                    pointRadius: 0
                  }]
                }}
                xAxisTitle={t('chart.timeAxisLabel')}
                yAxisTitle={t('chart.valueAxisLabel')}
                timeInterval='day'
                tooltipFormat='PP'
                yAxisUnit=''
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
                  label: `THDI L1`,
                  backgroundColor: decideDataColor(0),
                  borderColor: decideDataColor(0),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.thdiL1,
                  pointRadius: 0
                },
                {
                  label: `THDI L2`,
                  backgroundColor: decideDataColor(1),
                  borderColor: decideDataColor(1),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.thdiL2,
                  pointRadius: 0
                },
                {
                  label: `THDI L3`,
                  backgroundColor: decideDataColor(2),
                  borderColor: decideDataColor(2),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.thdiL3,
                  pointRadius: 0
                },
                {
                  label: `THDU L1`,
                  backgroundColor: decideDataColor(3),
                  borderColor: decideDataColor(3),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.thduL1,
                  pointRadius: 0
                },
                {
                  label: `THDU L2`,
                  backgroundColor: decideDataColor(4),
                  borderColor: decideDataColor(4),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.thduL2,
                  pointRadius: 0
                },
                {
                  label: `THDU L3`,
                  backgroundColor: decideDataColor(5),
                  borderColor: decideDataColor(5),
                  fill: false,
                  lineTension: 0,
                  data: currentAndTHDChartData.thduL3,
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
        {directOutfeedsTHDChartDataL1 ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{`${t('reportsPage.currentTHDInPhase')} L1`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LineChart
                data={{
                  datasets: directOutfeedsTHDChartDataL1.map((dataset, index: number) => {
                    return {
                      label: dataset.outfeedName,
                      backgroundColor: decideDataColor(index),
                      borderColor: decideDataColor(index),
                      fill: false,
                      lineTension: 0,
                      data: dataset.data,
                      pointRadius: 0
                    }
                  })
                }}
                xAxisTitle={t('chart.timeAxisLabel')}
                yAxisTitle={t('chart.valueAxisLabel')}
                timeInterval='day'
                tooltipFormat='PP'
                yAxisUnit='%'
              />
            </Grid>
          </React.Fragment>
          : null}
        {directOutfeedsTHDChartDataL2 ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{`${t('reportsPage.currentTHDInPhase')} L2`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LineChart
                data={{
                  datasets: directOutfeedsTHDChartDataL2.map((dataset, index: number) => {
                    return {
                      label: dataset.outfeedName,
                      backgroundColor: decideDataColor(index),
                      borderColor: decideDataColor(index),
                      fill: false,
                      lineTension: 0,
                      data: dataset.data,
                      pointRadius: 0
                    }
                  })
                }}
                xAxisTitle={t('chart.timeAxisLabel')}
                yAxisTitle={t('chart.valueAxisLabel')}
                timeInterval='day'
                tooltipFormat='PP'
                yAxisUnit='%'
              />
            </Grid>
          </React.Fragment>
          : null}
        {directOutfeedsTHDChartDataL3 ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{`${t('reportsPage.currentTHDInPhase')} L3`}</Typography>
            </Grid>
            <Grid item xs={12}>
              <LineChart
                data={{
                  datasets: directOutfeedsTHDChartDataL3.map((dataset, index: number) => {
                    return {
                      label: dataset.outfeedName,
                      backgroundColor: decideDataColor(index),
                      borderColor: decideDataColor(index),
                      fill: false,
                      lineTension: 0,
                      data: dataset.data,
                      pointRadius: 0
                    }
                  })
                }}
                xAxisTitle={t('chart.timeAxisLabel')}
                yAxisTitle={t('chart.valueAxisLabel')}
                timeInterval='day'
                tooltipFormat='PP'
                yAxisUnit='%'
              />
            </Grid>
          </React.Fragment>
          : null}
      </Grid>
    </React.Fragment >
  )
}