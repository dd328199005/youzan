// 引入插件
import Router from "vue-router"
import Vue from 'vue'
// 使用插件
Vue.use(Router)

let routes = [{
    path: '',
    component: require('../components/member.vue')
}, {
    path: '/address',
    component: require('../components/address.vue'),
    children: [
        {
            path: '',
            component: require('../components/all.vue')
            // redirect:'all'//同上面的相同效果
        },
        {
            path: 'all',
            name: 'all',
            component: require('../components/all.vue')
        },
        {
            path: 'form',
            name: 'form',
            component: require('../components/form.vue')
        }]
}
]

// 创建实例
let router = new Router({
    routes,
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }
})

export default router