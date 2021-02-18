import React from 'react';
import { UniversalTabs } from '../UniversalTabs.component';
import { CurrentTab } from './CurrentTab.component';
import { OverviewTab } from './OverviewTab.component';
import { useTranslation } from 'react-i18next';

export const BreakerDevice = () => {
  const { t } = useTranslation();

  return (
    <UniversalTabs
      name='BreakerDeviceDetails'
      tabs={[
        {
          label: t('deviceDataDialog.overviewTab'), content: <OverviewTab />
        },
        {
          label: t('deviceDataDialog.currentTab'), content: <CurrentTab />
        }]}
    />
  )
}