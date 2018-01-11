import Vue from 'vue'

//引入Vuex插件
import Vuex from 'vuex'

Vue.use(Vuex)

import address from "js/address_service.js";

// 创建Store实例

const store = new Vuex.Store({
    state: {
        lists: null,

    },
    mutations: {
        init(state,lists){
            state.lists = lists
        },
    },
    actions: {
        getLists({commit}){
            address.list().then(res=>{
                commit('init',res.data.lists)
            })
        },
    },

})

export default store