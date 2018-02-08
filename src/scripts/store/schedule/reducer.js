// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

// import _ from 'lodash';
import * as types from './actionTypes';
import immutable from 'seamless-immutable';

const initialState = immutable({
	games: [],
	calendar: [],
	selectedGameUrl: []
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
		case types.GAMES_SELECTED:
			return state.merge({
				selectedGameUrl: action.selectedGameUrl
			});
		default:
			return state;
	}
}

// selectors

export function getCalendar(state) {
	console.log('reducer getCalendar', state);
	return state.schedule.calendar;
}

export function getGames(state) {
	console.log('reducer getGames', state);
	return state.schedule.games;
}

// export function getSelectedGameUrl(state) {
//   return state.schedule.selectedGameUrl;
// }

// export function getSelectedTopicsByUrl(state) {
//   return _.mapValues(_.keyBy(state.schedule.selectedGameUrl), (topicUrl) => state.schedule.games[topicUrl]);
// }

// export function isGameSelectionValid(state) {
//   return state.schedule.selectedGameUrl.length === 1;
// }

export function isGameSelectionFinalized(state) {
	return state.schedule.selectionFinalized;
}
