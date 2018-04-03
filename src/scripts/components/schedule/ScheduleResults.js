import React, { Component } from 'react';
import Loader from '../Loader';
import Logo from '../Logo';

class ScheduleResults extends Component {

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		let dates = data.map((date) => {
			let games = date.games.map((game, i) => {
					let classGameStatus = '';

					if (game.gameStatus.includes("Final")) {
						if (game.teams.home.score > game.teams.away.score) {
							classGameStatus = 'is-home-winner';
						} else {
							classGameStatus = 'is-away-winner';
						}
					} else if (game.gameStatus === "Preview") {
						classGameStatus = 'is-preview';
					}

					return (
						<li key={game.id} className={classGameStatus}>
							<a href={`/game/${game.id}`}>
								<div className="schedule-results-game-status">{game.gameStatus}</div>
								<div className="schedule-results-team away">
									<Logo teamId={game.teams.away.id} />
									<span className="schedule-results-name">{game.teams.away.name}
										<span className="schedule-results-record">({game.teams.away.record})</span>
									</span>
									<span className="schedule-results-score">{game.teams.away.score}</span>
								</div>
								<div className="schedule-results-team home">
									<Logo teamId={game.teams.home.id} />
									<span className="schedule-results-name">{game.teams.home.name}
										<span className="schedule-results-record">({game.teams.home.record})</span>
									</span>
									<span className="schedule-results-score">{game.teams.home.score}</span>
								</div>
							</a>
						</li>
					)
			});

			return (
				<div key={date.date} className="schedule-results-group">
					<h3>{date.date}</h3>
					<ul className="schedule-results-games">
						{games}
					</ul>
				</div>
			)
		});

		return (
			<div className="schedule-results">
				{dates}
			</div>
		);
	}

	render() {
		let data = this.props.scheduleGames;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default ScheduleResults;
