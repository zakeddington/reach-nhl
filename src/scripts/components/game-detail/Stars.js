import React, { Component } from 'react';
import Loader from '../Loader';
import PlayerPhoto from '../PlayerPhoto';

class Stars extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		if (data.isPreview || !data.stars) {
			return null;
		}

		let stars = _.map(data.stars, (star) => {
			return (
				<div key={Math.random()} className="stars-player">
					<PlayerPhoto photoUrl={star.photo} />
					<span className="stars-name">
						{star.name}
						<span className="stars-team-name">{star.teamName}</span>
					</span>
					<span className="stars-stat">{star.stat1}</span>
					<span className="stars-stat">{star.stat2}</span>
				</div>
			)
		})

		return (
			<div className="stars">
				<h3 className="header-title">Stars of the Game</h3>
				<div className="stars-container">
					{stars}
				</div>
			</div>
		);
	}

	render() {
		let data = this.props.gameDetail;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default Stars;
