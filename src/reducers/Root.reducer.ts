import { combineReducers } from 'redux';
import { UniversalTabsReducer } from './UniversalTabs.reducer';
import { LanguageDialogReducer } from './LanguageDialog.reducer';
import { DeviceDataDialogReducer } from './DeviceDataDialog.reducer';
import { BackdropReducer } from './Backdrop.reducer';
import { ElevationReducer } from './Elevation.reducer';
import { OverviewReducer } from './Overview.reducer';
import { SystemTopologyData } from './SystemTopologyData.reducer';

export const rootReducer = combineReducers({
  universalTabs: UniversalTabsReducer,
  languageDialog: LanguageDialogReducer,
  deviceDataDialog: DeviceDataDialogReducer,
  backdrop: BackdropReducer,
  elevation: ElevationReducer,
  overview: OverviewReducer,
  systemTopologyData: SystemTopologyData
})

export type RootState = ReturnType<typeof rootReducer>