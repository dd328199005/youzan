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
        add(state,instance){
            state.lists.push(instance)
        },
        remove(state,id){
            let index =  state.lists.findIndex(item =>{
                return item.id === id
            })
            state.lists.splice(index,1)
        },
        update(state,instance){
            let lists = JSON.parse(JSON.stringify(state.lists))
            let index = lists.findIndex(item => {
                return item.id === instance.id
            })
            lists[index] = instance
            state.lists = lists
        },
        setDefault(state, id){
            let lists = state.lists
            lists.forEach(item => {
                item.isDefault = item.id === id? true:false
            });
        }
    },
    actions: {
        setDefault({commit},id){
            address.setDefault(id).then(res => {
                commit('setDefault',id)
            })
        },
        update({commit},instance){
            address.update(instance).then(res => {
                commit('update',instance)
            })
        },
        getLists({commit}){
            address.list().then(res=>{
                commit('init',res.data.lists)
            })
        },
        addAction({commit}, instance){
            address.add(instance).then(res =>{
                commit('add',instance)
            })
        },
        remove({commit},id){
            console.log(2)
            address.remove(id).then(res =>{
                commit('remove',id)
            })
        }
    },

})

export default store