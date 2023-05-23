'use strict'
const path = require('path')
const webpack =require('webpack')

module.exports = {
    entry: {
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    module: { 
        rules: [
            {test:/\.test$/,use:'raw-loaders'},
            //这里就是babel-loader
            {test:/\.js$/,use:'babel-loader'}
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        static:'./dist',
        hot:true
    },
    mode: "development"
}