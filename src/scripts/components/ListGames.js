import React, { Component } from 'react';

class ListGames extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	// componentDidMount() {
	//
	// }

	render() {
		let listItems;

		if (this.props.games) {
			listItems = this.props.games.map(function(game, i) {
				let curGame;

				switch (game.gameState) {
					case "Final":
						if (game.teamHomeScore > game.teamAwayScore) {
							curGame = <span><strong>{game.teamHome} ({game.teamHomeScore})</strong> vs {game.teamAway} ({game.teamAwayScore})</span>;
						} else {
							curGame = <span>{game.teamHome} ({game.teamHomeScore}) vs <strong>{game.teamAway} ({game.teamAwayScore})</strong></span>;
						}
						break;
					case "Preview":
						curGame = <span>{game.teamHome} vs {game.teamAway}</span>
						break;
					default:
						curGame = <span>{game.teamHome} ({game.teamHomeScore}) vs {game.teamAway} ({game.teamAwayScore})</span>
						break;
				}

				return(
					<p key={game.id} data-url={game.url}>
						{game.date}<br />
						{curGame}
					</p>
				)
			})
		}

		return (
			<div className="list-games">
				{listItems}
			</div>
		);
	}
}

export default ListGames;
