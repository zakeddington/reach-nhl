import React, { Component } from 'react';
import Loader from '../Loader';

class ScheduleNav extends Component {

	onClick(e, month) {
		e.preventDefault();
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(month.startDate, month.endDate, month.name);
		}
	}

	createNavItem(month) {
		let navItem;
		let url = month.name.toLowerCase();

		if (this.props.selectedNavItem === month.name) {
			navItem = <span>{month.name}</span>;
		} else {
			navItem = <a href={url} onClick={(e) => this.onClick(e, month)}>
				{month.name}
			</a>;
		}

		return navItem;
	}

	renderLoading() {
		return (
			<Loader />
		);
	}

	renderContent(data) {
		return (
			<ul className="schedule-nav">
				{
					data.map((month, i) => {
						return (
							<li key={month.name}>
								{this.createNavItem(month)}
							</li>
						);
					})
				}
			</ul>
		)
	}

	render() {
		let data = this.props.scheduleNav;

		if (data.length || Object.keys(data).length) {
			return this.renderContent(data);
		}

		return this.renderLoading();
	}
}

export default ScheduleNav;
