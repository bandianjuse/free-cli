const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: "./src/main", // string | object | array
    output: {
        path: path.resolve(__dirname, "../dist"),
        filename: "bundle.js",
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name]_[hash:5].[ext]',
                            outputPath: 'images'
                        },
                    },
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            }
        ],
    },



    resolve: {
        alias: {
            '@': path.resolve(__dirname, '../src'),
            'vue': 'vue/dist/vue.esm.js'
        }
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'public/index.html'
        }),
        new ExtractTextPlugin({
            filename: "[name].css",
            allChunks: false
        }),
        new VueLoaderPlugin()
    ],

}