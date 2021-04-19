import React, { useState, useEffect, useCallback, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { DatePicker } from "@material-ui/pickers";
import { exportPDF } from '../../utilities/ExportPDF.utility';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { SiemensColors } from '../../utilities/SiemensColors.utility';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers/Root.reducer';
import { IGroupStructure, IGroupElementStructure } from '../../reducers/Reports.reducer';
import { UniversalTable } from '../UniversalTable.component';
import { PieChart } from '../PieChart.component';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { fetchTimeseriesAggregates } from '../../services/FetchTimeseriesAggregatesAPI.service';
import { setLevel1, setLevel2, setLevel3, setLevel2DataSource } from '../../actions/Reports/EnergyConsumptionTab.action';
import { setBackdropOpen } from '../../actions/Backdrop.action';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: '100%'
    },
    sectionMargin: {
      marginTop: theme.spacing(3)
    }
  }),
);

export const EnergyConsumptionTab = () => {
  const [dateFrom, changeDateFrom] = useState<Date | null>(new Date(new Date().setMonth(new Date().getMonth())));
  const [assetsNames, setAssetsNames] = useState<{ [key: string]: any }>()
  const [assetsData, setAssetsData] = useState<{ [key: string]: any }>()
  const reports = useSelector((state: RootState) => state.reports);
  const level1 = useSelector((state: RootState) => state.energyConsumptionTab.level1);
  const level2 = useSelector((state: RootState) => state.energyConsumptionTab.level2);
  const level3 = useSelector((state: RootState) => state.energyConsumptionTab.level3);
  const level2DataSource = useSelector((state: RootState) => state.energyConsumptionTab.level2DataSource);
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
      const promises = Object.keys(assetsNames).map(asset => fetchTimeseriesAggregates(asset))
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
      })
    }
  }, [assetsNames, setAssetsData, dispatch])

  useEffect(() => {
    const gatherAssetIDs = (group: IGroupStructure, assetObj?: any): any => {
      let assetsObject: any = assetObj || {}
      if (group.subgroups) {
        group.subgroups.forEach(subgroup => gatherAssetIDs(subgroup, assetsObject))
      }
      if (group.assets) {
        group.assets.forEach(asset => {
          Object.defineProperty(assetsObject, asset.assetID, {
            value: asset,
            writable: true,
            enumerable: true
          });
        })
      }
      return assetsObject
    }

    let assetsObject: { [key: string]: any } = {}
    reports.groups.forEach((group) => {
      const result = gatherAssetIDs(group)
      assetsObject = { ...assetsObject, ...result }
    })
    setAssetsNames(assetsObject)
  }, [setAssetsNames, reports.groups])

  useEffect(()=>{
    return ()=> {
      setLevel1({ title: null, labels: null, values: null })
      setLevel2({ title: null, labels: null, values: null })
      setLevel3({ title: null, labels: null, values: null })
    }
  },[])

  const chooseByLanguage = useCallback((sentenceEN: string, sentencePL: string) => {
    return i18n.language === 'pl' ? sentencePL : sentenceEN
  },[i18n.language])

  const calculateActiveEnergyImportSingleAsset = useCallback((asset: IGroupElementStructure) => {
    if (assetsDataRef.current && assetsDataRef.current[asset.assetID] && assetsDataRef.current[asset.assetID].Active_Energy_Import) {
      return (assetsDataRef.current[asset.assetID].Active_Energy_Import.lastvalue - assetsDataRef.current[asset.assetID].Active_Energy_Import.firstvalue) / 1000
    }
    return 0
  },[])

  const calculateAggregatedActiveEnergyImport = useCallback((assetIDs: Array<string>) => {
    if (assetsDataRef.current) {
      const filtered = assetIDs.filter(assetID => assetsDataRef.current[assetID] && assetsDataRef.current[assetID].Active_Energy_Import)
      const calculatedEnergy = filtered.map(assetID => assetsDataRef.current[assetID].Active_Energy_Import.lastvalue - assetsDataRef.current[assetID].Active_Energy_Import.firstvalue)
      return calculatedEnergy.reduce((a, b) => a + b) / 1000
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
          dispatch(setLevel2({ title, labels, values, groupIndex }))
          dispatch(setLevel3({ title: null, labels: null, values: null }))
          break;
        case 3:
          dispatch(setLevel3({ title, labels, values }))
          break;
        default:
          return null;
      }
    }
  },[dispatch, calculateAggregatedActiveEnergyImport, chooseByLanguage, getGroupOfGroupsAssetIDs])

  const createEndAssetsChart = useCallback((group: IGroupStructure | undefined, groupIndex: number, level: number) => {
    if (group?.assets) {
      const title = chooseByLanguage(group.enName, group.plName)
      const values = group.assets?.map(asset => calculateActiveEnergyImportSingleAsset(asset))

      const labels = group.assets?.map(asset => asset.feederName)
      switch (level) {
        case 2:
          dispatch(setLevel2({ title, labels, values, groupIndex: undefined }))
          dispatch(setLevel3({ title: null, labels: null, values: null }))
          break;
        case 3:
          dispatch(setLevel3({ title, labels, values }))
          break;
        default:
          return null;
      }
    }
  },[calculateActiveEnergyImportSingleAsset, dispatch, chooseByLanguage])

  const createNextLevelChart = useCallback((dataIndex: number, originLevel: number) => {
    if (originLevel === 1) {
      dispatch(setLevel2DataSource(reports.groups[dataIndex]))
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
  }, [createEndAssetsChart, createSubgroupsChart, reports.groups, dispatch])

  

  useEffect(() => {
    if (assetsDataRef.current && assetsNamesRef.current) {
      //instantiate first chart 
      const values = reports.groups.map(group => calculateAggregatedActiveEnergyImport(getGroupOfGroupsAssetIDs(group)))
      const labels = reports.groups.map(group => chooseByLanguage(group.enName, group.plName))
      dispatch(setLevel1({
        title: t('reportsPage.totalActiveEnergyConsumption'),
        labels: labels,
        values: values,
      }))
    }
  }, [assetsData, calculateAggregatedActiveEnergyImport, getGroupOfGroupsAssetIDs, i18n.language, reports.groups, t, dispatch, chooseByLanguage])

  const createChart = (title: string, labels: Array<string>, values: Array<number>, originLevel: number) => {
    const tableLabels = labels.concat(t('reportsPage.totalValue'))
    const tableValues = values.concat(values.reduce((a, b) => a + b))
    return (
      <React.Fragment>
        <Grid item xs={12} className={classes.sectionMargin}>
          <Typography gutterBottom variant="h5">{title}</Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <PieChart
            onDataClick={(dataIndex) => createNextLevelChart(dataIndex, originLevel)}
            chartTitle=""
            data={{
              labels: labels,
              datasets: [
                {
                  label: "",
                  backgroundColor: [SiemensColors.tealLight, SiemensColors.redDark, SiemensColors.redLight, SiemensColors.blueDark, SiemensColors.yellowDark],
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
    <Grid container spacing={2} >
      <Grid item xs={12} md={8} lg={8} xl={10}>
        <DatePicker
          cancelLabel={t('datePicker.cancelButton')}
          autoOk
          label={t('reportsPage.chooseMonth')}
          value={dateFrom}
          onChange={changeDateFrom}
          fullWidth
          views={['month']}
          format="MM/yyyy"
        />
      </Grid>
      <Grid item xs={12} md={2} lg={2} xl={1}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => exportPDF()}
        >
          {t('reportsPage.exportToPDF')}
        </Button>
      </Grid>
      <Grid item xs={12} md={2} lg={2} xl={1}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
        >
          {t('reportsPage.exportToCSV')}
        </Button>
      </Grid>
      {level1.title && level1.labels && level1.values ?
        createChart(level1.title, level1.labels, level1.values, 1)
        : null}
      {level2.title && level2.labels && level2.values ?
        createChart(level2.title, level2.labels, level2.values, 2)
        : null}
      {level3.title && level3.labels && level3.values ?
        createChart(level3.title, level3.labels, level3.values, 3)
        : null}
    </Grid>
  )
}