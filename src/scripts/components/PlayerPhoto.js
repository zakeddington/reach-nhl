import React, { Component } from 'react';

class PlayerPhoto extends Component {
	render() {
		return (
			<div className="player-photo">
				<div className="photo" style={{backgroundImage: `url(${this.props.photoUrl})`}}></div>
			</div>
		);
	}
}

export default PlayerPhoto;
