export const SET_REPORTS_STRUCTURE = 'SET_REPORTS_STRUCTURE';
export const SET_REPORTS_POWER_DEMAND_STRUCTURE = 'SET_REPORTS_POWER_DEMAND_STRUCTURE';
export const setReports = (reportsStructure: Array<object>) => ({ type: SET_REPORTS_STRUCTURE, reportsStructure })
export const setReportsPowerDemand = (powerDemandStructure: object) => ({ type: SET_REPORTS_POWER_DEMAND_STRUCTURE, powerDemandStructure })