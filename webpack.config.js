/**
 * Created by brad on 3/28/2017.
 */
var path                =      require("path"),
    webpack             =   require("webpack"),
    ExtractTextPlugin   = require("extract-text-webpack-plugin");


module.exports = {
    cache: true,
    debug: true,
    devtool: 'inline-source-map',
    sourceMapFileName: "[file].map",
    context: path.join(__dirname, "/src/client"),
    entry: {
        main: "./main"
    },
    output: {
        path: "./public/js/",
        filename: "[name].js",
        chunkFilename: "[id].js",
        sourceMapFilename: "[name].map",
        publicPath: "/js/"
    },
    module: {
        loaders: [
            { test: /bootstrap\/js\//, loader: 'imports?jQuery=jquery' },
            // required to write "require('./style.scss')"
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract("css?sourceMap!sass?sourceMap")
            },
            { test: /\.css$/,  loader: "style-loader!css-loader" },
            { test: /\.png$/,           loader: "url-loader?mimetype=image/png" },
            { test: /\.gif$/,           loader: "url-loader?mimetype=image/gif" },
            // required for bootstrap icons
            { test: /\.(woff|woff2)$/,  loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff" },
            { test: /\.ttf$/,           loader: "file-loader?prefix=font/" },
            { test: /\.eot$/,           loader: "file-loader?prefix=font/" },
            { test: /\.svg$/,           loader: "file-loader?prefix=font/" },
            // required for react jsx
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss'],
        alias: {
            underscore  : "lodash"
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            "_":        "lodash",
            "$":        "jquery",
            "jQuery":   "jquery",
            "Backbone": "backbone"
        })
        ,new ExtractTextPlugin("[name].css")
    ]
};
