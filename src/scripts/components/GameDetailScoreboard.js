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

		let stars = _.map(data.stars, (star) => {
			return (
				<div key={Math.random()} className="star">
					<span className="photo">
						<img src={star.photo} alt={star.name} />
					</span>
					<span className="name">
						{star.name}
						<span className="team-name">{star.teamName}</span>
					</span>
					<span className="stat">{star.stat1}</span>
					<span className="stat">{star.stat2}</span>
				</div>
			)
		})

		return (
			<div className="game-detail-scoreboard">
				<div className="scoreboard-container">
					<h3 className="header-title">{data.gameState}</h3>
					<div className="scoreboard">
						<div className="col teams">
							<span className="item">&nbsp;</span>
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
				</div>
				<div className="stars-container">
					<h3 className="header-title">Stars of the Game</h3>
					<div className="stars">
						{stars}
					</div>
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

export default GameDetailScoreboard;
