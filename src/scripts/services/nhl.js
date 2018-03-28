// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';

import calendar from '../store/schedule/Calendar2017-2018';

const NHL_ENDPOINT = 'https://statsapi.web.nhl.com';
const ALL_GAMES_FROM = '/api/v1/schedule?startDate=';
const ALL_GAMES_TO = '&endDate=';
const GAME_DETAIL_FROM = '/api/v1/game/';
const GAME_DETAIL_TO = '/feed/live/';

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
			let curDate = new Date(date.date.replace(/-/g, '/'));

			let modDate = {
				date: curDate.toLocaleDateString('en-US', dateOptions),
				games: []
			};

			_.flatMapDeep(date.games, (game) => {
				let gameDetail = {
					id: game.gamePk,
					gameState: game.status.abstractGameState,
					url: NHL_ENDPOINT + game.link,
					teamAway: game.teams.away.team.name,
					teamAwayScore: game.teams.away.score,
					teamAwayRecord: `${game.teams.away.leagueRecord.wins}-${game.teams.away.leagueRecord.losses}-${game.teams.away.leagueRecord.ot}`,
					teamHome: game.teams.home.team.name,
					teamHomeScore: game.teams.home.score,
					teamHomeRecord: `${game.teams.home.leagueRecord.wins}-${game.teams.home.leagueRecord.losses}-${game.teams.home.leagueRecord.ot}`,
				}

				modDate.games.push(gameDetail);
			});

			games.push(modDate);
		});

		console.log('nhl getAllGames', games);

		if (!dates) {
			throw new Error(`NHLService getAllGames failed, dates not returned`);
		}

		return (games);
	}

	async getGameDetail(gameId) {
		const url = `${NHL_ENDPOINT}${GAME_DETAIL_FROM}${gameId}${GAME_DETAIL_TO}`;
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
		const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
		let curDate = new Date(data.gameData.datetime.dateTime);
		let awayScore = data.liveData.linescore.teams.away.goals;
		let homeScore = data.liveData.linescore.teams.home.goals;

		const periodGoals = _.get(data, 'liveData.linescore.periods');
		const shootoutGoals = _.get(data, 'liveData.linescore.shootoutInfo');

		let periods = this.getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);
		let status = this.getGameStatus(data);

		let gameDetail = {
			// why does a nested object not work?
			// home: {...},
			// away: {...},
			date: curDate.toLocaleDateString('en-US', dateOptions),
			status: status,
			periodGoals: periods,
			teamHomeCity: data.gameData.teams.home.locationName,
			teamHomeName: data.gameData.teams.home.teamName,
			teamHomeScore: homeScore,
			teamAwayCity: data.gameData.teams.away.locationName,
			teamAwayName: data.gameData.teams.away.teamName,
			teamAwayScore: awayScore,
		}

		console.log('nhl getGameDetail', gameDetail);

		return (gameDetail);
	}

	getGameStatus(data) {
		let curStatus = data.gameData.status.detailedState;

		if (curStatus !== 'Final') {
			let curPeriod = data.liveData.linescore.currentPeriodOrdinal;
			let curTime = data.liveData.linescore.currentPeriodTimeRemaining;

			curStatus = `${curPeriod} | ${curTime}`;
		}

		return curStatus;
	}

	getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals) {
		let periods = [];
		let periodsTotal = ['T', awayScore, homeScore];

		_.forEach(periodGoals, (period) => {
			let curPeriod = [];
			let periodName = period.ordinalNum;
			let awayGoals = period.away.goals;
			let homeGoals = period.home.goals;

			if (periodName === 'OT') {
				if (awayGoals + homeGoals <= 0) {
					curPeriod.push('SO');
					curPeriod.push(shootoutGoals.away.scores);
					curPeriod.push(shootoutGoals.home.scores);
				} else {
					curPeriod.push(periodName);
					curPeriod.push(awayGoals);
					curPeriod.push(homeGoals);
				}
			} else {
				curPeriod.push(periodName);
				curPeriod.push(awayGoals);
				curPeriod.push(homeGoals);
			}

			periods.push(curPeriod);
		});

		periods.push(periodsTotal);

		return periods;
	}
}

export default new NHLService();
