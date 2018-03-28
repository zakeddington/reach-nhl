// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes';
import immutable from 'seamless-immutable';

const initialState = immutable({
	games: [],
	calendar: [],
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.CALENDAR_FETCHED:
			return state.merge({
				calendar: action.calendar
			});
		case types.SCHEDULE_FETCHED:
			return state.merge({
				games: action.games
			});
		default:
			return state;
	}
}

// selectors

export function getCalendar(state) {
	return state.schedule.calendar;
}

export function getGames(state) {
	return state.schedule.games;
}

export function isGameSelectionFinalized(state) {
	return state.schedule.selectionFinalized;
}
