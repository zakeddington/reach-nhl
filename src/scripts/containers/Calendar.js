// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
// import './Calendar.css';
import * as gamesActions from '../store/schedule/actions';
import * as gamesSelectors from '../store/schedule/reducer';
import CalendarNav from '../components/CalendarNav';
import CalendarResults from '../components/CalendarResults';

class Calendar extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		this.props.dispatch(gamesActions.fetchCalendar());
		this.props.dispatch(gamesActions.fetchGames('2017-09-01', '2017-09-30'));
		this.selectedNavItem = 'September';
	}

	render() {
		console.warn('render this.props', this.props);
		if (!this.props.games) {
			return this.renderLoading();
		}
		return (
			<div className="site-content container">
				<h2>2017-2018 Season</h2>
				<CalendarNav calendar={this.props.calendar} onClick={this.onMonthClick} selectedNavItem={this.selectedNavItem} />
				<CalendarResults games={this.props.games} />
			</div>
		);
	}

	renderLoading() {
		return (
			<p>Loading...</p>
		);
	}

	onMonthClick(startDate, endDate, monthName) {
		this.props.dispatch(gamesActions.fetchGames(startDate, endDate));
		this.selectedNavItem = monthName;
	}
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
	const calendar = gamesSelectors.getCalendar(state);
	const games = gamesSelectors.getGames(state);
	return {
		calendar,
		games,
	};
}

export default connect(mapStateToProps)(Calendar);
