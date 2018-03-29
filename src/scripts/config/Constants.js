/**
 * Constants
 * @description  Defines application constants
 */

const Constants = {
	lang: 'en-US',

	dateOptions: {
		weekday : 'long',
		year    : 'numeric',
		month   : 'long',
		day     : 'numeric',
	},

	timeOptions: {
		timeZone     : 'America/New_York',
		hour         : '2-digit',
		minute       : '2-digit',
		timeZoneName : 'short',
	},

	isMobileView: null,
	isTabletView: null,
	isDesktopView: null,

	currentBreakpoint: null,

	breakpoints: {
		1: 'mobile',
		2: 'tablet',
		3: 'desktop'
	}
};

export default Constants;
