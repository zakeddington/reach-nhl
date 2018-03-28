// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes';
import nhlService from '../../services/nhl';

export function fetchGames(dateFrom, dateTo) {
	return async(dispatch, getState) => {
		try {
			const params = [
				'schedule.linescore'
			];
			const games = await nhlService.getAllGames(dateFrom, dateTo, params);
			dispatch({ type: types.SCHEDULE_FETCHED, games });
		} catch (error) {
			console.error(error);
		}
	};
}

export function fetchCalendar() {
	return async(dispatch, getState) => {
		try {
			const calendar = await nhlService.getCalendar();
			dispatch({ type: types.CALENDAR_FETCHED, calendar });
		} catch (error) {
			console.error(error);
		}
	};
}
