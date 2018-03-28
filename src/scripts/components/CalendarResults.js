import React, { Component } from 'react';

class CalendarResults extends Component {

	onClick(e) {
		// e.preventDefault();
	}

	render() {
		let dates;

		if (this.props.games) {
			dates = this.props.games.map((date) => {

				let games = date.games.map((game, i) => {
						let classGameStatus = '';

						if (game.gameState.includes("Final")) {
							if (game.teamHomeScore > game.teamAwayScore) {
								classGameStatus = 'is-home-winner';
							} else {
								classGameStatus = 'is-away-winner';
							}
						} else if (game.gameState === "Preview") {
							classGameStatus = 'is-preview';
						}

						return(
							<li key={game.id} className={classGameStatus}>
								<a href={`/game/${game.id}`} onClick={(e) => this.onClick(e)}>
									<div className="game-state">{game.gameState}</div>
									<div className="team-row team-away">
										<span className="team-name">{game.teamAway}
											<span className="team-record">({game.teamAwayRecord})</span>
										</span>
										<span className="team-score">{game.teamAwayScore}</span>
									</div>
									<div className="team-row team-home">
										<span className="team-name">{game.teamHome}
											<span className="team-record">({game.teamHomeRecord})</span>
										</span>
										<span className="team-score">{game.teamHomeScore}</span>
									</div>
								</a>
							</li>
						)
				});

				return(
					<div key={date.date}>
						<h3>{date.date}</h3>
						<ul className="calendar-results">
							{games}
						</ul>
					</div>
				)
			});
		}

		return (
			<div className="calendar-container">
				{dates}
			</div>
		);
	}
}

export default CalendarResults;
