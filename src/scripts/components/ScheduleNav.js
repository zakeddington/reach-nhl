import React, { Component } from 'react';

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

	render() {
		return (
			<ul className="schedule-nav">
				{
					this.props.scheduleNav.map((month, i) => {
						return(
							<li key={month.name}>
								{this.createNavItem(month)}
							</li>
						);
					})
				}
			</ul>
		);
	}
}

export default ScheduleNav;
