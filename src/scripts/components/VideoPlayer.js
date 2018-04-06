import React, { Component } from 'react';
import autoBind from 'react-autobind';

class VideoPlayer extends Component {

	constructor(props) {
		super(props);
		autoBind(this);

		this.state = {showVideo: this.props.showVideo};
	}

	onClick() {
		this.setState({showVideo: true});
	}

	renderPoster() {
		return(
			<button className="video-trigger" onClick={this.onClick}>
				<img src={this.props.poster} alt={this.props.altText} />
				<svg className="video-trigger-icon">
					<use xlinkHref="/assets/images/icons.svg#icon-play-circle-filled"></use>
				</svg>
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
