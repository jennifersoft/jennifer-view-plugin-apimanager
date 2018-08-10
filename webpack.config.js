const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

let path = require('path')
let clientPath = path.resolve(__dirname, 'src/main/client')
let outputPath = path.resolve(__dirname, 'out')

module.exports = (env) => {
    let minimizer = [];

    if(env == 'production') {
        outputPath = path.resolve(__dirname, 'src/main/resources/static')

        minimizer.push(new UglifyJsPlugin({
            cache: true,
            parallel: true,
            sourceMap: true
        }))

        minimizer.push(new OptimizeCSSAssetsPlugin({}))
    }

    return {
        mode: (env == 'development') ? 'development' : 'production',
        entry: clientPath + '/index.js',
        output: {
            path: outputPath,
            filename: '[name].js'
        },
        externals: {
            jquery: 'jQuery',
            moment: 'moment',
            lodash: '_',
            'juijs': 'jui',
            'juijs-ui': 'jui',
            'juijs-grid': 'jui',
            'juijs-chart': 'jui'
        },
        optimization: {
            minimizer: minimizer
        },
        module: {
            rules: [{
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['es2015', {modules: false}]
                        ]
                    }
                }]
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 1024
                    }
                }]
            }, {
                test: /\.(scss|css)$/,
                use: [
                    env == 'development' ? 'style-loader' : MiniCssExtractPlugin.loader, {
                        loader: "css-loader",
                        options: {
                            minimize: {
                                safe: true
                            }
                        }
                    }, {
                        loader: "postcss-loader",
                        options: {
                            plugins: () => [],
                            sourceMap: true
                        },
                    }, {
                        loader: "sass-loader",
                        options: {}
                    }
                ]
            }]
        },
        devServer: {
            hot: false,
            inline: true,
            contentBase: outputPath,
            historyApiFallback: true,
            compress: true,
            publicPath: '/',
            host: '0.0.0.0',
            port: 3000,
            proxy: {
                '**': 'http://127.0.0.1:8080'
            }
        },
        plugins: [
            new MiniCssExtractPlugin({
                path: outputPath,
                filename: '[name].css'
            })
        ]
    }
}