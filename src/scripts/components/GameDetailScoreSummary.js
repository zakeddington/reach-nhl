import React, { Component } from 'react';
import Loader from './Loader';

class GameDetailScoreSummary extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		if (data.isPreview) {
			return null;
		}

		return (
			<div className="game-detail-score-summary">
				<h2>Scoring</h2>
				<div className="col teams">
					<span className="item">{data.gameState}</span>
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

export default GameDetailScoreSummary;
