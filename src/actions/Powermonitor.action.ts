import { IPowermonitorConfig } from '../reducers/Powermonitor.reducer';

export const SET_POWERMONITOR_CONFIG = 'SET_POWERMONITOR_CONFIG';
export const setPowermonitorConfig = (config: IPowermonitorConfig) => ({ type: SET_POWERMONITOR_CONFIG, config })