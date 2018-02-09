// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

import calendar from '../store/schedule/Calendar2017-2018';

const NHL_ENDPOINT = 'https://statsapi.web.nhl.com';
const ALL_GAMES_FROM = '/api/v1/schedule?startDate=';
const ALL_GAMES_TO = '&endDate=';

class NHLService {

	async getCalendar() {
		console.log('nhl getCalendar', calendar);
		return (calendar);
	}

	async getAllGames(dateFrom, dateTo) {
		const url = `${NHL_ENDPOINT}${ALL_GAMES_FROM}${dateFrom}${ALL_GAMES_TO}${dateTo}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`NHLService getAllGames failed, HTTP status ${response.status}`);
		}

		const data = await response.json();
		const dates = _.get(data, 'dates');
		const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		let games = [];

		_.forEach(dates, (date) => {
			let curDate = new Date(date.date);

			let modDate = {
				date: curDate.toLocaleDateString('en-US', dateOptions),
				games: []
			};

			_.flatMapDeep(date.games, (game) => {
				let gameDetail = {
					id: game.gamePk,
					gameState: game.status.abstractGameState,
					url: NHL_ENDPOINT + game.link,
					teamHome: game.teams.home.team.name,
					teamHomeScore: game.teams.home.score,
					teamAway: game.teams.away.team.name,
					teamAwayScore: game.teams.away.score
				}

				modDate.games.push(gameDetail);
			});

			games.push(modDate);
		});

		console.log('nhl dates', games);

		if (!dates) {
			throw new Error(`NHLService getAllGames failed, dates not returned`);
		}

		return (games);
	}
}

export default new NHLService();
