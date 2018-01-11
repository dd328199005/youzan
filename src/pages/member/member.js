import "./transition.css";
// 使用路由
import Vue from "vue"
import router from './router/index.js'
import store from './vuex/index.js'
//根组件注入
new Vue({
    el: '#app',
    router,
    store
})