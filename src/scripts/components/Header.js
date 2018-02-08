import React, { Component } from 'react';

class Header extends Component {
	render() {
		return (
			<header className="site-header">
				<div className="container">
					<h1>NHL Game Stats</h1>
					{/*
					<div className="header--logo">
						 <img src='assets/img/banner.png' alt="POP"/>
					</div>
					*/}
				</div>
			</header>
		);
	}
}

export default Header;
