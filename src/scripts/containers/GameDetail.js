// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as gamesActions from '../store/game-detail/actions';
import * as gamesSelectors from '../store/game-detail/reducer';
import Header from '../components/GameDetailHeader';
import BoxScore from '../components/GameDetailBoxScore';

class GameDetail extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		let path = this.props.location.pathname;
		let gameId = path.match(/([^/]*)\/*$/)[1];

		this.props.dispatch(gamesActions.fetchGameDetail(gameId));
	}

	render() {

		return (
			<div className="site-content container">
				<Header gameDetail={this.props.gameDetail} />
				<BoxScore gameDetail={this.props.gameDetail} />
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
