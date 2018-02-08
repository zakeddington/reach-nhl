import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Calendar from './Calendar';

class App extends Component {

	render() {
		return (
			<div className="app">
				<Header/>
				<Calendar />
				<Footer/>
			</div>
		);
	}

}

// injects needed parts of the global state to the component through props
// in this case we nedd and pass everything
function mapStateToProps(state) {
	return state;
}

// connect this component with the store
// and inject 'dispatch' store function through props
export default connect(mapStateToProps)(App);
