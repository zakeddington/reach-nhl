import React, { Component } from 'react';

class GameDetailHeader extends Component {

	render() {
		let data = this.props.gameDetail;

		return (
			<header className="game-detail-header">
				<div className="col team-away">
					<div className="team-name">
						<span className="city">{data.teamAwayCity}</span>
						<span className="name">{data.teamAwayName}</span>
						<span className="record">{data.teamAwayRecord}</span>
					</div>
					<div className="team-score">{data.teamAwayScore}</div>
				</div>
				<div className="col game-date">{data.date}</div>
				<div className="col team-home">
					<div className="team-name">
						<span className="city">{data.teamHomeCity}</span>
						<span className="name">{data.teamHomeName}</span>
						<span className="record">{data.teamHomeRecord}</span>
					</div>
					<div className="team-score">{data.teamHomeScore}</div>
				</div>
			</header>
		);
	}
}

export default GameDetailHeader;
