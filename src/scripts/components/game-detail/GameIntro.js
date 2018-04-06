import React, { Component } from 'react';
import Loader from '../Loader';
import VideoPlayer from '../VideoPlayer';

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
							<VideoPlayer showVideo={false} poster={data.recapPoster} video={data.recapVideo} altText={data.posterAltText} />
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
