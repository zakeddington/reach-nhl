// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as actions from '../store/game-detail/actions';
import * as reducer from '../store/game-detail/reducer';
import GameHeader from '../components/game-detail/GameHeader';
import Scoreboard from '../components/game-detail/Scoreboard';
import Stars from '../components/game-detail/Stars';
import ScoringSummary from '../components/game-detail/ScoringSummary';

class GameDetail extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		let path = this.props.location.pathname;
		let gameId = path.match(/([^/]*)\/*$/)[1];

		this.props.dispatch(actions.fetchGameDetail(gameId));
		this.props.dispatch(actions.fetchScoringSummary(gameId));
	}

	render() {
		return (
			<div className="site-content container">
				<GameHeader gameDetail={this.props.gameDetail} />
				<div className="scoreboard-stars">
					<Stars gameDetail={this.props.gameDetail} />
					<Scoreboard gameDetail={this.props.gameDetail} />
				</div>
				<ScoringSummary scoringSummary={this.props.scoringSummary} />
			</div>
		);
	}
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
	const gameDetail = reducer.getGameDetail(state);
	const scoringSummary = reducer.getScoringSummary(state);
	return {
		gameDetail,
		scoringSummary,
	};
}

export default connect(mapStateToProps)(GameDetail);
