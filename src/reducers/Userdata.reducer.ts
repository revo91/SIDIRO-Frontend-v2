import { SET_USER_DATA } from '../actions/Userdata.action';

interface IUserdataAction {
  type: string,
  appId: string,
  userId: string,
  plantName: string
}

const initialState = {
  appId: '',
  userId: '',
  plantName: ''
}

export const UserdataReducer = (state = initialState, action: IUserdataAction) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        appId: action.appId,
        userId: action.userId,
        plantName: action.plantName
      }
    default:
      return state
  }
}