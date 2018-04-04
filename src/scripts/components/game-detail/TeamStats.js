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
							<th>SOG</th>
							<th>FO%</th>
							<th>PP</th>
							<th>PIM</th>
							<th>HT</th>
							<th>BS</th>
							<th>GV</th>
							<th>TK</th>
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
