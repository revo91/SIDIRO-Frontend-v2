import React, { useEffect, useState } from 'react';
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
  Voltage_L3_N: IAggregatedParameterValues
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
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
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

  useEffect(() => {
    if (transformer !== '') {
      fetchTimeseriesAggregates(transformer, 'DATA_1_MIN', 'month', 1, dateFrom, dateTo).then(res => {
        setTransformerAggregatedData(res)
      })
    }
  }, [transformer, dateFrom, dateTo, setTransformerAggregatedData])

  useEffect(() => {
    if (transformerAggregatedData) {
      const columnsVoltageTable = [t('reportsPage.genericParameterTitle'), t('reportsPage.averageValue'), t('reportsPage.maxValue'), t('reportsPage.minValue')]
      const rowsVoltageTable = [
        [t('deviceDataDialog.voltageL1N'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_N.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_N.maxvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L2_N.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_N.minvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L2_N.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        [t('deviceDataDialog.voltageL2N'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_N.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_N.maxvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L2_N.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_N.minvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L2_N.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        [t('deviceDataDialog.voltageL3N'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_N.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_N.maxvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L3_N.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_N.minvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L3_N.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        [t('deviceDataDialog.voltageL1L2'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_L2.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_L2.maxvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L1_L2.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L1_L2.minvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L1_L2.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        [t('deviceDataDialog.voltageL1L2'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_L3.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_L3.maxvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L2_L3.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L2_L3.minvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L2_L3.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        [t('deviceDataDialog.voltageL3L1'),
        setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_L1.average), 'V'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_L1.maxvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L3_L1.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Voltage_L3_L1.minvalue), 'V')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Voltage_L3_L1.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        ['THDU L1',
          setValueUnit(setPrecision(transformerAggregatedData.THD_U_L1.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L1.maxvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_U_L1.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L1.minvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_U_L1.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        ['THDU L2',
          setValueUnit(setPrecision(transformerAggregatedData.THD_U_L2.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L2.maxvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_U_L2.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L2.minvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_U_L2.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        ['THDU L3',
          setValueUnit(setPrecision(transformerAggregatedData.THD_U_L3.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L3.maxvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_U_L3.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_U_L3.minvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_U_L3.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ]
      ]

      const columnsCurrentTable = columnsVoltageTable
      const rowsCurrentTable = [
        [`${t('deviceDataDialog.current')} L1`,
        setValueUnit(setPrecision(transformerAggregatedData.Current_L1.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L1.maxvalue), 'A')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Current_L1.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L1.minvalue), 'A')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Current_L1.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        [`${t('deviceDataDialog.current')} L2`,
        setValueUnit(setPrecision(transformerAggregatedData.Current_L2.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L2.maxvalue), 'A')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Current_L2.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L2.minvalue), 'A')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Current_L2.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        [`${t('deviceDataDialog.current')} L3`,
        setValueUnit(setPrecision(transformerAggregatedData.Current_L3.average), 'A'),
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L3.maxvalue), 'A')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Current_L3.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
        <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.Current_L3.minvalue), 'A')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.Current_L3.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        ['THDI L1',
          setValueUnit(setPrecision(transformerAggregatedData.THD_I_L1.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L1.maxvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_I_L1.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L1.minvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_I_L1.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        ['THDI L2',
          setValueUnit(setPrecision(transformerAggregatedData.THD_I_L2.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L2.maxvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_I_L2.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L2.minvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_I_L2.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ],
        ['THDI L3',
          setValueUnit(setPrecision(transformerAggregatedData.THD_I_L3.average), '%'),
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L3.maxvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_I_L3.maxtime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>,
          <React.Fragment><p>{setValueUnit(setPrecision(transformerAggregatedData.THD_I_L3.minvalue), '%')}</p><p className={classes.smallerFont}>{format(parseISO(transformerAggregatedData.THD_I_L3.mintime), 'dd/MM/yyyy, HH:mm')}</p></React.Fragment>
        ]
      ]
      setTransformerCurrentTableData({ rows: rowsCurrentTable, columns: columnsCurrentTable })
      setTransformerVoltageTableData({ rows: rowsVoltageTable, columns: columnsVoltageTable })
    }
  }, [transformerAggregatedData, t, classes.smallerFont, setTransformerVoltageTableData])

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
        <Grid item xs={12} md={3} lg={3}>
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
                  return <MenuItem value={transformer.breaker.assetID}>{transformer.tableName}</MenuItem>
                })}
              </Select>
            </FormControl>
            : null}
        </Grid>
        <Grid item xs={12} md={2} lg={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => exportPDF()}
          >
            {t('reportsPage.exportToPDF')}
          </Button>
        </Grid>
        <Grid item xs={12} md={2} lg={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
          >
            {t('reportsPage.exportToCSV')}
          </Button>
        </Grid>
        {availableTransformers ?
          <Grid item xs={12} className={classes.sectionMargin}>
            <Typography gutterBottom variant="h5">{`${t('reportsPage.powerSupplyFrom')} ${availableTransformers.find(tr => tr.breaker.assetID === transformer)?.tableName}` || ''}</Typography>
          </Grid>
          : null}
        {transformerVoltageTableData ?
          <Grid item xs={12} lg={6}>
            <Typography gutterBottom variant="body1">{t('reportsPage.voltageParametersTitle')}</Typography>
            <UniversalTable
              columns={transformerVoltageTableData.columns}
              rows={transformerVoltageTableData.rows}
            />
          </Grid>
          : null}
        {transformerCurrentTableData ?
          <Grid item xs={12} lg={6}>
            <Typography gutterBottom variant="body1">{t('reportsPage.currentParametersTitle')}</Typography>
            <UniversalTable
              columns={transformerCurrentTableData.columns}
              rows={transformerCurrentTableData.rows}
            />
          </Grid>
          : null}
      </Grid>
    </React.Fragment >
  )
}