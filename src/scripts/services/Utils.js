
const Utils = {

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
	},

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


export default Utils;
