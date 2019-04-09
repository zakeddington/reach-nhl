import React, { Component } from 'react';
import CONSTANTS from '../config/Constants';

class Logo extends Component {
	render() {
		let url = CONSTANTS.imgUrl.logoTeams.base + this.props.teamId;

		return (
			<svg className="team-logo">
				<use xlinkHref={url}></use>
			</svg>
		);
	}
}

export default Logo;
