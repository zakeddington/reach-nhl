// services are state-less
// they act as utility facades that abstract the details for complex operations
// normally, our interface to any sort of server API will be as a service

import _ from 'lodash';
import CONSTANTS from '../config/Constants';
import API from './API';
import UTILS from './Utils';

class GameDetailService {

	async getGameDetail(gameId) {
		const data = await API.getGame(gameId);
		const periodGoals = _.get(data, 'liveData.linescore.periods');
		const shootoutGoals = _.get(data, 'liveData.linescore.shootoutInfo');

		let date = new Date(data.gameData.datetime.dateTime);
		let curDate = date.toLocaleDateString(CONSTANTS.lang, CONSTANTS.dateOptions);
		let startTime = date.toLocaleTimeString(CONSTANTS.lang, CONSTANTS.timeOptions);
		let awayScore = data.liveData.linescore.teams.away.goals;
		let homeScore = data.liveData.linescore.teams.home.goals;
		let periods = UTILS.getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);
		let gameState = UTILS.getGameState(data.liveData.linescore);
		let curState;
		let isPreview = true;

		if (gameState.length) {
			curState = gameState;
			isPreview = false;
		} else {
			curState = startTime;
		}

		let results = {
			isPreview: isPreview,
			date: curDate,
			gameState: curState,
			periodGoals: periods,
			teams: {
				away: {
					city: data.gameData.teams.away.locationName,
					name: data.gameData.teams.away.teamName,
					score: awayScore,
				},
				home: {
					city: data.gameData.teams.home.locationName,
					name: data.gameData.teams.home.teamName,
					score: homeScore,
				}
			}
		}

		// console.log('GameDetailService results', results);

		return results;
	}

	async getScoringSummary(gameId) {
		const data = await API.getGame(gameId);
		const periods = _.get(data, 'liveData.linescore.periods');
		const playIds = _.get(data, 'liveData.plays.scoringPlays');
		const allPlays = _.get(data, 'liveData.plays.allPlays');

		let periodGoals = [];

		_.forEach(periods, (period) => {
			periodGoals.push({
				periodName: period.ordinalNum,
				goals: []
			});
		});

		_.forEach(playIds, (id) => {
			let curPlay = allPlays[id];
			let curPeriodIndex = curPlay.about.period - 1;
			let curScorer;
			let curAssists = [];

			_.forEach(curPlay.players, (player) => {
				if (player.playerType === "Scorer") {
					curScorer = {
						name: player.player.fullName,
						total: player.seasonTotal,
					}
				}

				if (player.playerType === "Assist") {
					curAssists.push({
						name: player.player.fullName,
						total: player.seasonTotal,
					})
				}
			});

			let playDetail = {
				time: curPlay.about.periodTime,
				isEmptyNet: curPlay.result.emptyNet,
				teamStrength: curPlay.result.strength.code,
				score: {
					away: {
						name: data.gameData.teams.away.triCode,
						goals: curPlay.about.goals.away,
					},
					home: {
						name: data.gameData.teams.home.triCode,
						goals: curPlay.about.goals.home,
					}
				},
				scorer: curScorer,
				assists: curAssists
			}

			periodGoals[curPeriodIndex].goals.push(playDetail);
		});

		return periodGoals;
	}
}

export default new GameDetailService();
