import React, { Component } from 'react';
import Icon from './Icon';

class VideoPlayer extends Component {

	state = {
		showVideo: this.props.showVideo
	}

	onClick() {
		this.setState({showVideo: true});
	}

	renderPoster() {
		return(
			<button className="video-trigger" onClick={() => this.onClick()}>
				<img src={this.props.poster} alt={this.props.altText} />
				<Icon iconId="play-circle-filled" />
			</button>
		)
	}

	renderVideo() {
		return(
			<video src={this.props.video} poster={this.props.poster} controls autoPlay="true" />
		)
	}

	render() {
		if (this.state.showVideo) {
			return this.renderVideo();
		}

		return this.renderPoster();
	}
}

export default VideoPlayer;
