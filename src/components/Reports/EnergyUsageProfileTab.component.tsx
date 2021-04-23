import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "@material-ui/pickers";
import { StackedBarChart } from '../StackedBarChart.component';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { fetchTimeseriesAggregates } from '../../services/FetchTimeseriesAggregatesAPI.service';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { IGroupStructure, IGroupElementStructure } from '../../reducers/Reports.reducer';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { getUTCDate } from '../../utilities/GetUTCDate.utility';
import { setBackdropOpen } from '../../actions/Backdrop.action';
import { setReportsDate } from '../../actions/Reports/CommonReports.action';
import { parseISO, format } from 'date-fns';
import { useStyles } from '../Reports.component';
import Divider from '@material-ui/core/Divider';
import { exportPDF } from '../../utilities/ExportPDF.utility';

export const EnergyUsageProfile = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const dateFrom = useSelector((state: RootState) => state.commonReports.dateFrom);
  const dateTo = useSelector((state: RootState) => state.commonReports.dateTo);
  const [level1, setLevel1] = useState<{
    xAxisLabels: Array<string> | null, //[...days of month]
    datasets: Array<{ label: string, data: Array<number>, backgroundColor: string }>
  }>()
  const [level2, setLevel2] = useState<{
    title: string | null,
    xAxisLabels: Array<string> | null, //[...days of month]
    datasets: Array<{ label: string, data: Array<number>, backgroundColor: string }> | null,
    groupIndex?: number
  }>()
  const [level3, setLevel3] = useState<{
    title: string | null,
    xAxisLabels: Array<string> | null, //[...days of month]
    datasets: Array<{ label: string, data: Array<number>, backgroundColor: string }> | null
  }>()
  const [assetsData, setAssetsData] = useState<{ [key: string]: any }>()
  const [energyType, setEnergyType] = useState('activeEnergyImport');
  const [level2DataSource, setLevel2DataSource] = useState<any>()
  const assetsNames = useSelector((state: RootState) => state.commonReports.assets);
  const reports = useSelector((state: RootState) => state.reports);
  const assetsDataRef: any = useRef();
  const assetsNamesRef: any = useRef();
  const level2DataSourceRef: any = useRef();
  const groupIndexRef: any = useRef();
  assetsDataRef.current = assetsData;
  assetsNamesRef.current = assetsNames;
  level2DataSourceRef.current = level2DataSource;
  groupIndexRef.current = level2;

  const handleEnergyType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEnergyType(event.target.value as string);
    setLevel2(undefined)
    setLevel3(undefined)
  };

  const handleDateChange = (date: Date) => {
    dispatch(setReportsDate(getUTCDate(date).startOfMonth, getUTCDate(date).endOfMonth))
    setLevel2(undefined)
    setLevel3(undefined)
  }

  const calculateAggregatedValue = useCallback((valueType: string, assetIDs: Array<string>) => {
    if (assetsDataRef.current) {
      const calculatedEnergy: Array<Array<any>> = assetIDs.map(assetID => {
        const values: Array<any> = Object.values(assetsDataRef.current[assetID])
        values.pop()
        return values.map((dailyValues: any) => {
          if (dailyValues.Active_Energy_Import !== undefined) {
            switch (valueType) {
              case 'activeEnergyImport': {
                return dailyValues.Active_Energy_Import.lastvalue - dailyValues.Active_Energy_Import.firstvalue
              }
              case 'reactiveEnergyImport': {
                return dailyValues.Reactive_Energy_Import.lastvalue - dailyValues.Reactive_Energy_Import.firstvalue
              }
              case 'reactiveEnergyExport': {
                return dailyValues.Reactive_Energy_Export.lastvalue - dailyValues.Reactive_Energy_Export.firstvalue
              }
            }
          }
          else {
            return 0
          }
          return 0
        })
      })
      // sum containing assets values to single value (day)
      const assetsDailySummation: Array<number> = calculatedEnergy.length > 0 ? calculatedEnergy.reduce((a, b) => {
        return a.map((v, i) => {
          return v + b[i];
        });
      }) : []
      return assetsDailySummation.map(el => parseFloat((el / 1000).toFixed(3)))
    }
    else {
      return []
    }
  }, [])

  const chooseByLanguage = useCallback((sentenceEN: string, sentencePL: string) => {
    return i18n.language === 'pl' ? sentencePL : sentenceEN
  }, [i18n.language])

  const getGroupOfGroupsAssetIDs = useCallback((groupObject: IGroupStructure | Array<IGroupStructure>, arr?: Array<string>) => {
    const array: Array<any> = arr || []
    if (Array.isArray(groupObject)) {
      //main group
      groupObject.forEach(group => getGroupOfGroupsAssetIDs(group, array))
    }
    else {
      //single group
      if (groupObject.subgroups) {
        groupObject.subgroups.forEach(subgroup => getGroupOfGroupsAssetIDs(subgroup, array))
      }
      else {
        if (groupObject.assets) {
          groupObject.assets.forEach(asset => array.push(asset.assetID))
        }
      }
    }
    return array
  }, [])
  
  useEffect(() => {
    if (assetsNames && Object.keys(assetsNames).length > 0) {
      const promises = Object.keys(assetsNames).map(asset => fetchTimeseriesAggregates(asset, 'DATA_1_MIN', 'day', 1, dateFrom, dateTo))
      dispatch(setBackdropOpen(true))
      Promise.all(promises).then(res => {
        let params = {}
        res.forEach(asset => {
          params = {
            ...params,
            [asset.assetID]: asset.data
          }
        })
        setAssetsData(params)
        dispatch(setBackdropOpen(false))
      })
    }
  }, [assetsNames, setAssetsData, dispatch, dateFrom, dateTo])

  const setChartComponentsBasedOnSelectedEnergyType = () => {
    switch (energyType) {
      case 'activeEnergyImport': {
        return {
          title: t('reportsPage.totalActiveEnergyImport'),
          yAxisUnit: 'kWh'
        }
      }
      case 'reactiveEnergyImport': {
        return {
          title: t('reportsPage.totalReactiveEnergyImport'),
          yAxisUnit: 'kvar'
        }
      }
      case 'reactiveEnergyExport': {
        return {
          title: t('reportsPage.totalReactiveEnergyExport'),
          yAxisUnit: 'kvar'
        }
      }
      default: {
        return {
          title: '',
          yAxisUnit: ''
        }
      }
    }
  }

  const calculateActiveEnergyImportSingleAsset = useCallback((valueType: string, asset: IGroupElementStructure) => {
    if (assetsDataRef.current && assetsDataRef.current[asset.assetID]) {
      const values: Array<any> = Object.values(assetsDataRef.current[asset.assetID])
      return values.map((dailyValues: any) => {
        if (dailyValues.Active_Energy_Import !== undefined) {
          switch (valueType) {
            case 'activeEnergyImport': {
              return (dailyValues.Active_Energy_Import.lastvalue - dailyValues.Active_Energy_Import.firstvalue) / 1000
            }
            case 'reactiveEnergyImport': {
              return (dailyValues.Reactive_Energy_Import.lastvalue - dailyValues.Reactive_Energy_Import.firstvalue) / 1000
            }
            case 'reactiveEnergyExport': {
              return (dailyValues.Reactive_Energy_Export.lastvalue - dailyValues.Reactive_Energy_Export.firstvalue) / 1000
            }
          }
        }
        else {
          return 0
        }
        return 0
      })
    }
    return []
  }, [])

  useEffect(() => {
    if (assetsDataRef.current && assetsNamesRef.current) {
      //instantiate first chart 
      const values = reports.groups.map(group => calculateAggregatedValue(energyType, getGroupOfGroupsAssetIDs(group)))
      const xLabels = Object.values(assetsDataRef.current).map((assetDailyData: any) => {
        return Object.values(assetDailyData).map((asset: any) => asset.starttime)
      })[0].filter(element => element !== undefined).map(date => `${format(parseISO(date), 'dd/MM/yyyy')}`)
      const datasets = reports.groups.map(group => chooseByLanguage(group.enName, group.plName)).map((group: string, index: number) => {
        return {
          label: group,
          data: values[index],
          backgroundColor: decideDataColor(index)
        }
      })
      setLevel1({
        xAxisLabels: xLabels,
        datasets: datasets
      })
    }
  }, [assetsData, chooseByLanguage, getGroupOfGroupsAssetIDs, reports.groups, energyType, calculateAggregatedValue])

  const createSubgroupsChart = useCallback((group: IGroupStructure | undefined, groupIndex: number, level: number) => {
    if (group?.subgroups) {
      const title = chooseByLanguage(group.enName, group.plName)
      const values = group.subgroups.map(subgroup => calculateAggregatedValue(energyType, getGroupOfGroupsAssetIDs(subgroup)))
      const xLabels = Object.values(assetsDataRef.current).map((assetDailyData: any) => {
        return Object.values(assetDailyData).map((asset: any) => asset.starttime)
      })[0].filter(element => element !== undefined).map(date => `${format(parseISO(date), 'dd/MM/yyyy')}`)
      const datasets = group.subgroups.map(subgroup => chooseByLanguage(subgroup.enName, subgroup.plName)).map((group: string, index: number) => {
        return {
          label: group,
          data: values[index],
          backgroundColor: decideDataColor(index)
        }
      }) // main groups
      switch (level) {
        case 2:
          setLevel2({ title: title, xAxisLabels: xLabels, datasets: datasets, groupIndex: groupIndex })
          setLevel3(undefined)
          break;
        case 3:
          setLevel3({ title: title, xAxisLabels: xLabels, datasets: datasets })
          break;
        default:
          return null;
      }
    }
  }, [calculateAggregatedValue, chooseByLanguage, getGroupOfGroupsAssetIDs, energyType])

  const createEndAssetsChart = useCallback((group: IGroupStructure | undefined, level: number) => {
    if (group?.assets) {
      const title = chooseByLanguage(group.enName, group.plName)
      const values = group.assets.map(asset => calculateActiveEnergyImportSingleAsset(energyType, asset))
      const xLabels = Object.values(assetsDataRef.current).map((assetDailyData: any) => {
        return Object.values(assetDailyData).map((asset: any) => asset.starttime)
      })[0].filter(element => element !== undefined).map(date => `${format(parseISO(date), 'dd/MM/yyyy')}`)
      const datasets = group.assets.map((asset, index) => {
        return {
          label: asset.feederDescription,
          data: values[index],
          backgroundColor: decideDataColor(index)
        }
      })
      switch (level) {
        case 2:
          setLevel2({ title: title, xAxisLabels: xLabels, datasets: datasets, groupIndex: undefined })
          setLevel3(undefined)
          break;
        case 3:
          setLevel3({ title: title, xAxisLabels: xLabels, datasets: datasets })
          break;
        default:
          return null;
      }
    }
  }, [calculateActiveEnergyImportSingleAsset, chooseByLanguage, energyType])

  const createNextLevelChart = useCallback((dataIndex: number, originLevel: number) => {
    if (originLevel === 1) {
      setLevel2DataSource(reports.groups[dataIndex])
      if (reports.groups[dataIndex].assets) {
        createEndAssetsChart(reports.groups[dataIndex], originLevel + 1)
      }
      else if (reports.groups[dataIndex].subgroups) {
        createSubgroupsChart(reports.groups[dataIndex], dataIndex, originLevel + 1)
      }
    }
    else {
      if (groupIndexRef.current.groupIndex !== undefined) {
        if (level2DataSourceRef.current?.assets) {
          createEndAssetsChart(level2DataSourceRef.current, originLevel + 1)
        }
        else {
          createEndAssetsChart(level2DataSourceRef.current.subgroups[dataIndex], originLevel + 1)
        }
      }
    }
  }, [createEndAssetsChart, createSubgroupsChart, reports.groups])

  const createChart = (title: string, xAxisLabels: Array<string>, datasets: Array<{ label: string, data: Array<number>, backgroundColor: string }>, originLevel: number) => {
    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.sectionMargin}>
          <Typography gutterBottom variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12}>
          <StackedBarChart
            onDataClick={(dataIndex) => createNextLevelChart(dataIndex, originLevel)}
            yAxisName={setChartComponentsBasedOnSelectedEnergyType().title}
            yAxisUnit={setChartComponentsBasedOnSelectedEnergyType().yAxisUnit}
            chartTitle=""
            data={{
              labels: xAxisLabels,
              datasets: datasets
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
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
        <Grid item xs={12} md={3} lg={3}>
          <FormControl className={classes.select}>
            <InputLabel id="energy-select-label">{t('reportsPage.energyChoice')}</InputLabel>
            <Select
              fullWidth
              labelId="energy-select-label"
              id="energy-select"
              value={energyType}
              onChange={handleEnergyType}
            >
              <MenuItem value={'activeEnergyImport'}>{t('reportsPage.activeEnergyImport')}</MenuItem>
              <MenuItem value={'reactiveEnergyImport'}>{t('reportsPage.reactiveEnergyImport')}</MenuItem>
              <MenuItem value={'reactiveEnergyExport'}>{t('reportsPage.reactiveEnergyExport')}</MenuItem>
            </Select>
          </FormControl>
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
        {level1 && level1.xAxisLabels && level1.datasets ?
          createChart(setChartComponentsBasedOnSelectedEnergyType().title, level1.xAxisLabels, level1.datasets, 1)
          : null}
        {level2 && level2.title && level2.xAxisLabels && level2.datasets ?
          createChart(level2.title, level2.xAxisLabels, level2.datasets, 2)
          : null}
        {level3 && level3.title && level3.xAxisLabels && level3.datasets ?
          createChart(level3.title, level3.xAxisLabels, level3.datasets, 3)
          : null}
      </Grid>
    </React.Fragment>
  )
}