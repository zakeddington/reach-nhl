import React, { Component } from 'react';
import Logo from '../Logo';

class PeriodSummary extends Component {

	renderContent(data) {
		let periods = data.map((period) => {
			let goals = period.goals.map((goal) => {
				return (
					<div key={goal.time} className="period-summary-item">
						<div className="period-summary-logo">
							<Logo teamId={goal.teamId} />
						</div>
						<div className="period-summary-time">{goal.time}</div>
						<div className="period-summary-photo">
							<div className="photo">
								<img src={goal.scorer.photo} alt={goal.scorer.name} />
							</div>
						</div>
						<div className="period-summary-player-info">
							<span className="period-summary-player">
								<span className="period-summary-name">{goal.scorer.name} ({goal.scorer.total}),</span>
								<span className="period-summary-goal-desc">
								{goal.scorer.desc}
								{
									goal.isEmptyNet &&
									" (Empty Net)"
								}
								</span>
								{
									goal.goalType !== 'EVEN' &&
									<span className="period-summary-goal-type">
										{goal.goalType}
									</span>
								}
							</span>
							<span className="period-summary-details">
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
						<div className="period-summary-game-info">
							<span className={`period-summary-score team-${goal.teamId} team-border`}>
								<span className={goal.score.away.isScoringTeam ? 'team-background' : ''}>{goal.score.away.name}&nbsp;&nbsp;{goal.score.away.goals}</span>
								<span className={goal.score.home.isScoringTeam ? 'team-background' : ''}>{goal.score.home.name}&nbsp;&nbsp;{goal.score.home.goals}</span>
							</span>
						</div>
					</div>
				)
			});

			if (!goals.length) {
				goals =
					<div className="period-summary-item">
						<div className="period-summary-empty">No Goals</div>
					</div>;
			}

			let penalties = period.penalties.map((penalty) => {
				return (
					<div key={penalty.time} className="period-summary-item">
						<div className="period-summary-logo">
							<Logo teamId={penalty.teamId} />
						</div>
						<div className="period-summary-time">{penalty.time}</div>
						<div className="period-summary-photo">
							<div className="photo">
								<img src={penalty.penaltyOn.photo} alt={penalty.penaltyOn.name} />
							</div>
						</div>
						<div className="period-summary-player-info">
							<span className="period-summary-player">
								<span className="period-summary-name">{penalty.penaltyOn.name}</span>
							</span>
							<span className="period-summary-details">{penalty.penaltyMin} Minutes for {penalty.penaltyType}</span>
						</div>
						<div className="period-summary-game-info"></div>
					</div>
				)
			});

			if (!penalties.length) {
				penalties =
					<div className="period-summary-item">
						<div className="period-summary-empty">No Penalties</div>
					</div>;
			}

			return (
				<div key={period.periodName} className="period-summary-period">
					<h3 className="period-summary-title">{period.periodName} Period</h3>
					<div className="period-summary-subtitle">Goals</div>
					{goals}
					<div className="period-summary-subtitle">Penalties</div>
					{penalties}
				</div>
			)
		});

		return (
			<div className="period-summary">
				<h2 className="header-title">Period Summary</h2>
				{periods}
			</div>
		);
	}

	render() {
		let data = this.props.periodSummary;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return null;
	}
}

export default PeriodSummary;
