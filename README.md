# Vue 有赞商城


#### [Vue 有赞商城 webapp 知识点总结]



## 主要技术栈

【前端】

- `Vue`：用于构建用户界面的 MVVM 框架。它的核心是**响应的数据绑定**和**组系统件**
- `vue-router`：为单页面应用提供的路由系统，项目上线前使用 `Lazy Loading Routes` 来实现异步加载优化性能
- `vuex`：Vue 的集中状态管理，在多个组件共享某些状态时非常便捷，适用于中大型项目
- `vue-lazyload`：第三方图片懒加载库，优化页面加载速度
- `better-scroll`：iscroll 的优化版，使移动端滑动体验更加流畅，轮播图也是利用此制作
- `Sass`：css 预编译处理器
- `ES6`：项目中用到的模块化、解构赋值、Promise、Class 等方法非常好用

【后端】

- `rap`: 模拟数据用于开发
- `axios`：服务端通讯。结合 Node.js 代理后端请求，抓取 QQ音乐(PC端)数据

【自动化构建及其他工具】

- `vue-cli`：Vue 脚手架工具，快速初始化项目代码，以及 webpack 的配置（汗颜…）


## 实现细节
主要页面：首页推荐，商品分类，购物车，配送地址修改


## Build Setup

``` bash
# clone the repo into your disk.
$ git clone git@github.com:nanyang24/music-vue.git

# install dependencies
$ npm install

# serve with hot reload at localhost:8080
$ npm run dev

# build for production with minification
$ npm run build
```
