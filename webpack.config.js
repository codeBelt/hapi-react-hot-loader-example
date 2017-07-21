const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;
const isProduction = (env === 'production');

const config = {
    entry: [
        // 'babel-polyfill',

        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        // 'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './src/index.js',
        // the entry point of our app
    ],

    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: isProduction
            ? 'assets/scripts/[name].[hash].js'
            : 'main.js',
        // publicPath: path.resolve(__dirname, 'dist') // necessary for HMR to know where to load the hot update chunks
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
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env)
        }),

        new webpack.HotModuleReplacementPlugin(), // enable HMR globally
        new webpack.NamedModulesPlugin(), // prints more readable module names in the browser console on HMR updates
        new webpack.NoEmitOnErrorsPlugin(), // do not emit compiled assets that include errors

        isProduction
            ? new ExtractTextPlugin({filename: "assets/styles/[name].css"})
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

        isProduction
            ? new HtmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                minify: isProduction ? {collapseWhitespace: true, collapseInlineTagWhitespace: true} : false,
            })
            : null,

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
};

module.exports = config;
