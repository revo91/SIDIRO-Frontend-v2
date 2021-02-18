import { SET_LANGUAGE_DIALOG_OPEN } from '../actions/LanguageDialog.action';

interface ILanguageDialog {
  type: string,
  open: boolean
}

const initialState = {
  open: false,
}

export const LanguageDialogReducer = (state = initialState, action: ILanguageDialog) => {
  switch (action.type) {
    case SET_LANGUAGE_DIALOG_OPEN:
      return {
        ...state,
        open: action.open
      }
    default:
      return state
  }
}