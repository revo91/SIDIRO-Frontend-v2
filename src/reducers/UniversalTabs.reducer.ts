import { SET_UNIVERSAL_TABS_NAME_INDEX } from '../actions/UniversalTabs.action';

interface IUniversalTabs {
  type: string,
  name: string,
  index: number
}

const initialState = {
  //tabs instances added dynamically
}

export const UniversalTabsReducer = (state: any = initialState, action: IUniversalTabs) => {
  switch (action.type) {
    case SET_UNIVERSAL_TABS_NAME_INDEX:
      return {
        ...state,
        [action.name]: action.index
      }
    default:
      return state
  }
}