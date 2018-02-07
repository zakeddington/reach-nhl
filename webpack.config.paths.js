/* eslint-disable no-undef */
const path = require('path');

// Default paths for configs so we don't have to hardcode them everywhere
module.exports = {
	// path on disk for source files
	src : {
		root    : path.join(__dirname, './src'),
		assets  : path.join(__dirname, './src/assets'),
		images  : path.join(__dirname, './src/assets/images'),
		html    : path.join(__dirname, './src/html'),
		scripts : path.join(__dirname, './src/scripts'),
		styles  : path.join(__dirname, './src/styles'),
	},
	// path on disk for compiled files
	dist : {
		root    : path.join(__dirname, './dist'),
		assets  : path.join(__dirname, './dist/assets'),
	},
	// how do we reference compiled files on the frontend?
	output : {
		root    : '/',
		scripts : 'assets/js',
		styles  : 'assets/css',
	}
};
