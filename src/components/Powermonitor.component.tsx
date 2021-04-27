import React from 'react';
import { useTranslation } from 'react-i18next';
import { UniversalTabs } from './UniversalTabs.component';
import { LoadMonitoringTab } from '../components/Powermonitor/LoadMonitoringTab.component';
import { PowermonitorSettingsTab } from '../components/Powermonitor/SettingsTab.component';

export const Powermonitor = () => {
  const { t } = useTranslation();

  return (
    <React.Fragment>
      <UniversalTabs
        name='Powermonitor'
        tabs={[
          {
            label: t('powermonitorPage.loadMonitoringTab'),
            content: <LoadMonitoringTab />
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