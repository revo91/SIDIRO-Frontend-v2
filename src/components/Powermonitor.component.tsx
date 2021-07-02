import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalTabs } from './UniversalTabs.component';
import { LoadMonitoringTab } from '../components/Powermonitor/LoadMonitoringTab.component';
import { PowermonitorSettingsTab } from '../components/Powermonitor/SettingsTab.component';
import { fetchPowermonitor } from '../services/CustomAPI.service';
import { RootState } from '../reducers/Root.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { setPowermonitorConfig } from '../actions/Powermonitor.action';

export const Powermonitor = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch()
  const userPlantData = useSelector((state: RootState) => state.userData);;
  const [powermonitorChartData, setPowermonitorChartData] = useState<any>();

  useEffect(() => {
    let interval: any = null
    if (userPlantData.plantName !== '') {
      fetchPowermonitor(userPlantData.plantName).then(res => {
        if (res.length > 0) {
          setPowermonitorChartData(res[0].data)
          dispatch(setPowermonitorConfig(res[0].config))
        }
      })
      interval = setInterval(() => {
        fetchPowermonitor(userPlantData.plantName).then(res => {
          if (res.length > 0) {
            setPowermonitorChartData(res[0].data)
          }
        })
      }, 30000)
    }
    return () => clearInterval(interval)

  }, [userPlantData.plantName, dispatch])

  return (
    <React.Fragment>
      <UniversalTabs
        name='Powermonitor'
        tabs={[
          {
            label: t('powermonitorPage.loadMonitoringTab'),
            content: <LoadMonitoringTab chartData={powermonitorChartData} />
          },
          {
            label: t('powermonitorPage.settingsTab'),
            content: <PowermonitorSettingsTab />
          },
        ]}
      />
    </React.Fragment>
  )
}