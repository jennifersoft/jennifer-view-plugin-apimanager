const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = (env) => {
    let path = require('path')
    let clientPath = path.resolve(__dirname, 'src/main/client')
    let outputPath = path.resolve(__dirname, (env == 'production') ? 'src/main/resources/static' : 'out')

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
            minimizer: (env == 'production') ? [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({})
            ] : []
        },
        module: {
            rules: [{
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }, {
                enforce: 'pre',
                test: /\.ts$/,
                loader: 'tslint-loader'
            }, {
                test: /\.ts$/,
                use: 'awesome-typescript-loader'
            }, {
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
        resolve: {
            extensions: [ ".ts", ".js", ".json", ".scss" ]
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