// reducers hold the store's state (the initialState object defines it)
// reducers also handle plain object actions and modify their state (immutably) accordingly
// this is the only way to change the store's state
// the other exports in this file are selectors, which is business logic that digests parts of the store's state
// for easier consumption by views

import * as types from './actionTypes';
import immutable from 'seamless-immutable';

const initialState = immutable({
	gameDetail: []
});

export default function reduce(state = initialState, action = {}) {
	switch (action.type) {
		case types.GAME_DETAIL_FETCHED:
			return state.merge({
				gameDetail: action.gameDetail
			});
		default:
			return state;
	}
}

// selectors

export function getGameDetail(state) {
	return state.game.gameDetail;
}
