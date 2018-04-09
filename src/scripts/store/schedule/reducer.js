// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes';
import immutable from 'seamless-immutable';

const initialState = immutable({
	scheduleGames: [],
	scheduleIsLoading: true,
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.SCHEDULE_GAMES_FETCHED:
			return state.merge({
				scheduleGames: action.scheduleGames,
				scheduleIsLoading: false,
			});
		default:
			return state;
	}
}

// selectors

export function getScheduleGames(state) {
	return state.schedule.scheduleGames;
}

export function getScheduleLoadingState(state) {
	return state.schedule.scheduleIsLoading;
}
