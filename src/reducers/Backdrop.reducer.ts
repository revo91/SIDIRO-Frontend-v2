import { SET_BACKDROP_OPEN } from '../actions/Backdrop.action';

interface IBackdrop {
  type: string,
  open: boolean
}

const initialState = {
  open: false,
}

export const BackdropReducer = (state = initialState, action: IBackdrop) => {
  switch (action.type) {
    case SET_BACKDROP_OPEN:
      return {
        ...state,
        open: action.open
      }
    default:
      return state
  }
}