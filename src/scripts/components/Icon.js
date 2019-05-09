import React, { Component } from 'react';
import CONSTANTS from '../config/Constants';

class Icon extends Component {
	render() {
		let url = CONSTANTS.imgUrl.icon.base + this.props.iconId;

		return (
			<svg className="svg-icon">
				<use xlinkHref={url}></use>
			</svg>
		);
	}
}

export default Icon;
