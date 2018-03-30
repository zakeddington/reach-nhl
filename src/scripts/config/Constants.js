/**
 * Constants
 * @description  Defines application constants
 */

const Constants = {
	imgUrl: {
		logoTeams: {
			base: '/assets/images/logo-teams.svg#team-',
		},
		player: {
			base: '//nhl.bamcontent.com/images/headshots/current/60x60/',
			ext: '@2x.jpg',
		}
	},

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
