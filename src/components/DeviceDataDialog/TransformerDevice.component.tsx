import React from 'react';
import { UniversalTabs } from '../UniversalTabs.component';
import { CurrentTab } from './CurrentTab.component';
import { OverviewTab } from './OverviewTab.component';
import { useTranslation } from 'react-i18next';

export const TransformerDevice = () => {
  const { t } = useTranslation();

  return (
    <UniversalTabs
      name='TransformerDeviceDetails'
      tabs={[
        {
          label: t('deviceDataDialog.overviewTab'), content: <OverviewTab />
        },
        {
          label: t('deviceDataDialog.voltageLNTab'), content: <OverviewTab />
        },
        {
          label: t('deviceDataDialog.voltageLLTab'), content: <OverviewTab />
        },
        {
          label: t('deviceDataDialog.currentTab'), content: <CurrentTab />
        },
        {
          label: t('deviceDataDialog.powerTab'), content: <CurrentTab />
        },
        {
          label: t('deviceDataDialog.THDUTab'), content: <CurrentTab />
        },
        {
          label: t('deviceDataDialog.THDITab'), content: <CurrentTab />
        }]}
    />
  )
}