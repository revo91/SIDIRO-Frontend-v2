import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalTabs } from './UniversalTabs.component';
import { useSelector, useDispatch } from 'react-redux';
import { EnergyConsumptionTab } from './Reports/EnergyConsumptionTab.component';
import { EnergyUsageProfile } from './Reports/EnergyUsageProfileTab.component';
import { IGroupStructure } from '../reducers/Reports.reducer';
import { setAssetsReportsData } from '../actions/Reports/CommonReports.action';
import { RootState } from '../reducers/Root.reducer';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { PowerDemandTab } from './Reports/PowerDemandTab.component';
import { InfeedParametersTab } from './Reports/InfeedParametersTab.component';
import { OutfeedParametersTab } from './Reports/OutfeedParametersTab.component';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    select: {
      width: '100%'
    },
    sectionMargin: {
      marginTop: theme.spacing(3)
    },
    smallerFont: {
      fontSize: '11px'
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

  return (
    <React.Fragment>
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
            content: <PowerDemandTab />
          },
          {
            label: t('reportsPage.infeedParameters'),
            content: <InfeedParametersTab />
          },
          {
            label: t('reportsPage.outgoingFeederParameters'),
            content: <OutfeedParametersTab />
          }
        ]}
      />
    </React.Fragment>
  )
}