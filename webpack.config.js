'use strict';

const path = require('path');
const PluginCopy = require('copy-webpack-plugin');
const PluginCSSExtract = require('extract-css-chunks-webpack-plugin');
const PluginAutoPrefix = require('autoprefixer');
const PluginStyleLint = require('stylelint-webpack-plugin');
const PluginOptimizeCSS = require('optimize-css-assets-webpack-plugin');
const PluginForkTSCheck = require('fork-ts-checker-webpack-plugin');

const NODE_MODULES_TO_BABEL = [
	path.resolve(__dirname, 'node_modules', 'react-spring'),
];

const SOURCE_DIRECTORY = path.resolve(__dirname, 'src');
const OUTPUT_DIRECTORY = path.resolve(__dirname, 'dist');

const ESLINTRC_PATH = path.resolve(__dirname, '.eslintrc');
const TSCONFIG_PATH = path.resolve(__dirname, 'tsconfig.json');

const CSS_MODULE_LOADER_INCLUDES = [
	path.resolve(SOURCE_DIRECTORY, 'components'),
];

const CSS_GLOBAL_LOADER_INCLUDES = [
	path.resolve(SOURCE_DIRECTORY, 'styles'),
];

const commonConfig = devMode => ({
	mode: devMode ? 'development' : 'production',
	context: SOURCE_DIRECTORY,
	resolve: {
		extensions: [ '.ts', '.tsx', '.js', '.jsx' ],
		alias: {
			'react-dom': '@hot-loader/react-dom',
			Actions: path.resolve(SOURCE_DIRECTORY, 'actions'),
			Assets: path.resolve(SOURCE_DIRECTORY, 'assets'),
			Constants: path.resolve(SOURCE_DIRECTORY, 'constants'),
			Contexts: path.resolve(SOURCE_DIRECTORY, 'contexts'),
			Components: path.resolve(SOURCE_DIRECTORY, 'components'),
			Data: path.resolve(SOURCE_DIRECTORY, 'data'),
			Hooks: path.resolve(SOURCE_DIRECTORY, 'hooks'),
			Routes: path.resolve(SOURCE_DIRECTORY, 'routes'),
			Services: path.resolve(SOURCE_DIRECTORY, 'services'),
			Shaders: path.resolve(SOURCE_DIRECTORY, 'shaders'),
			Styles: path.resolve(SOURCE_DIRECTORY, 'styles'),
			Types: path.resolve(SOURCE_DIRECTORY, 'types'),
		},
	},
	module: {
		rules: [
			{
				test: /\.html/,
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
				},
			},
			{
				test: /\.(tsx?|jsx?)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				include: [
					SOURCE_DIRECTORY,
				],
				options: {
					fix: true,
				},
			},
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					transpileOnly: true,
				},
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: [
					SOURCE_DIRECTORY,
					NODE_MODULES_TO_BABEL,
				],
			},
			{
				test: /\.(scss|css)$/,
				include: CSS_MODULE_LOADER_INCLUDES,
				use: [
					{
						loader: PluginCSSExtract.loader,
						options: {
							hot: devMode,
						},
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							url: false,
							localsConvention: 'camelCaseOnly',
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								PluginAutoPrefix(),
							],
						},
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(scss|css)$/,
				include: CSS_GLOBAL_LOADER_INCLUDES,
				use: [
					{
						loader: PluginCSSExtract.loader,
						options: {
							hot: devMode,
						},
					},
					{
						loader: 'css-loader',
						options: {
							url: false,
						},
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								PluginAutoPrefix(),
							],
						},
					},
					{
						loader: 'sass-loader',
					},
				]
			},
		],
	},
	devtool: devMode ? 'cheap-module-source-map' : '', // Script source maps
	performance: {
		hints: devMode ? false : 'warning',
	},
	stats: 'normal',
});

const applicationConfig = devMode => ({
	...commonConfig(devMode),
	entry: [
		'core-js/stable',
		'react-hot-loader/patch',
		'./index.tsx',
	],
	output: {
		path: OUTPUT_DIRECTORY,
		filename: 'bundle.js',
	},
	plugins: [
		new PluginForkTSCheck({
			eslint: true,
			eslintOptions: {
				configFile: ESLINTRC_PATH,
				fix: true,
			},
			tsconfig: TSCONFIG_PATH,
		}),
		new PluginStyleLint({
			fix: true,
		}),
		new PluginCSSExtract({
			filename: 'styles.css',
			chunkFilename: '[id].css',
		}),
		new PluginOptimizeCSS({
			cssProcessorOptions: {
				minimize: !devMode,
				map: { // Style source maps
					inline: !devMode,
					annotation: devMode,
				},
			},
		}),
		new PluginCopy(
			[
				{
					from: path.resolve(SOURCE_DIRECTORY, 'assets'),
					to: path.resolve(OUTPUT_DIRECTORY, 'assets'),
				},
				{
					from: path.resolve(SOURCE_DIRECTORY, 'index.html'),
					to: path.resolve(OUTPUT_DIRECTORY, 'index.html'),
				},
				{
					from: path.resolve(SOURCE_DIRECTORY, 'manifest.json'),
					to: path.resolve(OUTPUT_DIRECTORY, 'manifest.json'),
				},
				{
					from: path.resolve(SOURCE_DIRECTORY, 'offline.html'),
					to: path.resolve(OUTPUT_DIRECTORY, 'offline.html'),
				},
				{
					from: path.resolve(SOURCE_DIRECTORY, 'perlin.js'),
					to: path.resolve(OUTPUT_DIRECTORY, 'perlin.js'),
				},
			],
			{
				info: devMode,
			},
		),
	],
	devServer: {
		contentBase: OUTPUT_DIRECTORY,
		hot: devMode,
		historyApiFallback: true,
	},
});

const webWorkerConfig = devMode => ({
	...commonConfig(devMode),
	entry: [
		'./worker.ts',
	],
	output: {
		path: OUTPUT_DIRECTORY,
		filename: 'worker.js',
		// https://github.com/webpack-contrib/worker-loader/issues/174
		// https://github.com/webpack/webpack/issues/6642
		globalObject: 'this',
	},
});

module.exports = (env, argv) => {
	const devMode = argv.prod === undefined;

	return [
		applicationConfig(devMode),
		//webWorkerConfig(devMode),
	];
};
