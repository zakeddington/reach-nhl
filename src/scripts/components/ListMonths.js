import React, { Component } from 'react';

class ListMonths extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	// componentDidMount() {
	//
	// }

	onClick(startDate, endDate) {
		console.log('click', startDate, endDate);
		if (typeof this.props.onClick === 'function') {
			this.props.onClick(startDate, endDate);
		}
	}

	render() {
		return (
			<ul className="list-months">
				{
					this.props.calendar.map((month, i) => {
						return(
							<li key={month.name} onClick={() => this.onClick(month.startDate, month.endDate)}>
								{month.name}
							</li>
						);
					})
				}
			</ul>
		);
	}
}

export default ListMonths;
