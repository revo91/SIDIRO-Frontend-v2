import { combineReducers } from 'redux';
import { UniversalTabsReducer } from './UniversalTabs.reducer';
import { LanguageDialogReducer } from './LanguageDialog.reducer';
import { DeviceDataDialogReducer } from './DeviceDataDialog.reducer';
import { BackdropReducer } from './Backdrop.reducer';
import { ElevationReducer } from './Elevation.reducer';
import { OverviewReducer } from './Overview.reducer';
import { SystemTopologyData } from './SystemTopologyData.reducer';
import { DeviceDataDialogElevationDataSource } from './DeviceDataDialogElevationDataSource.reducer';
import { EventsReducer } from './Events.reducer';
import { ReportsReducer } from './Reports.reducer';
import { CommonReportsReducer } from './Reports/CommonReports.reducer';
import { PowerDemandTabReducer } from './Reports/PowerDemandTab.reducer';
import { UserdataReducer } from './Userdata.reducer';
import { PowermonitorReducer } from './Powermonitor.reducer';

export const rootReducer = combineReducers({
  universalTabs: UniversalTabsReducer,
  languageDialog: LanguageDialogReducer,
  deviceDataDialog: DeviceDataDialogReducer,
  deviceDataDialogElevationDataSource: DeviceDataDialogElevationDataSource,
  backdrop: BackdropReducer,
  elevation: ElevationReducer,
  overview: OverviewReducer,
  systemTopologyData: SystemTopologyData,
  events: EventsReducer,
  reports: ReportsReducer,
  commonReports: CommonReportsReducer,
  powerDemandTab: PowerDemandTabReducer,
  userData: UserdataReducer,
  powermonitor: PowermonitorReducer
})

export type RootState = ReturnType<typeof rootReducer>