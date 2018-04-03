import React, { Component } from 'react';

class GlobalHeader extends Component {
	render() {
		return (
			<header className="site-header">
				<div className="container">
					<h1><a href="/">NHL Game Stats</a></h1>
				</div>
			</header>
		);
	}
}

export default GlobalHeader;
