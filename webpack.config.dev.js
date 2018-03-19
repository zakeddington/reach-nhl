
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const merge = require('webpack-merge');

const CONFIG_BASE = require('./webpack.config');
const CONFIG_PATHS = require('./webpack.config.paths');

module.exports = merge(CONFIG_BASE, {
	devtool: 'cheap-module-source-map', // what type of sourcemaps do you want?
	devServer: {
		historyApiFallback: true,
		contentBase: CONFIG_PATHS.src.root, // where do source files live?
		port: 8001,
		hot: false, // don't use hmr because it duplicates css files and crashes browser
	},
	plugins: [
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
	]
});
