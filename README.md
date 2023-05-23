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
Mode的内置函数功能
|选项|描述|
|----|----|
|development|设置process.env.NODE_ENV的值为development . 开启NamedChunksPlugin和NamedModulesPlugin|
|production|设置process.env.NODE_ENV的值为production.开启FlagDependencyUsagePlugin，FlagincludedChunksPlugin，OccurrenceOrderPlugin,SideEddectsFlagPlugin和TerserPlugin|
|none|不开启任何优化|

## 2 常用插件的使用

### 2.1 babel-loader

babel的配置文件是: .babelrc
首先回顾 1-3 里面的概念， webpack本来只支持.js & .json俩中文件，活着es6，es7中的一些新语法，浏览器也不支持，所以需要babel来把他们转成浏览器认识的语言
ok ， 再总结下，babel只负责转换文件，webpack 负责转换成浏览器认识的语言

anyway，所以怎么配置呢babelrc文件  其实就是babel run come
里面配置reset ---> 预设配置
配置了babel  就可以编译es6一些新语法，可以编译jsx等等
```javascript
// .babelrc 配置 这样就支持转化新语法特性和react语法解析转化
{
    "presets":[
        "@babel/preset-env",
        "@babel/preset-react"
    ],
}  
```


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
            {test:/\.test$/,use:'raw-loaders'},
            //这里就是babel-loader
            {test:/\.js$/,use:'babel-loader'}
        ]
    }
}
```

### 2.2 css-loader  less-loader file-loader
```javascript
module: {
    rules: [
        {test:/\.test$/,use:'raw-loaders'},
        //这里就是babel-loader
        {test:/\.js$/,use:'babel-loader'},
        {test:/.(png|jpg|gif|jpeg)$/,use:'file-loader'},
        // style-loader用来讲style插入html，css-loader屎用来解析css，它是链式调用，从右到左，所以正确写法是style再先，css再后
        {test:/\.css$/,use:[
            'style-loader',
            'css-loader'
        ]},
        {test:/.(png|jpg|gif|jpeg)$/,use:'file-loader'},


    ]
}

```

## 3 webpack 的文件监听
    倆种方式
        -> 启动webpack命令时，带上--watch参数
        ->在配置webpack.config.js 中设置watch: true

    上菜
```javascript
module: {
    rules: [
        {test:/\.test$/,use:'raw-loaders'},
        //这里就是babel-loader
        {test:/\.js$/,use:'babel-loader'},
        {test:/.(png|jpg|gif|jpeg)$/,use:'file-loader'},
        // style-loader用来讲style插入html，css-loader屎用来解析css，它是链式调用，从右到左，所以正确写法是style再先，css再后
        {test:/\.css$/,use:[
            'style-loader',
            'css-loader'
        ]},
        {test:/.(png|jpg|gif|jpeg)$/,use:'file-loader'},
    ]，
    //默认时false ， 只有开启时，wathchOptions才有意义
    watch:true.
    watchOptions:{
        //可以忽略特定文件
        ignored:/node_mudules/,
        //监听到变化后等300ms再执行
        aggregateTimeout:300,
        //判读啊你文件是否发生变化时通过不停询问系统指定文件有没有变化实现的，默认美妙询问1000次
        poll:1000
    }
}
```

但是这种方式有权限，每次跟新需要浏览器刷新，而且相对WDS 会更慢，因为watch 回把文件放到磁盘上，但是我们平常使用的webpack-dev-server会更快，首先不需要浏览器刷新，然后他的文件都是保存在内存上的，所以更快。

## wenpack 中的webpack-dev-server 基本使用和热更新
  ->WDS 不刷新浏览器
  ->不输出文件 而是放到内存中

  一般WDS需要配合webpack.HotMoudleReplacementPlugin配合使用
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
            {test:/\.test$/,use:'raw-loaders'},
            //这里就是babel-loader
            {test:/\.js$/,use:'babel-loader'}
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        // contentBase:'./dist',  // 垃圾教程 这里contentbase 已经弃用看
        // 应该是static
        static: './dist'
        hot:true
    },
    mode: "development"
}
  ```
## 4 webpack 文件指纹  hash chunckhash contenthash
太恶心了 不想看 pass

## 5 webpack代码的压缩
### 5.1 js文件的压缩
使用uglifyjs-webpack-plugin
### 5.2 css文件的压缩
optimize-css-assets-webpack-plugin
同时要安装预处理器 csssnano
### 5.2  html文件的压缩
修改html-webpack-plugin，设置压缩参数 

**总归了解webpack的plugin可以把css，js，html压缩成更小体积的文件就可以了**


# webpack的高级用法 ok
-----> 如何清理output构建目录
 ->1 . 通过npm scripts清理目录
    rm -rf ./dist && webpack
    rimraf ./dist && webpack

并。。。不。。。。优。。。雅

所以我们要用 clean-webpack-plugin
-> 默认回删除output指定的输出目录


## autoPrefixer  配合postcss-loader 适配浏览器
可以自动修复因为不痛浏览器不捅的情况下，css针对浏览器的前缀

## 优化
tree-shaking
```js
    if(false){  //永远不会被用到  直接抹杀
        console.log(123)
    }
```·