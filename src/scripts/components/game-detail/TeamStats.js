import React, { Component } from 'react';
import Loader from '../Loader';
import Logo from '../Logo';

class TeamStats extends Component {

	getTeamStats(data, name) {
		let stats = data.teamStats.teamSkaterStats;
		let teamId = data.team.id;
		let teamName = name;

		return (
			<tr key={data.team.name}>
				<td className="team-stats-team">
					<Logo teamId={teamId} />
					<span className="team-stats-team-name">{teamName}</span>
				</td>
				<td>{stats.shots}</td>
				<td>{stats.faceOffWinPercentage}</td>
				<td>{stats.powerPlayGoals}/{stats.powerPlayOpportunities}</td>
				<td>{stats.pim}</td>
				<td>{stats.hits}</td>
				<td>{stats.blocked}</td>
				<td>{stats.giveaways}</td>
				<td>{stats.takeaways}</td>
			</tr>
		)
	}

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		if (data.isPreview) {
			return null;
		}

		return (
			<div className="team-stats">
				<h3 className="header-title">Team Stats</h3>
				<table>
					<thead>
						<tr>
							<th></th>
							<th className="tooltip">SOG <span className="tooltip-content">Shots on Goal</span></th>
							<th className="tooltip">FO% <span className="tooltip-content">Faceoff Win Percentage</span></th>
							<th className="tooltip">PP <span className="tooltip-content">Power Play Goals/Opportunities</span></th>
							<th className="tooltip">PIM <span className="tooltip-content">Penalty Minutes</span></th>
							<th className="tooltip">HT <span className="tooltip-content">Hits</span></th>
							<th className="tooltip">BS <span className="tooltip-content">Blocked Shots</span></th>
							<th className="tooltip">GV <span className="tooltip-content">Giveaways</span></th>
							<th className="tooltip">TK <span className="tooltip-content">Takeaways</span></th>
						</tr>
					</thead>
					<tbody>
						{
							this.getTeamStats(data.boxscoreTeams.away, data.teams.away.name)
						}
						{
							this.getTeamStats(data.boxscoreTeams.home, data.teams.home.name)
						}
					</tbody>
				</table>
			</div>
		);
	}

	render() {
		let data = this.props.gameDetail;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default TeamStats;
