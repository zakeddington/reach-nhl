import React, { Component } from 'react';

class GameDetailScoreboard extends Component {

	getPeriodGoals(data) {
		let goals = _.map(data, (goal) => {
			return <span key={Math.random()} className="item goals">{goal}</span>
		})

		return(
			<div className="period">
				{goals}
			</div>
		)
	}

	render() {
		let data = this.props.gameDetail;

		if (data.isPreview) {
			return null;
		}

		return (
			<header className="game-detail-scoreboard">
				<div className="col teams">
					<span className="item">{data.gameState}</span>
					<span className="item name">{data.teamAwayName}</span>
					<span className="item name">{data.teamHomeName}</span>
				</div>
				{
					_.map(data.periodGoals, (periods) => {
						return(
							<div key={Math.random()} className="col periods">
								{this.getPeriodGoals(periods)}
							</div>
						)
					})
				}
			</header>
		);
	}
}

export default GameDetailScoreboard;
