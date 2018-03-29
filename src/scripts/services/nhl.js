// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';
import API from './API';
import calendar from '../store/schedule/Calendar2017-2018';

const LANG = 'en-US';
const DATE_OPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
const TIME_OPTIONS = {timeZone: 'America/New_York', hour: '2-digit', minute:'2-digit', timeZoneName: 'short' };

class NHLService {

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
				date: curDate.toLocaleDateString(LANG, DATE_OPTIONS),
				games: []
			};

			_.flatMapDeep(date.games, (game) => {
				let startTime = new Date(game.gameDate).toLocaleTimeString(LANG, TIME_OPTIONS);
				let gameState = this.getGameState(game.linescore);
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

		console.log('nhl getScheduleGames results', results);

		if (!dates) {
			throw new Error(`NHLService getScheduleGames failed, dates not returned`);
		}

		return (results);
	}

	async getGameDetail(gameId) {
		const data = await API.getGame(gameId);
		const periodGoals = _.get(data, 'liveData.linescore.periods');
		const shootoutGoals = _.get(data, 'liveData.linescore.shootoutInfo');

		let date = new Date(data.gameData.datetime.dateTime);
		let curDate = date.toLocaleDateString(LANG, DATE_OPTIONS);
		let startTime = date.toLocaleTimeString(LANG, TIME_OPTIONS);
		let awayScore = data.liveData.linescore.teams.away.goals;
		let homeScore = data.liveData.linescore.teams.home.goals;
		let periods = this.getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);
		let gameState = this.getGameState(data.liveData.linescore);
		let curState;
		let isPreview = true;

		if (gameState.length) {
			curState = gameState;
			isPreview = false;
		} else {
			curState = startTime;
		}

		let results = {
			// why does a nested object not work?
			// home: {...},
			// away: {...},
			isPreview: isPreview,
			date: curDate,
			gameState: curState,
			periodGoals: periods,
			teamAwayCity: data.gameData.teams.away.locationName,
			teamAwayName: data.gameData.teams.away.teamName,
			teamAwayScore: awayScore,
			teamHomeCity: data.gameData.teams.home.locationName,
			teamHomeName: data.gameData.teams.home.teamName,
			teamHomeScore: homeScore,
		}

		console.log('nhl getGameDetail results', results);

		return (results);
	}

	getGameState(linescoreData) {
		let data = linescoreData;
		let curPeriod = data.currentPeriod;
		let curPeriodName = data.currentPeriodOrdinal;
		let curTime = data.currentPeriodTimeRemaining;
		let curStatus = '';

		if (curPeriod > 0) {
			if (curTime !== 'Final') {
				curStatus = `${curPeriodName} | ${curTime}`;
			} else {
				if (curPeriod === 3) {
					curStatus = `${curTime}`;
				} else {
					curStatus = `${curTime}/${curPeriodName}`;
				}
			}
		}

		return curStatus;
	}

	getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals) {
		let periods = [];
		let periodsTotal = ['T', awayScore, homeScore];

		if (periodGoals.length) {
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
		}

		return periods;
	}
}

export default new NHLService();
