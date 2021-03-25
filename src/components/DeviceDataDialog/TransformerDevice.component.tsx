import React from 'react';
import { UniversalTabs } from '../UniversalTabs.component';
import { CurrentTab } from './CurrentTab.component';
import { OverviewTab } from './OverviewTab.component';
import { PowerTab } from './PowerTab.component';
import { THDITab } from './THDITab.component';
import { THDUTab } from './THDUTab.component';
import { VoltageLNTab } from './VoltageLNTab.component';
import { VoltageLLTab } from './VoltageLLTab.component';
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
          label: t('deviceDataDialog.voltageLNTab'), content: <VoltageLNTab />
        },
        {
          label: t('deviceDataDialog.voltageLLTab'), content: <VoltageLLTab />
        },
        {
          label: t('deviceDataDialog.currentTab'), content: <CurrentTab />
        },
        {
          label: t('deviceDataDialog.powerTab'), content: <PowerTab />
        },
        {
          label: t('deviceDataDialog.THDUTab'), content: <THDUTab />
        },
        {
          label: t('deviceDataDialog.THDITab'), content: <THDITab />
        }]}
    />
  )
}