**所以精神的痛苦 是不是对意志力的锻炼呢**

# webpack

## 1 最基本的使用以及一些概念
### 1.1 -> 通过npm srcript 配置webpack
可以通过node_modules/.bin/webpack来执行打包编译。也可以通过配置package.json文件中的script 来配置，因为通过npm run 回去.bin/下面的文件执行sh脚本
### 1.2 -> 核心概念entry
如其字面含义 入口 可以通过配置入口文件，告诉webpack从哪里编译，可以配置字符串表示单文件，可以配置对象来执行多文件入口，相应的output配置也要做出相应的改变，配置filename时需要用到转意符[],
```javascript
module.exports = {
    mode: 'production',
    entry: {
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: '[name].js'
    }
}

```

### 1.3 -> 核心概念loaders
webpack直接用只支持json 和js 俩中**文件格式**， loaders就是为了支持其他文件格式并把他们转成有效的文件格式，并且添加到依赖图中。

loaders本身是一个函数，接受源文件作为参数，返回转换的结果

常见的loaders  
|名称|描述|
|----|----|
|bable-loader|转换es6，es7等js语法新特性|
|css-loader  |支持.css的加载和解析|
|less-loader |将less文件 转换成css|
|ts-loader   |将ts转换成js|
|file-loader |将图片、字体等的文件打包 |
|bable-loader|转换es6，es7等js语法新特性|
|raw-loader  |将文件以字符串的形式倒入|
|thread-loader|多进程打包css 和 js|
|||

上菜
```javascript
module.exports = {
    mode: 'production',
    entry: {
        index:'./src/index.js',
        search:'./src/search.js'
    },
    output: {
        path:path.resolve(__dirname,'dist'),
        filename: '[name].js'
    },
    //所有的loader都是卸载module里面的rules数组里面，数组中的每一个item对象俩个键值，第一个正则匹配文件，第二个对应这些文件所用的loader。
    module: {
        rules: [
            {test:/\.test$/,use:'raw-loaders'}
        ]
    }
}

```

### 1.4 -> 核心概念plugins
用于bundle（打包输出）文件的优化 ，资源管理，环境变量注入，比如构建之前目录的删除

常见的plugins
|名称|描述|
|----|----|
|CommonsChunkPlugi|将chunks相同的模块代码提取成公共js|
|CleanWebpackPlugin |清理构建目录|
|ExtractTextWebpackPlugin|将css文件从bundle文件里提取成一个独立的css文件|
|CopyWebpackplugin  |将文件或者文件夹拷贝到构建的输出目录|
|HtmlWebpackPlugin |创建html文件去承载输出的bundle文件 |
|uglifyjsWebpackPlguin|压缩js|
|zipWebpackPlugin|将打包出的资源生成一个zip|
|||

使用方式 上菜
```javascript
module.exports = {
    mode: 'production',
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
            {test:/\.test$/,use:'raw-loaders'}
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:`./src/index.html`
        })
    ]
}
```
### 1.5 -> 最后呀只心概念mode