import { IEnergyConsumptionChartData } from '../../reducers/Reports/EnergyConsumptionTab.reducer';

export const SET_LEVEL1 = 'SET_LEVEL1';
export const SET_LEVEL2 = 'SET_LEVEL2';
export const SET_LEVEL3 = 'SET_LEVEL3';
export const SET_LEVEL2_DATA_SOURCE = 'SET_LEVEL2_DATA_SOURCE'
export const setLevel1 = (data: IEnergyConsumptionChartData) => ({ type: SET_LEVEL1, title: data.title, labels: data.labels, values: data.values })
export const setLevel2 = (data: IEnergyConsumptionChartData) => ({ type: SET_LEVEL2, title: data.title, labels: data.labels, values: data.values, groupIndex: data.groupIndex })
export const setLevel3 = (data: IEnergyConsumptionChartData) => ({ type: SET_LEVEL3, title: data.title, labels: data.labels, values: data.values })
export const setLevel2DataSource = (data: any) => ({ type: SET_LEVEL2_DATA_SOURCE, level2DataSource: data })