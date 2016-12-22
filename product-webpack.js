/**
 * Created by ping on 16/7/19.
 */
const path = require('path');
const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.js'
});
const UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
    }
});
module.exports = {
    watch: true,
    entry: {
        vendor: ['react', 'react-dom'],
        'index': 'index'
    },
    output: {
     //   path: 'dist',
        filename: '[name].js',
        publicPath: "",
        chunkFilename: "[name].chunk.js"
    },
    resolve: {
        root: __dirname,
        extensions: ['', '.js', '.jsx'],
        alias: {
            //common
            'util': 'js/app/util',
            'base': 'css/base.scss',
            'normalize': 'css/normalize.scss',
            'actions': 'js/redux/actions',
            'reducers': 'js/redux/reducers',

            //page
            'index': 'js/page/index.js',
            'index.scss': 'js/page/index.scss',

            //components
            'query-box': 'js/components/query-box/query-box.js',
            'query-box.scss': 'js/components/query-box/query-box.scss',
            'chart-line': 'js/components/chart-line/chart-line.js',
            'chart-line.scss': 'js/components/chart-line/chart-line.scss',
            'dropdown-menu': 'js/components/dropdown-menu/dropdown-menu',
            'dropdown-menu.scss': 'js/components/dropdown-menu/dropdown-menu.scss',
            'date-picker':'js/components/date-picker/date-picker.js',
            'date-picker.scss':'js/components/date-picker/date-picker.scss',
            'info-card':'js/components/info-card/info-card.js',
            'info-card.scss':'js/components/info-card/info-card.scss'
        }

    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: '/node_modules/',
                query: {
                    presets: ['react', 'es2015']
                }
            },
            {
                test: /\.(jpe?g|png|gif|svg|woff|ttf|eot)$/i,
                loaders: ['url-loader?limit=1000&name=[path][name][hash:8].[ext]', 'img?minimize']
            },
            {
                test: /\.(scss|css)/,
                loaders: ['style', 'css', 'autoprefixer-loader', 'sass']
            },
            {test: /\.js$/, loader: "eslint-loader", exclude: [/node_modules/, /js\/lib/]}
        ],
        noParse: []
    },
    plugins: [
        commonsPlugin],
    imagemin: {
        gifsicle: {interlaced: false},
        jpegtran: {
            progressive: true,
            arithmetic: false
        },
        optipng: {optimizationLevel: 5},
        pngquant: {
            floyd: 0.5,
            speed: 2
        },
        svgo: {
            plugins: [
                {removeTitle: true},
                {convertPathData: false}
            ]
        }
    },
    eslint: {
        configFile: '.eslintrc',
        ignorePath: '.eslintignore'
    }
};