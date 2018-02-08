import React, { Component } from 'react';

class CalendarNav extends Component {

	onClick(e, month) {
		e.preventDefault();
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(month.startDate, month.endDate, month.name);
		}
	}

	createNavItem(month) {
		let navItem;

		if (this.props.selectedNavItem === month.name) {
			navItem = <span>{month.name}</span>;
		} else {
			navItem = <a href={month.name} onClick={(e) => this.onClick(e, month)}>
				{month.name}
			</a>;
		}

		return navItem;
	}

	render() {
		return (
			<ul className="calendar-nav">
				{
					this.props.calendar.map((month, i) => {
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

export default CalendarNav;
