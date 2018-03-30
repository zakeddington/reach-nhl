import React, { Component } from 'react';
import autoBind from 'react-autobind';
import CONSTANTS from '../config/Constants';

class Logo extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

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
