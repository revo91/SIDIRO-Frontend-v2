import { IEvent } from '../reducers/Events.reducer';

export const SET_EVENTS = 'SET_EVENTS';
export const setEvents = (switchboardName: string, events: Array<IEvent>) => ({ type: SET_EVENTS, switchboardName, events })