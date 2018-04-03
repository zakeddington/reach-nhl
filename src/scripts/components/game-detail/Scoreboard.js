import React, { Component } from 'react';
import Loader from '../Loader';

class Scoreboard extends Component {

	getPeriodGoals(data) {
		let goals = _.map(data, (goal) => {
			return (
				<span key={Math.random()} className="scoreboard-item">{goal}</span>
			)
		})

		return (
			<div>
				{goals}
			</div>
		)
	}

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		if (data.isPreview) {
			return null;
		}

		return (
			<div className="scoreboard">
				<h3 className="header-title">{data.gameStatus}</h3>
				<div className="scoreboard-results">
					<div className="scoreboard-teams">
						<span className="scoreboard-item">&nbsp;</span>
						<span className="scoreboard-item">{data.teams.away.name}</span>
						<span className="scoreboard-item">{data.teams.home.name}</span>
					</div>
					{
						_.map(data.periodGoals, (periods) => {
							return (
								<div key={Math.random()} className="col scoreboard-periods">
									{this.getPeriodGoals(periods)}
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}

	render() {
		let data = this.props.gameDetail;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default Scoreboard;
