import React, { Component } from 'react';
import autoBind from 'react-autobind';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class DatepickerTrigger extends Component {
	render () {
		return (
			<button className="datepicker-trigger" onClick={this.props.onClick} value={this.props.value}>
				<svg className="icon-calendar">
					<use xlinkHref="/assets/images/icons.svg#icon-calendar"></use>
				</svg>
			</button>
		)
	}
}

class ScheduleNav extends Component {

	constructor(props) {
		super(props);
		autoBind(this);
	}

	componentWillMount() {
		let today = moment();
		this.setNavDates(today);
	}

	setNavDates(dateObj) {
		const curDay = dateObj;

		let navDates = [
			{
				day: curDay.clone().subtract(3, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().subtract(2, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().subtract(1, 'days'),
				isActive: false,
			},
			{
				day: curDay,
				isActive: true,
			},
			{
				day: curDay.clone().add(1, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().add(2, 'days'),
				isActive: false,
			},
			{
				day: curDay.clone().add(3, 'days'),
				isActive: false,
			}
		];

		this.setState({
			selectedDate: curDay,
			navDates: navDates
		});
	}

	onNavClick(e, dateObj) {
		e.preventDefault();

		let curDateObj = dateObj;
		let curNavDates = this.state.navDates;
		let urlDate = curDateObj.day.format('YYYY-MM-DD');

		_.forEach(curNavDates, (navDate) => {
			if (curDateObj.day === navDate.day) {
				navDate.isActive = true;
			} else {
				navDate.isActive = false;
			}
		});

		this.setState({
			selectedDate: curDateObj.day,
			navDates: curNavDates
		});

		this.props.fetchGames(urlDate, urlDate);
	}

	onDatePickerChange(dateObj) {
		let urlDate = dateObj.format('YYYY-MM-DD');

		this.setNavDates(dateObj);
		this.props.fetchGames(urlDate, urlDate);
	}

	createNavDays(dateObj) {
		let displayDay = dateObj.day.format('ddd, MMM D');

		let	navItem = <button disabled={dateObj.isActive} onClick={(e) => this.onNavClick(e, dateObj)}>
				{displayDay}
			</button>;

		return navItem;
	}

	render() {
		let navDates = this.state.navDates;

		return (
			<div className="schedule-nav">
				<DatePicker
					customInput={<DatepickerTrigger />}
					selected={this.state.selectedDate}
					onChange={this.onDatePickerChange}
					todayButton="Today" />
				<ul className="schedule-nav-items">
					{
						navDates.map((navDate) => {
							return (
								<li key={navDate.day}>
									{this.createNavDays(navDate)}
								</li>
							);
						})
					}
				</ul>
			</div>
		)
	}
}

export default ScheduleNav;
