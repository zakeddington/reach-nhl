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
		const boxscoreTeams = _.get(data, 'liveData.boxscore.teams');
		const stars = _.get(data, 'liveData.decisions');

		let date = new Date(data.gameData.datetime.dateTime);
		let curDate = date.toLocaleDateString(CONSTANTS.lang, CONSTANTS.dateOptions);
		let startTime = date.toLocaleTimeString(CONSTANTS.lang, CONSTANTS.timeOptions);
		let awayScore = data.liveData.linescore.teams.away.goals;
		let homeScore = data.liveData.linescore.teams.home.goals;
		let periods = UTILS.getPeriodStats(periodGoals, awayScore, homeScore, shootoutGoals);
		let gameStatus = UTILS.getGameStatus(data.liveData.linescore);
		let curStars;
		let curStatus;
		let isPreview = true;

		if (gameStatus.length) {
			curStatus = gameStatus;
			isPreview = false;
		} else {
			curStatus = startTime;
		}

		if (Object.keys(stars).length) {
			console.log(Object.keys(stars).length);
			let firstStar = UTILS.getStarStats(stars.firstStar, boxscoreTeams);
			let secondStar = UTILS.getStarStats(stars.secondStar, boxscoreTeams);
			let thirdStar = UTILS.getStarStats(stars.thirdStar, boxscoreTeams);

			curStars = [firstStar, secondStar, thirdStar];
		}

		let results = {
			isPreview: isPreview,
			date: curDate,
			gameStatus: curStatus,
			periodGoals: periods,
			teams: {
				away: {
					id: data.gameData.teams.away.id,
					city: data.gameData.teams.away.locationName,
					name: data.gameData.teams.away.teamName,
					score: awayScore,
				},
				home: {
					id: data.gameData.teams.home.id,
					city: data.gameData.teams.home.locationName,
					name: data.gameData.teams.home.teamName,
					score: homeScore,
				}
			},
			stars: curStars
		}

		// console.log('GameDetailService results', results);

		return results;
	}

	async getPeriodSummary(gameId) {
		const data = await API.getGame(gameId);
		const periods = _.get(data, 'liveData.linescore.periods');
		const scoringIds = _.get(data, 'liveData.plays.scoringPlays');
		const penaltyIds = _.get(data, 'liveData.plays.penaltyPlays');
		const allPlays = _.get(data, 'liveData.plays.allPlays');
		const teamAwayId = data.gameData.teams.away.id;
		const teamHomeId = data.gameData.teams.home.id;

		let periodPlays = [];

		_.forEach(periods, (period) => {
			periodPlays.push({
				periodName: period.ordinalNum,
				goals: [],
				penalties: [],
			});
		});

		_.forEach(scoringIds, (id) => {
			let curPlay = allPlays[id];
			let curPeriodIndex = curPlay.about.period - 1;
			let scoringTeamId = curPlay.team.id;
			let curScorer;
			let curAssists = [];

			if (curPeriodIndex < periods.length) {
				_.forEach(curPlay.players, (player) => {
					if (player.playerType === "Scorer") {
						curScorer = {
							name: player.player.fullName,
							total: player.seasonTotal,
							desc: curPlay.result.secondaryType,
							photo: `${CONSTANTS.imgUrl.player.base}${player.player.id}${CONSTANTS.imgUrl.player.ext}`,
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
					teamId: scoringTeamId,
					score: {
						away: {
							name: data.gameData.teams.away.triCode,
							goals: curPlay.about.goals.away,
							isScoringTeam: scoringTeamId === teamAwayId,
						},
						home: {
							name: data.gameData.teams.home.triCode,
							goals: curPlay.about.goals.home,
							isScoringTeam: scoringTeamId === teamHomeId,
						},
					},
					scorer: curScorer,
					assists: curAssists
				}

				periodPlays[curPeriodIndex].goals.push(playDetail);
			}
		});

		_.forEach(penaltyIds, (id) => {
			let curPlay = allPlays[id];
			let curPeriodIndex = curPlay.about.period - 1;
			let penaltyTeamId = curPlay.team.id;
			let curPenaltyOn;

			if (curPeriodIndex < periods.length) {
				_.forEach(curPlay.players, (player) => {
					if (player.playerType === "PenaltyOn") {
						curPenaltyOn = {
							name: player.player.fullName,
							photo: `${CONSTANTS.imgUrl.player.base}${player.player.id}${CONSTANTS.imgUrl.player.ext}`,
						}
					}
				});

				let playDetail = {
					time: curPlay.about.periodTime,
					teamId: penaltyTeamId,
					penaltyOn: curPenaltyOn,
					penaltyType: curPlay.result.secondaryType,
					penaltyMin: curPlay.result.penaltyMinutes,
				}

				periodPlays[curPeriodIndex].penalties.push(playDetail);
			}
		});

		return periodPlays;
	}
}

export default new GameDetailService();
