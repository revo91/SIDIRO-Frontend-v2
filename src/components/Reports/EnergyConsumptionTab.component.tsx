import React, { useState, useEffect, useCallback, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "@material-ui/pickers";
import { exportPDF } from '../../utilities/ExportPDF.utility';
import Button from '@material-ui/core/Button';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { IGroupStructure, IGroupElementStructure } from '../../reducers/Reports.reducer';
import { UniversalTable } from '../UniversalTable.component';
import { PieChart } from '../PieChart.component';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { fetchTimeseriesAggregates } from '../../services/FetchTimeseriesAggregatesAPI.service';
import { setBackdropOpen } from '../../actions/Backdrop.action';
import { setReportsDate } from '../../actions/Reports/CommonReports.action';
import { getUTCDate } from '../../utilities/GetUTCDate.utility';
import { useStyles } from '../Reports.component';

export const EnergyConsumptionTab = () => {
  const [assetsData, setAssetsData] = useState<{ [key: string]: any }>()
  const reports = useSelector((state: RootState) => state.reports);
  const [level1, setLevel1] = useState<{
    title: string | null,
    labels: Array<string> | null
    values: Array<number> | null
  }>()
  const [level2, setLevel2] = useState<{
    title: string | null,
    labels: Array<string> | null
    values: Array<number> | null,
    groupIndex?: number
  }>()
  const [level3, setLevel3] = useState<{
    title: string | null,
    labels: Array<string> | null
    values: Array<number> | null
  }>()
  const [referenceToCurrentChartForScrolling, setReferenceToCurrentChartForScrolling] = useState<any>()
  const [level2DataSource, setLevel2DataSource] = useState<any>()
  const assetsNames = useSelector((state: RootState) => state.commonReports.assets);
  const dateFrom = useSelector((state: RootState) => state.commonReports.dateFrom);
  const dateTo = useSelector((state: RootState) => state.commonReports.dateTo);
  const classes = useStyles()
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const level2DataSourceRef: any = useRef();
  const groupIndexRef: any = useRef();
  const assetsDataRef: any = useRef();
  const assetsNamesRef: any = useRef();
  level2DataSourceRef.current = level2DataSource;
  groupIndexRef.current = level2;
  assetsDataRef.current = assetsData;
  assetsNamesRef.current = assetsNames;

  useEffect(() => {
    if (assetsNames && Object.keys(assetsNames).length > 0) {
      const promises = Object.keys(assetsNames).map(asset => fetchTimeseriesAggregates(asset, 'DATA_1_MIN', 'month', 1, dateFrom, dateTo))
      setLevel2(undefined)
      setLevel3(undefined)
      dispatch(setBackdropOpen(true))
      Promise.all(promises).then(res => {
        let params = {}
        res.forEach(asset => {
          params = {
            ...params,
            [asset.assetID]: asset
          }
        })
        setAssetsData(params)
        dispatch(setBackdropOpen(false))
      }).catch(err => dispatch(setBackdropOpen(false)))
    }
  }, [assetsNames, setAssetsData, dispatch, dateFrom, dateTo])

  useEffect(() => {
    //cleanup
    return () => {
      setLevel1(undefined)
      setLevel2(undefined)
      setLevel3(undefined)
    }
  }, [])

  const handleDateChange = (date: Date) => {
    dispatch(setReportsDate(getUTCDate(date).startOfMonth, getUTCDate(date).endOfMonth))
    setLevel2(undefined)
    setLevel3(undefined)
  }

  const chooseByLanguage = useCallback((sentenceEN: string, sentencePL: string) => {
    return i18n.language === 'pl' ? sentencePL : sentenceEN
  }, [i18n.language])

  const calculateActiveEnergyImportSingleAsset = useCallback((asset: IGroupElementStructure) => {
    if (assetsDataRef.current && assetsDataRef.current[asset.assetID] && assetsDataRef.current[asset.assetID].Active_Energy_Import) {
      return (assetsDataRef.current[asset.assetID].Active_Energy_Import.lastvalue - assetsDataRef.current[asset.assetID].Active_Energy_Import.firstvalue) / 1000
    }
    return 0
  }, [])

  const calculateAggregatedActiveEnergyImport = useCallback((assetIDs: Array<string>) => {
    if (assetsDataRef.current) {
      const filtered = assetIDs.filter(assetID => assetsDataRef.current[assetID] && assetsDataRef.current[assetID].Active_Energy_Import)
      const calculatedEnergy = filtered.map(assetID => assetsDataRef.current[assetID].Active_Energy_Import.lastvalue - assetsDataRef.current[assetID].Active_Energy_Import.firstvalue)
      return calculatedEnergy.length !== 0 ? calculatedEnergy.reduce((a, b) => a + b) / 1000 : 0
    }
    else {
      return 0
    }
  }, [])

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

  const createSubgroupsChart = useCallback((group: IGroupStructure | undefined, groupIndex: number, level: number) => {
    if (group?.subgroups) {
      const title = chooseByLanguage(group.enName, group.plName)
      const values = group.subgroups.map(subgroup => calculateAggregatedActiveEnergyImport(getGroupOfGroupsAssetIDs(subgroup)))
      const labels = group.subgroups.map(subgroup => chooseByLanguage(subgroup.enName, subgroup.plName))
      switch (level) {
        case 2:
          setLevel2({ title, labels, values, groupIndex })
          setLevel3(undefined)
          break;
        case 3:
          setLevel3({ title, labels, values })
          break;
        default:
          return null;
      }
    }
  }, [calculateAggregatedActiveEnergyImport, chooseByLanguage, getGroupOfGroupsAssetIDs])

  const createEndAssetsChart = useCallback((group: IGroupStructure | undefined, groupIndex: number, level: number) => {
    if (group?.assets) {
      const title = chooseByLanguage(group.enName, group.plName)
      const values = group.assets?.map(asset => calculateActiveEnergyImportSingleAsset(asset))

      const labels = group.assets?.map(asset => i18n.language === 'pl'? asset.feederNamePL: asset.feederNameEN)
      switch (level) {
        case 2:
          setLevel2({ title, labels, values, groupIndex: undefined })
          setLevel3(undefined)
          break;
        case 3:
          setLevel3({ title, labels, values })
          break;
        default:
          return null;
      }
    }
  }, [calculateActiveEnergyImportSingleAsset, chooseByLanguage, i18n.language])

  const createNextLevelChart = useCallback((dataIndex: number, originLevel: number) => {
    if (originLevel === 1) {
      setLevel2DataSource(reports.groups[dataIndex])
      if (reports.groups[dataIndex].assets) {
        createEndAssetsChart(reports.groups[dataIndex], dataIndex, originLevel + 1)
      }
      else if (reports.groups[dataIndex].subgroups) {
        createSubgroupsChart(reports.groups[dataIndex], dataIndex, originLevel + 1)
      }
    }
    else {
      if (groupIndexRef.current.groupIndex !== undefined) {
        if (level2DataSourceRef.current?.assets) {
          createEndAssetsChart(level2DataSourceRef.current, dataIndex, originLevel + 1)
        }
        else {
          createEndAssetsChart(level2DataSourceRef.current.subgroups[dataIndex], dataIndex, originLevel + 1)
        }
      }
    }
  }, [createEndAssetsChart, createSubgroupsChart, reports.groups])

  useEffect(() => {
    if (assetsDataRef.current && assetsNamesRef.current) {
      //instantiate first chart 
      const values = reports.groups.map(group => calculateAggregatedActiveEnergyImport(getGroupOfGroupsAssetIDs(group)))
      const labels = reports.groups.map(group => chooseByLanguage(group.enName, group.plName))
      setLevel1({
        title: t('reportsPage.totalActiveEnergyImport'),
        labels: labels,
        values: values,
      })
    }
  }, [assetsData, calculateAggregatedActiveEnergyImport, getGroupOfGroupsAssetIDs, reports.groups, t, chooseByLanguage])

  useEffect(()=> {
    if(referenceToCurrentChartForScrolling) {
      referenceToCurrentChartForScrolling.scrollIntoView({ behavior: 'smooth' })
    }
  },[referenceToCurrentChartForScrolling])

  const createChart = (title: string, labels: Array<string>, values: Array<number>, originLevel: number) => {
    const tableLabels = labels.concat(t('reportsPage.totalValue'))
    const tableValues = values.concat(values.reduce((a, b) => parseFloat((a + b).toFixed(3))))
    return (
      <React.Fragment key={title}>
        <Grid item xs={12} className={classes.sectionMargin} ref={setReferenceToCurrentChartForScrolling}>
          <Typography gutterBottom variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <PieChart
            onDataClick={(dataIndex) => createNextLevelChart(dataIndex, originLevel)}
            chartTitle=""
            unit={'kWh'}
            data={{
              labels: labels,
              datasets: [
                {
                  label: "",
                  backgroundColor: tableLabels.map((label, index) => decideDataColor(index)),
                  data: values
                }
              ]
            }}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <UniversalTable
            columns={[t('reportsPage.groupName'), t('reportsPage.activeEnergyUsage')]}
            rows={tableLabels.map((label: string, index: number) => [label, `${tableValues[index]} kWh`])}
          />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </React.Fragment>
    )
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={9} lg={9}>
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => exportPDF()}
        >
          {t('reportsPage.exportToPDF')}
        </Button>
      </Grid>
      {level1 && level1.title && level1.labels && level1.values ?
        createChart(level1.title, level1.labels, level1.values, 1)
        : null}
      {level2 && level2.title && level2.labels && level2.values ?

        createChart(level2.title, level2.labels, level2.values, 2)
        : null}
      {level3 && level3.title && level3.labels && level3.values ?
        createChart(level3.title, level3.labels, level3.values, 3)
        : null}
    </Grid>
  )
}