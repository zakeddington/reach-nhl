import React, { Component } from 'react';
import autoBind from 'react-autobind';

class PlayerPhoto extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	render() {
		return (
			<div className="photo-container">
				<div className="photo" style={{backgroundImage: `url(${this.props.photoUrl})`}}></div>
			</div>
		);
	}
}

export default PlayerPhoto;
