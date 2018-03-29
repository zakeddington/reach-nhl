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

		console.log('GameDetailService results', results);

		return (results);
	}
}

export default new GameDetailService();
