import React, { Component } from 'react';

class ScoringSummary extends Component {

	renderContent(data) {
		let periods = data.map((period) => {
			let goals = period.goals.map((goal) => {
				return (
					<div key={goal.time} className="scoring-summary-results">
						<div className="scoring-summary-photo">
							<div className="photo">
								<img src={goal.scorer.photo} alt={goal.scorer.name} />
							</div>
						</div>
						<div className="scoring-summary-players">
							<span className="scoring-summary-scorer">
								<span className="scoring-summary-name">{goal.scorer.name} ({goal.scorer.total}),</span>
								<span className="scoring-summary-desc">{goal.scorer.desc}</span>
							</span>
							<span className="scoring-summary-assists">
								{
									_.map(goal.assists, (assist, i) => {
										return (
											<span key={assist.name}>
												{assist.name} ({assist.total}){i < goal.assists.length - 1 && ', '}
											</span>
										)
									})
								}
							</span>
						</div>
						<div className="scoring-summary-game">
							<span className={`scoring-summary-score team-${goal.teamId} team-border`}>
								<span className={goal.score.away.isScoringTeam ? 'team-background' : ''}>{goal.score.away.name}&nbsp;&nbsp;{goal.score.away.goals}</span>
								<span className={goal.score.home.isScoringTeam ? 'team-background' : ''}>{goal.score.home.name}&nbsp;&nbsp;{goal.score.home.goals}</span>
							</span>
							<span className="scoring-summary-time">{goal.time}</span>
						</div>
					</div>
				)
			});

			if (!goals.length) {
				goals =
					<div className="scoring-summary-results">
						<div className="scoring-summary-no-goals">No Goals</div>
					</div>;
			}

			return (
				<div key={period.periodName} className="scoring-summary-period">
					<h3 className="scoring-summary-title">{period.periodName} Period</h3>
					{goals}
				</div>
			)
		});

		return (
			<div className="scoring-summary">
				<h2 className="header-title">Scoring Summary</h2>
				{periods}
			</div>
		);
	}

	render() {
		let data = this.props.scoringSummary;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return null;
	}
}

export default ScoringSummary;
