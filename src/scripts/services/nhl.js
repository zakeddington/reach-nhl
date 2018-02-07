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

		console.log('dates', dates);

		const games = _.flatMapDeep(dates, (date) => {
			let curGames = _.flatMapDeep(date.games, (game) => {
				let curDate = new Date(game.gameDate);
				let gameDetail = {
					id: game.gamePk,
					date: curDate.toLocaleDateString('en-US', dateOptions),
					gameState: game.status.abstractGameState,
					url: NHL_ENDPOINT + game.link,
					teamHome: game.teams.home.team.name,
					teamHomeScore: game.teams.home.score,
					teamAway: game.teams.away.team.name,
					teamAwayScore: game.teams.away.score
				}

				return gameDetail;
			});

			return curGames;
		});

		console.log('games', games);



		if (!dates) {
			throw new Error(`NHLService getAllGames failed, dates not returned`);
		}

		// const games = _.flatMap(dates, item =>
		// 								_(item.games).value()
		// 							);

		// _.flatMap(dates, item =>
		// 	_(item.values)
		// 		.filter({ sub: 'fr' })
		// 		.map(v => ({id: item.id, name: v.name}))
		// 		.value()
		// );
		//

		return (games);

		// return _.map(sortedByDates, (subreddit) => {
		// 	// abstract away the specifics of the reddit API response and take only the fields we care about
		// 	return {
		// 		title: _.get(subreddit, 'data.display_name'),
		// 		description: _.get(subreddit, 'data.public_description'),
		// 		url: _.get(subreddit, 'data.url')
		// 	}
		// });
	}
}

export default new NHLService();
