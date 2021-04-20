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
import { IGroupStructure } from '../../reducers/Reports.reducer';
import { decideDataColor } from '../../utilities/SiemensColors.utility';
import { getUTCDate } from '../../utilities/GetUTCDate.utility';
import { setBackdropOpen } from '../../actions/Backdrop.action';
import { setReportsDate } from '../../actions/Reports/CommonReports.action';
import { parseISO, format } from 'date-fns';
import { useStyles } from '../Reports.component';

export const EnergyUsageProfile = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const dateFrom = useSelector((state: RootState) => state.commonReports.dateFrom);
  const dateTo = useSelector((state: RootState) => state.commonReports.dateTo);
  const [level1, setLevel1] = useState<{
    title: string | null,
    xAxisLabels: Array<string> | null, //[...days of month]
    datasets: Array<{ label: string, data: Array<number>, backgroundColor: string }>
  }>()
  const [assetsData, setAssetsData] = useState<{ [key: string]: any }>()
  const [energyType, setEnergyType] = useState('activeEnergyImport');
  const assetsNames = useSelector((state: RootState) => state.commonReports.assets);
  const reports = useSelector((state: RootState) => state.reports);
  const assetsDataRef: any = useRef();
  const assetsNamesRef: any = useRef();
  assetsDataRef.current = assetsData;
  assetsNamesRef.current = assetsNames;

  const handleEnergyType = (event: React.ChangeEvent<{ value: unknown }>) => {
    setEnergyType(event.target.value as string);
  };

  const calculateAggregatedValue = (valueType: string, assetIDs: Array<string>) => {
    if (assetsDataRef.current) {
      switch (valueType) {
        case 'Active_Energy_Import': {
          const calculatedEnergy = assetIDs.map(assetID => {
            const values = Object.values(assetsDataRef.current[assetID])
            values.pop()
            return values.map((dailyValues: any) => {
              if (dailyValues.Active_Energy_Import !== undefined) {
                return dailyValues.Active_Energy_Import.lastvalue - dailyValues.Active_Energy_Import.firstvalue
              }
              else {
                return 0
              }
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
        case 'Reactive_Energy_Import': {
          return []
        }
        case 'Reactive_Energy_Export': {
          return []
        }
        default: {
          return []
        }
      }
    }
    else {
      return []
    }
  }

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
      const promises = Object.keys(assetsNames).map(asset => fetchTimeseriesAggregates(asset, 'day', dateFrom, dateTo))
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
  }, [assetsNames, setAssetsData, dispatch, dateFrom, dateTo])

  useEffect(() => {
    if (assetsDataRef.current && assetsNamesRef.current) {
      //instantiate first chart 
      const values = reports.groups.map(group => calculateAggregatedValue('Active_Energy_Import', getGroupOfGroupsAssetIDs(group)))
      const xLabels = Object.values(assetsDataRef.current).map((assetDailyData: any) => {
        return Object.values(assetDailyData).map((asset: any) => asset.starttime)
      })
      const xLabelsFormattedDates = xLabels[0].filter(element => element !== undefined).map(date => `${format(parseISO(date), 'dd/MM/yyyy')}`)
      console.log(xLabelsFormattedDates)
      const globalLabels = reports.groups.map(group => group.plName) // main groups
      const datasets = globalLabels.map((group: string, index: number) => {
        return {
          label: group,
          data: values[index],
          backgroundColor: decideDataColor(index)
        }
      })
      setLevel1({
        title: 'test',
        xAxisLabels: xLabelsFormattedDates,
        datasets: datasets
      })
    }
  }, [assetsData])

  const setPageTitleBasedOnSelectedEnergyType = () => {
    switch (energyType) {
      case 'activeEnergyImport': {
        return t('reportsPage.totalActiveEnergyImport')
      }
      case 'reactiveEnergyImport': {
        return t('reportsPage.totalReactiveEnergyImport')
      }
      case 'reactiveEnergyExport': {
        return t('reportsPage.totalReactiveEnergyExport')
      }
      default: {
        return ''
      }
    }
  }

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} lg={5}>
          <DatePicker
            cancelLabel={t('datePicker.cancelButton')}
            autoOk
            label={'Wybierz miesiąc'}
            value={dateFrom}
            onChange={(date) => date ? dispatch(setReportsDate(getUTCDate(date).startOfMonth, getUTCDate(date).endOfMonth)) : null}
            fullWidth
            views={['month']}
            format="MM/yyyy"
          />
        </Grid>
        <Grid item xs={12} md={3} lg={3}>
          <FormControl className={classes.select}>
            <InputLabel id="breaker-select-label">Energia</InputLabel>
            <Select
              fullWidth
              labelId="breaker-select-label"
              id="breaker-select"
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
          >
            Eksport PDF
      </Button>
        </Grid>
        <Grid item xs={12} md={2} lg={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
          >
            Eksport CSV
      </Button>
        </Grid>
        {level1 && level1.title && level1.xAxisLabels && level1.datasets ?
          <React.Fragment>
            <Grid item xs={12} className={classes.sectionMargin}>
              <Typography gutterBottom variant="h5">{setPageTitleBasedOnSelectedEnergyType()}</Typography>
            </Grid>
            <Grid item xs={12}>
              <StackedBarChart
                chartTitle=""
                data={{
                  labels: level1.xAxisLabels,
                  datasets: level1.datasets
                }}
              />
            </Grid>
          </React.Fragment>
          : null}
      </Grid>
    </React.Fragment>
  )
}