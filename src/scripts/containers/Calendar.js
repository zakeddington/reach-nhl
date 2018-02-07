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
import ListMonths from '../components/ListMonths';
import ListGames from '../components/ListGames';

class Calendar extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		this.props.dispatch(gamesActions.fetchCalendar());
		this.props.dispatch(gamesActions.fetchGames('2017-09-01', '2017-09-30'));
	}

	render() {
		console.warn('render this.props', this.props);
		if (!this.props.games) {
			return this.renderLoading();
		}
		return (
			<div className="calendar-view">
				<h3>Calendar</h3>
				<ListMonths calendar={this.props.calendar} onClick={this.onMonthClick} />
				<ListGames games={this.props.games} />
			</div>
		);
	}

	renderLoading() {
		return (
			<p>Loading...</p>
		);
	}

	renderRow(topicUrl, topic) {
		const selected = this.props.selectedTopicsByUrl[topicUrl];
		return (
			<ListGames
				rowId={topicUrl}
				onClick={this.onRowClick}
				selected={selected}>
				<h3>{topic.title}</h3>
				<p>{topic.description}</p>
			</ListGames>
		)
	}

	onRowClick(topicUrl) {
		this.props.dispatch(gamesActions.selectTopic(topicUrl));
	}

	onMonthClick(startDate, endDate) {
		this.props.dispatch(gamesActions.fetchGames(startDate, endDate));
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
		// selectedTopicsByUrl: gamesSelectors.getSelectedTopicsByUrl(state),
		// canFinalizeSelection: gamesSelectors.isGameSelectionValid(state)
	};
}

export default connect(mapStateToProps)(Calendar);
