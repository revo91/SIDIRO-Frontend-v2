import { combineReducers } from 'redux';
import { UniversalTabsReducer } from './UniversalTabs.reducer';
import { LanguageDialogReducer } from './LanguageDialog.reducer';
import { DeviceDataDialogReducer } from './DeviceDataDialog.reducer';
import { BackdropReducer } from './Backdrop.reducer';

export const rootReducer = combineReducers({
  universalTabs: UniversalTabsReducer,
  languageDialog: LanguageDialogReducer,
  deviceDataDialog: DeviceDataDialogReducer,
  backdrop: BackdropReducer
})

export type RootState = ReturnType<typeof rootReducer>