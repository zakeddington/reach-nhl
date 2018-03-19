import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendar from './Calendar';
import GameDetail from './GameDetail';

class App extends Component {

	render() {
		return (
			<div className="app">
				<Header/>
				<Switch>
					<Route exact path="/" component={Calendar} />
					<Route path="/game/:id" component={GameDetail} />
					<Redirect to="/" />
				</Switch>
				<Footer/>
			</div>
		);
	}

}

// injects needed parts of the global state to the component through props
// in this case we pass everything
function mapStateToProps(state, ownProps) {
	return state;
}

// connect this component with the store
// and inject 'dispatch' store function through props
export default connect(mapStateToProps)(App);
