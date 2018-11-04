## webpack 介绍：

    js静态模块打包器。递归的构建一个依赖关系图，包含每个模块，然后将所有模块打包成一个或者多个 bundle。

## start

    npm init -y  // 初始化,生成package.json
    npm install webpack webpack-cli --save-dev // 本地安装webpack

> js 包管理的问题：

    1. 外部脚本依赖不明显；
    2. 依赖丢失或者顺序不对，将会报错；
    3. 依赖被包含了但是没使用，浏览器也会下载不需要的依赖代码；

> 如何解决？ 使用 webpack 来管理脚本

```
npm install --save // 项目本身需要        简写--》npm i —S ...
npm install --save-dev  // 开发阶段需要   简写--》npm i -D ...
```

#### start

    src下的代码是我们书写和编辑使用
    dist下代码是压缩和优化后 输出到构建过程中，它们将被加载到浏览器执行

    1. 直接使用默认配置打包

        npx webpack

    2. 使用webpack.config.js配置文件

        npx webpack --config webpack.config.js // 指定配置文件

    3. 修改package.json

        "scripts": {
              "test": "echo \"Error: no test specified\" && exit 1",
             "build": "webpack"
         },

    4. 执行打包

       $ npm run build

#### asset management

    1. asset 管理  --》添加css
       添加css,

       (1) npm install --save-dev style-loader css-loader

       (2) webpack.config.js中添加配置

           module: {
                rules:[
                    {
                        test:/\.css/,
                        use:['style-loader','css-loader']
                    }
                ]
            }

       (3) 添加文件 index.css

           .hello {
               color:red;
           }

       (4) 给index.js中标签添加.hello样式

            element.classList.add('hello');

       (5) 执行打包

            npm run build

    2. 添加图片 和添加css一样的步骤

       (1)安装 file-loader
            npm install --save-dev file-loader
       (2)webpack.config.js中添加配置
            module: {
                rules:[
                    ...
                    {
                        test:/\.(png|svg|jpg|gif)$/,
                        use:['file-loader']
                    }
                ]
            }
       (3)添加图片 logo-red.png
       (4)index.js中添加引用

            ...
            const myIcon = new Image();
            myIcon.src=Icon;

            element.appendChild(myIcon);

       (5)执行打包
            npm run build

    3. 添加字体。。。 同上

#### output management

    1. 安装 html-webpack-plugin


        npm i -D html-webpack-plugin


    2. 添加print.js文件

        export  default  function printMe() {
            console.log('来自print文件。。。');
        }

    3. 在index.js中使用print.js

        import printMe from './print.js';

        ...
        printMe();

    4. dist/index.html中引用

        <script type="text/javascript" src="app.bundle.js"></script>
        <script type="text/javascript" src="print.bundle.js"></script>

    5. webpack.config.js中配置

         module.exports= {
             entry:{
                 app:'./src/index.js',
                 print:'./src/print.js',
             },
             output: {
                 filename: "[name].bundle.js",
                 path:path.resolve(__dirname, 'dist')
             },
             plugins: [
                 new htmlWebpackPlugin({
                     title:'输出管理配置'
                 })
             ]
         };

    6. 打包

       npm run build


    清理dist文件夹： 每次打包都会产生文件，部分文件已经不再需要，因此要清理dist文件夹

    1. 安装

        npm i -D clean-webpack-plugin

    2. 配置

        ...
        const cleanWebpackPlugin = require('clean-webpack-plugin');

        module.exports= {
            ...
            plugins: [
                ...
                new cleanWebpackPlugin(['dist'])
            ]
        };

    3. 打包

        npm run build



     webpack-manifest-plugin: 生成/dist/manifest.json文件，即是：源文件--》打包后的文件

         {
           "app.js": "app.bundle.js",
           "myOutput.js": "myOutput.bundle.js",
           "print.js": "print.bundle.js",
           "index.html": "index.html"
         }

#### development 开发

    1.设置为开发模式，-->package.js

        module.exports = {
            ...
            mode: 'development',
            ...
        }

    2.使用源映射 Using source maps, 监控错误源 -->修改webpack.config.js

        module.exports = {
            ...
            devtool:'inline-source-map',
        }

    开发工具选择：
    （1）webpack的watch模式；
    （2）webpack-dev-server；
    （3）webpack-dev-middleware;

> webpack 的 watch 模式 -->修改 webpack.config.js

        "scripts": {
            ...
            "watch": "webpack --watch",
            ...
        },

> webpack-dev-server 模式: 提供一个 web 服务，实时加载更新

     (1) 安装

        npm i -D webpack-dev-server

     (2) 配置 -->修改webpack.config.js

        module.exports = {
            ...
            devServer:{
                contentBase:'./dist'  // 使用此文件内容去服务
            }
        }

     (3) 配置启动 --> 修改package.json

        "scripts": {
            "start": "webpack-dev-server --open",
        },

     (4) 启动

        npm start

> webpack-dev-middleware: 是一个包装器， 它将发布由 webpack 处理的文件到服务器

    (1) 安装

            npm i -D express webpack-dev-middleware

    (2) 配置 -->修改webpack.config.js

            module.exports = {
                ...
                output:{
                    publicPath:'/'  // 使用此文件内容去服务
                }
            }

    (3) 添加文件 server.js

        。。。

    (4) 配置启动 --> 修改package.json

        "scripts": {
            "server":"node server.js"
         },

    (5) 启动

            npm run server

    最后打开 http://localhost:3000

#### Hot Module Replacement -->HMR 热替换

    1. 安装， webpack自带此plugin
    2. 配置 -->修改webpack.config.js

        module.exports ={
            entry:{
                app:'./src/index.js'
            },

            devServer: {
                contentBase:'./dist',
                hot: true
            },
            ...
            plugins: [
                new webpack.HotModuleReplacementPlugin()
            ]
            ...
        }

    3. 使用   --》 修改index.js

        ...
        // 检测更新，以便webpack接受到并更新模块
        if(module.hot){
            module.hot.accept('./print.js',()=>{
                console.log('accepting the updated print module');
                printMe();

                // 更新 btn
                document.body.removeChild(element);
                // 重新渲染元素
                element= component();
                document.body.appendChild(element);
            })
        }

    4. 启动

        npm start

    ---
    通过Node.js API来使用HMR

    new WebpackDevServer(compiler, options);

#### Tree Shaking

     修改删除不使用的代码 --> 修改package.json
        注意必须使用es2015的 import,export
        {
            "name": "your-project",
            "sideEffects": false // 设置为false
        }

     压缩代码 --》 -->修改webpack.config.js
        module.exports = {
            mode: 'production',
            ...
        }

#### producion

     不同的环境配置不同，配置文件分离

     1. 安装

        npm i -D webpack-merge

     2. 添加配置文件 --》 通用的配置 放到webpack.common.js

        webpack/webpack.common.js
        webpack/webpack.dev.js

                const merge = require('webpack-merge');
                const common = require('./webpack.common');

                module.exports = merge(common, {
                    mode: 'development',
                    devtool: 'inline-source-map',
                    devServer: {
                        contentBase: './dist'
                    }
                });

        webpack/webpack.prod.js

                const merge = require('webpack-merge');
                const common = require('./webpack.common');

                module.exports = merge(common, {
                    mode: 'production',
                    devtool: 'source-map'
                });

     3. 配置启动 --> 修改package.json

            "scripts": {
                "start": "webpack-dev-server --open --config webpack/webpack.dev.js",
                "build": "webpack --config webpack/webpack.prod.js",
            }

#### code Spliting

    三种分离方式： 手动多入口；使用插件SplitChunksPlugin；动态倒导入；

    多入口： 优点--直接分离代码，缺点--手动设置入口相同的模块重复打包
    配置：--> 修改webpack.config.js

        module.exports = {
            mode: 'development',
            entry: {
                app: './src/index.js',
                print: './src/print.js'
            },
            ...
        }

    SplitChunksPlugin： 提取相同模块

    配置：--> 修改webpack.config.js
        module.exports = {
            ...
            optimization: {
                splitChunks: {
                chunks: 'all'
                }
            }
            ...
        }

    动态倒导入：

    配置：--> 修改webpack.config.js
        module.exports = {
            ...
            output: {
                ...
                chunkFilename: '[name].chunk.js',
            },
            ...
        }

    使用：--》修改 index.js

        function getComponent() {
           return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
             var element = document.createElement('div');

             element.innerHTML = _.join(['Hello', 'webpack'], ' ');

             return element;

           }).catch(error => 'An error occurred while loading the component');
        }

        getComponent().then(component => {
            document.body.appendChild(component);
        })

    Prefetching/Preloading modules: 预加载模块

            import ('LoginModal')

#### Lazy Loading

    button.onclick = e => import('./print').then(module => {
        var print = module.default;

        print();

    });

    react ： https://reacttraining.com/react-router/web/guides/code-splitting

#### caching

    浏览器会缓存文件，通过改变文件名防止缓存。

1.  配置--> 修改 webpack.config.js 设置输出文件名称 contenthash


    module.exports = {
        ...
        output: {
            filename: '[name].[contenthash].js',
            path: path.resolve(__dirname, 'dist')
        }
    };

    2. 问题: 公用的lib也会每次都重新打包，比如react,lodash...
            main.39c28356058c752f57f5 大小 1.53Mib
       解决: 将公用lib提取出来。
       配置--> 修改webpack.config.js

       module.exports = {
            ...
            optimization: {
                // 提取公用模板 分离处理一个运行时的包
                runtimeChunk: {
                    name: 'mainfest' // 设置名称
                },
                splitChunks: {
                    // 提取第三方lib, 比如：react,lodash
                    cacheGroups: {
                        vendor: {
                        test: /[\\/]node_modules[\\/]/,
                        name: 'vendors',
                        chunks: 'all'
                        }
                    }
                }
            },


       };
        打包结果：
        main.39c28356058c752f57f5.js      // 3.41 KiB
        runtime.bf0159c4d24ed37b45c3.js   // 14.2 KiB
        vendors.b5a8feb9b2d02dd77110.js   // 1.52 MiB

    3. 添加一个新文件 print.js，并在indexCaching.js中引用，
       问题：此时仅仅需要main.**.js名称改变，但结果是三个文件名称都改变了
       解决：原因在于module.id是递增的，一个变了，有关联的文件都会变，设置HashedModuleIdsPlugin（）
       配置--> 修改webpack.config.js

        module.exports = {
            ...
            plugins: [
                ...
                new webpack.HashedModuleIdsPlugin()
            ],
        }

#### Authoring Libraries
