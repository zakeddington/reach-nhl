// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/game-detail/actions';
import * as reducer from '../store/game-detail/reducer';
import GameHeader from '../components/game-detail/GameHeader';
import GameIntro from '../components/game-detail/GameIntro';
import Scoreboard from '../components/game-detail/Scoreboard';
import Stars from '../components/game-detail/Stars';
import TeamStats from '../components/game-detail/TeamStats';
import PeriodSummary from '../components/game-detail/PeriodSummary';

class GameDetail extends Component {

	componentDidMount() {
		let path = this.props.location.pathname;
		let gameId = path.match(/([^/]*)\/*$/)[1];

		this.props.dispatch(actions.fetchGameDetail(gameId));
		this.props.dispatch(actions.fetchGameContent(gameId));
		this.props.dispatch(actions.fetchPeriodSummary(gameId));
	}

	render() {
		return (
			<div className="site-content container">
				<GameHeader gameDetail={this.props.gameDetail} />
				<GameIntro gameContent={this.props.gameContent} />
				<div className="scoreboard-stars">
					<Scoreboard gameDetail={this.props.gameDetail} />
					<Stars gameDetail={this.props.gameDetail} />
				</div>
				<TeamStats gameDetail={this.props.gameDetail} />
				<PeriodSummary periodSummary={this.props.periodSummary} />
			</div>
		);
	}
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
	const gameDetail = reducer.getGameDetail(state);
	const gameContent = reducer.getGameContent(state);
	const periodSummary = reducer.getPeriodSummary(state);
	return {
		gameDetail,
		gameContent,
		periodSummary,
	};
}

export default connect(mapStateToProps)(GameDetail);
