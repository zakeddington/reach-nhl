import React, { Component } from 'react';
import Loader from './Loader';
import Logo from './Logo';

class GameDetailHeader extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		return (
			<header className="game-detail-header">
				<div className="col team-away">
					<Logo teamId={data.teams.away.id} />
					<div className="team-name">
						<span className="city">{data.teams.away.city}</span>
						<span className="name">{data.teams.away.name}</span>
						<span className="record">{data.teams.away.record}</span>
					</div>
					{
						!data.isPreview &&
						<div className="team-score">{data.teams.away.score}</div>
					}
				</div>
				<div className="col game-date">
					<span className="game-date">{data.date}</span>
					{
						data.isPreview &&
						<span className="game-time">{data.gameState}</span>
					}
				</div>
				<div className="col team-home">
					{
						!data.isPreview &&
						<div className="team-score">{data.teams.home.score}</div>
					}
					<div className="team-name">
						<span className="city">{data.teams.home.city}</span>
						<span className="name">{data.teams.home.name}</span>
						<span className="record">{data.teams.home.record}</span>
					</div>
					<Logo teamId={data.teams.home.id} />
				</div>
			</header>
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

export default GameDetailHeader;
