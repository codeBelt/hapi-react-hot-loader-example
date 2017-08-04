const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const NODE_ENV = process.env.NODE_ENV;
const isProduction = (NODE_ENV === 'production');

const config = {
    entry: isProduction
        ? [
            'babel-polyfill',
            './src/main.js'
        ]
        : [
            'babel-polyfill',

            'react-hot-loader/patch', // activate HMR for React
            `webpack-hot-middleware/client?path=http://${HOST}:${PORT}/__webpack_hmr`, // bundle the client for webpack-hot-middleware and connect to the provided endpoint

            './src/main.js',
        ],

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    output: {
        path: path.join(__dirname, 'dist/public/'),
        filename: isProduction
            ? 'assets/scripts/[name].[chunkhash].js'
            : 'main.js',
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['css-hot-loader'].concat(
                    ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})
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
            'process.env.NODE_ENV': JSON.stringify(NODE_ENV || 'development')
        }),

        isProduction
            ? null
            : new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        isProduction
            ? null
            : new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        isProduction
            ? null
            : new webpack.NoEmitOnErrorsPlugin(), // do not emit compiled assets that include errors

        new ExtractTextPlugin({
            filename: isProduction
                ? 'assets/styles/[name].[chunkhash].css'
                : 'assets/styles/main.css'
        }),

        isProduction
            ? new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor',
                minChunks: module => /node_modules/.test(module.resource)
            })
            : null,

        isProduction
            ? new webpack.optimize.CommonsChunkPlugin({name: 'manifest'})
            : null,

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
                to: 'assets/media'
            }
        ])
    ].filter(Boolean),

    devtool: isProduction
        ? 'none'
        : 'cheap-module-eval-source-map',

    performance: {
        maxAssetSize: 500000
    },
};

module.exports = config;
