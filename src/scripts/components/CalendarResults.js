import React, { Component } from 'react';

class CalendarResults extends Component {

	onClick(e) {
		e.preventDefault();
	}

	render() {
		let dates;

		if (this.props.games) {
			dates = this.props.games.map((date) => {

				let games = date.games.map((game, i) => {
						let classGameStatus;

						switch (game.gameState) {
							case "Final":
								if (game.teamHomeScore > game.teamAwayScore) {
									classGameStatus = 'is-home-winner';
								} else {
									classGameStatus = 'is-away-winner';
								}
								break;
							case "Preview":
								classGameStatus = 'is-preview';
								break;
							default:
								classGameStatus = '';
								break;
						}

						return(
							<li key={game.id} className={classGameStatus}>
								<a href={`game/${game.id}`} onClick={(e) => this.onClick(e)}>
									<div className="team-row team-away">
										<span className="team-name">{game.teamAway}</span>
										<span className="team-score">{game.teamAwayScore}</span>
									</div>
									<div className="team-row team-home">
										<span className="team-name">{game.teamHome}</span>
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
