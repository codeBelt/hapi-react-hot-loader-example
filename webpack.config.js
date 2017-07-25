const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const env = process.env.NODE_ENV;
const isProduction = (env === 'production');

const config = {
    entry: isProduction
        ? ['./src/main.js']
        : [
            'babel-polyfill',

            'react-hot-loader/patch', // activate HMR for React
            'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr', // bundle the client for webpack-hot-middleware and connect to the provided endpoint
            // 'webpack/hot/only-dev-server', // bundle the client for hot reloading. only- means to only hot reload for successful updates

            './src/main.js',
        ],

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction
            ? 'assets/scripts/[name].[chunkhash].js'
            : 'main.js',
        // publicPath: '/', // necessary for HMR to know where to load the hot update chunks
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: isProduction
                    ? ExtractTextPlugin.extract({fallback: 'style-loader', use: ['css-loader']})
                    : ['style-loader', 'css-loader']
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
            'process.env.NODE_ENV': JSON.stringify(env)
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

        isProduction
            ? new ExtractTextPlugin({filename: "assets/styles/[name].[chunkhash].css"})
            : null,

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
