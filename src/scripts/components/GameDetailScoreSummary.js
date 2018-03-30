import React, { Component } from 'react';

class GameDetailScoreSummary extends Component {

	renderContent(data) {
		let periods = data.map((period) => {
			let goals = period.goals.map((goal) => {
				return (
					<div key={goal.time} className="score-summary-results">
						<div className="score-summary-photo">
							<div className="photo">
								<img src={goal.scorer.photo} alt={goal.scorer.name} />
							</div>
						</div>
						<div className="score-summary-players">
							<span className="scorer">
								<span className="name">{goal.scorer.name} ({goal.scorer.total}),</span>
								<span className="desc">{goal.scorer.desc}</span>
							</span>
							<span className="assists">
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
						<div className="score-summary-game">
							<span className={`score team-${goal.teamId} team-border`}>
								<span className={goal.score.away.isScoringTeam ? 'team-background' : ''}>{goal.score.away.name}&nbsp;&nbsp;{goal.score.away.goals}</span>
								<span className={goal.score.home.isScoringTeam ? 'team-background' : ''}>{goal.score.home.name}&nbsp;&nbsp;{goal.score.home.goals}</span>
							</span>
							<span className="time">{goal.time}</span>
						</div>
					</div>
				)
			});

			if (!goals.length) {
				goals =
					<div className="score-summary-results">
						<div className="score-summary-no-goals">No Goals</div>
					</div>;
			}

			return (
				<div key={period.periodName} className="score-summary-period">
					<div className="score-summary-header">
						<h3>{period.periodName} Period</h3>
					</div>
					{goals}
				</div>
			)
		});

		return (
			<div className="game-detail-score-summary">
				<h2>Scoring Summary</h2>
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

export default GameDetailScoreSummary;
