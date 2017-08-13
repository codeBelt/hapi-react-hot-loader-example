const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const RobotstxtPlugin = require('robotstxt-webpack-plugin').default;

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV || 'production';
const isProduction = (NODE_ENV === 'production');
const isDevelopment = (NODE_ENV === 'development');

const config = {
    entry: isDevelopment
        ? [
            'babel-polyfill',

            'react-hot-loader/patch', // activate HMR for React
            `webpack-hot-middleware/client?path=http://${HOST}:${PORT}/__webpack_hmr`, // bundle the client for webpack-hot-middleware and connect to the provided endpoint

            './src/client.jsx',
        ]
        : [
            'babel-polyfill',

            './src/client.jsx',
        ],

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    output: {
        path: path.join(__dirname, 'dist/public/'),
        filename: isDevelopment
            ? 'main.js'
            : 'assets/scripts/[name].[chunkhash].js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(
                    ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                            loader: 'css-loader',
                            options: {minimize: true},
                        }],
                    }),
                ),
            },
            {
                test: /\.jsx?$/,
                use: ['babel-loader'],
                include: path.join(__dirname, 'src'),
            },
        ],
    },

    plugins: [
        new ProgressBarPlugin(),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
        }),

        isDevelopment
            ? new webpack.HotModuleReplacementPlugin() // enable HMR globally
            : null,
        isDevelopment
            ? new webpack.NamedModulesPlugin() // prints more readable module names in the browser console on HMR updates
            : null,
        isDevelopment
            ? new webpack.NoEmitOnErrorsPlugin() // do not emit compiled assets that include errors
            : null,

        new ExtractTextPlugin({
            filename: isDevelopment
                ? 'assets/styles/main.css'
                : 'assets/styles/[name].[chunkhash].css',
        }),

        isDevelopment
            ? null
            : new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module => /node_modules/.test(module.resource),
            }),

        isDevelopment
            ? null
            : new webpack.optimize.CommonsChunkPlugin({name: 'manifest'}),


        isDevelopment
            ? null
            : new webpack.optimize.UglifyJsPlugin(),

        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            minify: isProduction ? {collapseWhitespace: true, collapseInlineTagWhitespace: true} : false,
            alwaysWriteToDisk: true,
        }),
        new HtmlWebpackHarddiskPlugin(),

        new CopyWebpackPlugin([
            {
                context: 'src/assets/media',
                from: '**/*',
                to: 'assets/media',
            },
        ]),

        new RobotstxtPlugin({
            policy: [
                isProduction
                    ? {userAgent: '*', allow: '/'}
                    : {userAgent: '*', disallow: '/'},
            ],
        }),
    ].filter(Boolean),

    devtool: isProduction
        ? 'none'
        : 'cheap-module-eval-source-map',

    performance: {
        maxAssetSize: 500000,
    },
};

module.exports = config;
