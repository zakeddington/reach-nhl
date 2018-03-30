import React, { Component } from 'react';

class Loader extends Component {

	render() {
		return (
			<div className="loader">
				<div className="loader-circle bounce1"></div>
				<div className="loader-circle bounce2"></div>
				<div className="loader-circle bounce3"></div>
			</div>
		);
	}
}

export default Loader;
