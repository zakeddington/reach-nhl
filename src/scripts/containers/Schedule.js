// containers are "smart" react components that are aware of redux
// they are connected to the redux store and listen on part of the app state
// they use mapStateToProps to specify which parts and use selectors to read them
// avoid having view logic & local component state in them, use "dumb" components instead

import React, { Component } from 'react';
import autoBind from 'react-autobind';
import moment from 'moment';
import { connect } from 'react-redux';
import * as actions from '../store/schedule/actions';
import * as reducer from '../store/schedule/reducer';
import ScheduleNav from '../components/schedule/ScheduleNav';
import ScheduleResults from '../components/schedule/ScheduleResults';

class Schedule extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentDidMount() {
		let dateFormat = 'YYYY-MM-DD';
		let today = moment().format(dateFormat);

		this.props.dispatch(actions.fetchScheduleGames(today, today));
	}

	render() {
		return (
			<div className="site-content container">
				<ScheduleNav fetchGames={this.onNavClick} scheduleIsLoading={this.props.scheduleIsLoading} />
				<ScheduleResults scheduleGames={this.props.scheduleGames} scheduleIsLoading={this.props.scheduleIsLoading} />
			</div>
		);
	}

	onNavClick(startDate, endDate) {
		this.props.dispatch(actions.fetchScheduleGames(startDate, endDate));
	}
}

// which props do we want to inject, given the global store state?
// always use selectors here and avoid accessing the state directly
function mapStateToProps(state) {
	const scheduleGames = reducer.getScheduleGames(state);
	const scheduleIsLoading = reducer.getScheduleLoadingState(state);
	return {
		scheduleGames,
		scheduleIsLoading,
	};
}

export default connect(mapStateToProps)(Schedule);
