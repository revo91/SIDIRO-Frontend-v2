import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';
import Grid from '@material-ui/core/Grid';
import { UniversalTabs } from './UniversalTabs.component';
import { useSelector, useDispatch } from 'react-redux';
import { EnergyConsumptionTab } from './Reports/EnergyConsumptionTab.component';
import { EnergyUsageProfile } from './Reports/EnergyUsageProfileTab.component';
import { IGroupStructure } from '../reducers/Reports.reducer';
import { setAssetsReportsData } from '../actions/Reports/CommonReports.action';
import { RootState } from '../reducers/Root.reducer';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: '100%'
    },
    sectionMargin: {
      marginTop: theme.spacing(3)
    }
  }),
);

export const Reports = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reports = useSelector((state: RootState) => state.reports);

  useEffect(() => {
    //initialize assets taking part in reports
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
    dispatch(setAssetsReportsData(assetsObject))
  }, [dispatch, reports.groups])

  //const reports = useSelector((state: RootState) => state.reports);

  // const outgoingFeedersParameters = (
  //   <Grid container spacing={1}>
  //     <Grid item xs={12} md={5} lg={5}>
  //       <FormControl className={classes.select}>
  //         <InputLabel id="breaker-select-label">Wybierz rozdzielnicę</InputLabel>
  //         <Select
  //           fullWidth
  //           labelId="breaker-select-label"
  //           id="breaker-select"
  //           value={energyType}
  //           onChange={handleEnergyType}
  //         >
  //           <MenuItem value={0}>HVPP-1</MenuItem>
  //         </Select>
  //       </FormControl>
  //     </Grid>
  //     <Grid item xs={12} md={3} lg={3}>
  //       <FormControl className={classes.select}>
  //         <InputLabel id="breaker-select-label">Wybierz odbiór</InputLabel>
  //         <Select
  //           fullWidth
  //           labelId="breaker-select-label"
  //           id="breaker-select"
  //           value={energyType}
  //           onChange={handleEnergyType}
  //         >
  //           <MenuItem value={0}>QT01</MenuItem>
  //         </Select>
  //       </FormControl>
  //     </Grid>
  //     <Grid item xs={12} md={2} lg={2}>
  //       <Button
  //         fullWidth
  //         variant="contained"
  //         color="primary"
  //       >
  //         Eksport PDF
  //     </Button>
  //     </Grid>
  //     <Grid item xs={12} md={2} lg={2}>
  //       <Button
  //         fullWidth
  //         variant="contained"
  //         color="primary"
  //       >
  //         Eksport CSV
  //     </Button>
  //     </Grid>
  //   </Grid>
  // )

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography variant='h2' gutterBottom>{t('reportsPage.title')}</Typography>
        </Grid>
      </Grid>
      <UniversalTabs
        name='Reports'
        tabs={[
          {
            label: t('reportsPage.monthlyEnergyUsage'),
            content: <EnergyConsumptionTab />
          },
          {
            label: t('reportsPage.energyUsageProfile'),
            content: <EnergyUsageProfile />
          },
          {
            label: t('reportsPage.powers15min'),
            content: <p>Power demand tab content</p>
          },
          {
            label: t('reportsPage.infeedParameters'),
            content: <p>Supply parameters tab content</p>
          },
          {
            label: t('reportsPage.outgoingFeederParameters'),
            content: <p></p>
          }
        ]}
      />
    </React.Fragment>
  )
}