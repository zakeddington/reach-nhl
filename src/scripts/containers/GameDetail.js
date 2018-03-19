// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import './Calendar.css';
import * as gamesActions from '../store/game-detail/actions';
import * as gamesSelectors from '../store/game-detail/reducer';

class GameDetail extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		let path = this.props.location.pathname;
		let gameId = path.match(/([^/]*)\/*$/)[1];
		console.log('game detail componentDidMount gameId', gameId);
		this.props.dispatch(gamesActions.fetchGameDetail(gameId));
	}

	render() {
		let gameDetail = this.props.gameDetail;

		return (
			<div className="site-content container">
				<h2>Game Detail</h2>
				<div className="team-row team-away">
					<span className="team-name">{gameDetail.teamAway}</span>
					<span className="team-score">{gameDetail.teamAwayScore}</span>
				</div>
				<div className="team-row team-home">
					<span className="team-name">{gameDetail.teamHome}</span>
					<span className="team-score">{gameDetail.teamHomeScore}</span>
				</div>
			</div>
		);
	}
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
	const gameDetail = gamesSelectors.getGameDetail(state);
	return {
		gameDetail,
	};
}

export default connect(mapStateToProps)(GameDetail);
