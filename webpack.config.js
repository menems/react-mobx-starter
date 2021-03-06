const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

const config = module.exports = {
    context: path.join(__dirname, './src'),
    entry: {
        app: [
            './index.js'
        ]
    },
    devtool: 'eval',
    output: {
        path: 'dist',
        filename: '[name].[hash].js'
    },
    module: {
        loaders: [
            {test: /\.js$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/},
            {test: /\.html$/, loader: 'raw'},
            {test: /\.css$/, loader: 'style!css'},
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: JSON.stringify(env) }
        }),
        new HtmlWebpackPlugin({template: './index.html', inject: 'body'}),
    ],
    resolve: {
        root: path.resolve('./src'),
        extensions: ['', '.js']
    },
    devServer: {
        contentBase: './src',
        hot: true
    }
};

if (env === 'production') {
    config.devtool = 'source-map';
    config.plugins.push(
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({minimize: true, sourceMap: true, compress: { warnings: false } })
    );
}
