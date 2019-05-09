/* eslint-disable no-undef */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');

// Get our file path variables
const CONFIG_PATHS = require('./webpack.config.paths');

// Are we running the 'dev' task?
const IS_DEV = (process.env.npm_lifecycle_event === 'dev');

// Shared options between multiple loaders
const OPTIONS = {
	minimize: (IS_DEV ? false : true),  // minimize output in production
	sourceMap: (IS_DEV ? true : false), // apply sourcemaps in dev (only applies when devtool prop is set)
};

// Base config gets merged in environment specific config files
module.exports = {
	//
	// Define our entry files
	//
	entry: {
		vendor: ['@babel/polyfill'],
		app: [`${CONFIG_PATHS.src.scripts}/app.js`, `${CONFIG_PATHS.src.styles}/app.scss`],
	},
	optimization: {
		namedModules: true,
		runtimeChunk: true,
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				commons: { // combine shared code between entry points
					name: 'commons',
					chunks: 'initial',
					minChunks: 2
				},
			}
		},
		runtimeChunk: {
			name: 'manifest', // consolidate webpack's map of all modules into one 'manifest' file
		}
	},
	//
	// Define our output files
	//
	output: {
		filename: `${CONFIG_PATHS.output.scripts}/[name].js`, // JS filenames only. CSS files are created by ExtractTextPlugin
		path: CONFIG_PATHS.dist.root, // location of all compiled files
		publicPath: CONFIG_PATHS.output.root // path used to reference files on the frontend
	},
	//
	// Define our plugins
	//
	plugins: [
		new webpack.DefinePlugin(process.env.NODE_ENV),
		// Speed up compile times
		new HardSourceWebpackPlugin(),
		// Create our JS entry files and
		// consolidate webpack's map of all modules into one 'manifest' file
		// new webpack.optimize.CommonsChunkPlugin({
		// 	names: ['app', 'vendor', 'manifest'],
		// 	minChunks: Infinity,
		// }),
		// Lint our CSS
		new StyleLintPlugin(),
		// Create our CSS entry files
		new MiniCssExtractPlugin({
			filename: `${CONFIG_PATHS.output.styles}/[name].css`,
		}),
		new HtmlWebPackPlugin({
			inject: true,
			template: `${CONFIG_PATHS.src.html}/index.ejs`,
		}),
	],
	//
	// Define shortcuts for import/require paths
	//
	resolve: {
		extensions: [
			'.js',
			'.jpg', '.jpeg', '.png', '.gif', '.svg',
		],
		alias: {
			scripts: path.resolve(__dirname, CONFIG_PATHS.src.scripts),
			images: path.resolve(__dirname, CONFIG_PATHS.src.images),
		}
	},
	//
	// Define our loaders
	//
	module: {
		rules: [
			// Images that are imported in JS
			// (images from CSS/HTML are handled in CopyWebpackPlugin or devServer.contentBase)
			{
				test: /\.(svg|png|gif|jpe?g)/i,
				include: CONFIG_PATHS.src.images,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: CONFIG_PATHS.src.root,
							publicPath: CONFIG_PATHS.output.root,
						}
					}
				]
			},
			// Sass
			{
				test: /\.scss$/,
				include: CONFIG_PATHS.src.styles,
				use: [
					'css-hot-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							sourceMap: OPTIONS.sourceMap,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							sourceMap: OPTIONS.sourceMap,
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: OPTIONS.sourceMap,
						}
					}
				]
			},
			// HTML using EJS templates
			{
				test: /\.ejs$/,
				loader: 'compile-ejs-loader',
				include: CONFIG_PATHS.src.html,
			},
			// JS linter
			{
				enforce: 'pre',
				test: /\.js$/,
				include: CONFIG_PATHS.src.scripts,
				exclude: /node_modules/,
				loader: 'eslint-loader',
			},
			// JS transpiler
			{
				test: /\.js$/,
				include: CONFIG_PATHS.src.scripts,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env', 'react-app'],
						compact: OPTIONS.minimize,
					}
				}
			}
		]
	}
};
