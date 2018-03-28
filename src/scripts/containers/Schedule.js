// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import * as gamesActions from '../store/schedule/actions';
import * as gamesSelectors from '../store/schedule/reducer';
import ScheduleNav from '../components/ScheduleNav';
import ScheduleResults from '../components/ScheduleResults';

class Schedule extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		this.props.dispatch(gamesActions.fetchScheduleNav());
		this.props.dispatch(gamesActions.fetchScheduleGames('2018-03-01', '2018-03-31'));
		this.selectedNavItem = 'March';
	}

	render() {
		console.warn('render this.props', this.props);
		if (!this.props.scheduleGames) {
			return this.renderLoading();
		}
		return (
			<div className="site-content container">
				<h2>2017-2018 Season</h2>
				<ScheduleNav scheduleNav={this.props.scheduleNav} onClick={this.onMonthClick} selectedNavItem={this.selectedNavItem} />
				<ScheduleResults scheduleGames={this.props.scheduleGames} />
			</div>
		);
	}

	renderLoading() {
		return (
			<p>Loading...</p>
		);
	}

	onMonthClick(startDate, endDate, monthName) {
		this.props.dispatch(gamesActions.fetchScheduleGames(startDate, endDate));
		this.selectedNavItem = monthName;
	}
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
	const scheduleNav = gamesSelectors.getScheduleNav(state);
	const scheduleGames = gamesSelectors.getScheduleGames(state);
	return {
		scheduleNav,
		scheduleGames,
	};
}

export default connect(mapStateToProps)(Schedule);
