const path = require('path');
const webpackBaseConf = require('./webpack.base.conf');
const merge = require('webpack-merge');

module.exports = merge(webpackBaseConf, {
    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true,
        port: 9090,
        overlay: {
            warnings: true,
            errors: true
        },
    },
    plugins: [
    ],
})

