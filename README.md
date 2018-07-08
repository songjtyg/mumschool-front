安装nodejs
安装npm
安装淘宝镜像：npm install -g cnpm --registry=https://registry.npm.taobao.org
安装webpack：cnpm install webpack -g
安装vue脚手架；npm install vue-cli -g
cd 工程路径
//使用win+x,选择命令提示符（管理员），在里面运行命令
建立工程：vue init webpack-simple 工程名字<工程名字不能用中文> 
          vue init webpack 工程名字<工程名字不能用中文>
安装项目依赖：npm install/cnpm install
启动项目：npm run dev

cnpm install
npm run dev
npm run build
cnpm install  vuex axios -D // vue-router

//在webpack.base.conf.js添加style-loader，css-loader//不能加了，编译时会报错
cnpm install style-loader css-loader -D
cnpm install babel-plugin-component -D
// .babelrc 中配置
cnpm install --save mint-ui

//main 文件配置mint-ui，axios
//禁用eslint

//直接使用 cnpm 可能会导致依赖不正确。强烈建议给 npm 设置 taobao 的 registry。 
npm install --registry=https://registry.npm.taobao.org
//安装vux///////////////////////////////////////////////////
<1>. 在项目里安装vux
npm install vux --save
<2>. 安装vux-loader （这个vux文档似乎没介绍，当初没安装结果报了一堆错误）
npm install vux-loader --save-dev
<3>. 安装less-loader  （这个是用以正确编译less源码，否则会出现 ' Cannot GET / '）
npm install less less-loader --save-dev
<4>. 安装yaml-loader  (以正确进行语言文件读取, 我没安装似乎也没报错)
npm install yaml-loader --save-dev
<5>. 在build/webpack.base.conf.js 文件进行配置
const vuxLoader = require('vux-loader')
const webpackConfig = originalConfig
 //即将原来的module.exports 改为 const webpackConfig
module.exports = vuxLoader.merge(webpackConfig, { plugins: ['vux-ui'] })
//安装vux//end/////////////////////////////////////////////////
