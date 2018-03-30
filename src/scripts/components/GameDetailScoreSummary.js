import React, { Component } from 'react';
import Loader from './Loader';

class GameDetailScoreSummary extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		// if (data.isPreview) {
		// 	return null;
		// }
		let periods = data.map((period) => {
			let goals = period.goals.map((goal) => {
				return (
					<div key={goal.time} className="score-summary-results">
						<div class="players">
							<span className="scorer">
								{goal.scorer.name} ({goal.scorer.total})
							</span>
							<span className="assists">
								{
									_.map(goal.assists, (assist) => {
										return (
											<span key={assist.name}>
												{assist.name} ({assist.total})
											</span>
										)
									})
								}
							</span>
						</div>
						<div class="score">
							{goal.score.away.name} {goal.score.away.goals} - {goal.score.home.name} {goal.score.home.goals}
						</div>
					</div>
				)
			});

			return (
				<div key={period.periodName} className="score-summary-period">
					<h3>{period.periodName}</h3>
					{goals}
				</div>
			)
		});

		return (
			<div className="game-detail-score-summary">
				<h2>Scoring</h2>
				{periods}
			</div>
		);
	}

	render() {
		let data = this.props.scoringSummary;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default GameDetailScoreSummary;
