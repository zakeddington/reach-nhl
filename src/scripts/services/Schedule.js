// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';
import CONSTANTS from '../config/Constants';
import API from './API';
import UTILS from './Utils';
import calendar from '../store/schedule/Calendar2017-2018';

class ScheduleService {

	async getScheduleNav() {
		return (calendar);
	}

	async getScheduleGames(dateFrom, dateTo, params) {
		const data = await API.getSchedule(dateFrom, dateTo, params);
		const dates = _.get(data, 'dates');
		let results = [];

		_.forEach(dates, (date) => {
			let curDate = new Date(date.date.replace(/-/g, '/'));

			let curResults = {
				date: curDate.toLocaleDateString(CONSTANTS.lang, CONSTANTS.dateOptions),
				games: []
			};

			_.flatMapDeep(date.games, (game) => {
				let startTime = new Date(game.gameDate).toLocaleTimeString(CONSTANTS.lang, CONSTANTS.timeOptions);
				let gameState = UTILS.getGameState(game.linescore);
				let curState;
				let awayScore = '';
				let homeScore = '';

				if (gameState.length) {
					curState = gameState;
					awayScore = game.teams.away.score;
					homeScore = game.teams.home.score;
				} else {
					curState = startTime;
				}

				let gameDetail = {
					id: game.gamePk,
					gameState: curState,
					teamAway: game.teams.away.team.name,
					teamAwayScore: awayScore,
					teamAwayRecord: `${game.teams.away.leagueRecord.wins}-${game.teams.away.leagueRecord.losses}-${game.teams.away.leagueRecord.ot}`,
					teamHome: game.teams.home.team.name,
					teamHomeScore: homeScore,
					teamHomeRecord: `${game.teams.home.leagueRecord.wins}-${game.teams.home.leagueRecord.losses}-${game.teams.home.leagueRecord.ot}`,
				}

				curResults.games.push(gameDetail);
			});

			results.push(curResults);
		});

		console.log('ScheduleService results', results);

		if (!dates) {
			throw new Error(`ScheduleService getScheduleGames failed, dates not returned`);
		}

		return (results);
	}
}

export default new ScheduleService();
