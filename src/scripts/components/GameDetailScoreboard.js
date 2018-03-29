import React, { Component } from 'react';
import Loader from './Loader';

class GameDetailScoreboard extends Component {

	getPeriodGoals(data) {
		let goals = _.map(data, (goal) => {
			return (
				<span key={Math.random()} className="item goals">{goal}</span>
			)
		})

		return (
			<div className="period">
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
			<div className="game-detail-scoreboard">
				<div className="col teams">
					<span className="item">{data.gameState}</span>
					<span className="item name">{data.teams.away.name}</span>
					<span className="item name">{data.teams.home.name}</span>
				</div>
				{
					_.map(data.periodGoals, (periods) => {
						return (
							<div key={Math.random()} className="col periods">
								{this.getPeriodGoals(periods)}
							</div>
						)
					})
				}
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

export default GameDetailScoreboard;
