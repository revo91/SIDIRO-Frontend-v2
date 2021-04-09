import { SET_EVENTS } from '../actions/Events.action';

export interface IEvent {
  description: string,
  entityId: string, //switchboard assetID
  severity: number,
  source: string, //circuit breaker assetID
  timestamp: string
}

interface IEventsAction {
  type: string,
  switchboardName: string,
  events: Array<IEvent>
}

interface IEvents {
  [switchboardName: string]: Array<IEvent>
}

const initialState: IEvents = {
}

export const EventsReducer = (state = initialState, action: IEventsAction) => {
  switch (action.type) {
    case SET_EVENTS:
      return {
        ...state,
        [action.switchboardName]: action.events
      }
    default:
      return state
  }
}