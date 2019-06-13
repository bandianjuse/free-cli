const webpackBaseConf = require('./webpack.base.conf');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(webpackBaseConf, {
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
    ],
})