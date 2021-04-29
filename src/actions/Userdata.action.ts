export const SET_USER_DATA = 'SET_USER_DATA';
export const setUserData = (appId: string, userId: string, plantName: string) => ({ type: SET_USER_DATA, appId, userId, plantName })