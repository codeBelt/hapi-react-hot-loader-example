var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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

    output: {
        filename: 'bundle.js',
        // the output bundle

        path: path.resolve(__dirname, 'dist'),

        publicPath: './'
        // necessary for HMR to know where to load the hot update chunks
    },

    devtool: 'cheap-module-eval-source-map',

    module: {
        rules: [
            {
                test: /\.css$/,
                use: [ 'style-loader', 'css-loader' ],
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader']
                // })
            },
            {
                test: /\.jsx?$/,
                use: [
                    'babel-loader',
                ],
                include: path.join(__dirname, 'src'),
            },
        ],
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        // new ExtractTextPlugin({
        //     filename: 'test.css'
        // })
        // new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        // new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, 'index.html')
        // })
    ],
};
