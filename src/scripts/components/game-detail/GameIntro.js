import React, { Component } from 'react';
import Loader from '../Loader';

class GameIntro extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		return (
			<div className="game-intro">
				<h2>{data.title}</h2>
				<p>{data.desc}</p>
				<div className="game-intro-media">
					{
						data.isRecap ? (
							<video src={data.recapVideo} poster={data.recapPoster} controls />
						) : (
							<img src={data.poster} alt={data.posterAltText} />
						)
					}
				</div>
			</div>
		);
	}

	render() {
		let data = this.props.gameContent;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default GameIntro;
