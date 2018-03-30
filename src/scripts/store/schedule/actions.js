// actions are where most of the business logic takes place
// they are dispatched by views or by other actions
// there are 3 types of actions:
//  async thunks - when doing asynchronous business logic like accessing a service
//  sync thunks - when you have substantial business logic but it's not async
//  plain object actions - when you just send a plain action to the reducer

import * as types from './actionTypes';
import ScheduleService from '../../services/ScheduleService';

export function fetchScheduleNav() {
	return async(dispatch, getState) => {
		try {
			const scheduleNav = await ScheduleService.getScheduleNav();
			dispatch({ type: types.SCHEDULE_NAV_FETCHED, scheduleNav });
		} catch (error) {
			console.error(error);
		}
	};
}

export function fetchScheduleGames(dateFrom, dateTo) {
	return async(dispatch, getState) => {
		try {
			const params = [
				'schedule.linescore'
			];
			const scheduleGames = await ScheduleService.getScheduleGames(dateFrom, dateTo, params);
			dispatch({ type: types.SCHEDULE_GAMES_FETCHED, scheduleGames });
		} catch (error) {
			console.error(error);
		}
	};
}
