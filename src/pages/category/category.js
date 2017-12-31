import 'css/common.css'
import './category.css'

import Vue from 'vue'
import axios from 'axios'
import Foot from 'components/Footer.vue'
import url from 'js/api.js'

new Vue({
    el:'#app',
    data: {
        topLists:null,
        topIndex: 0,
        subData: null,
        rankData: null
    },
    components: {
        Foot,
    },
    methods: {
        toSearch(list){
            location.href = `search.html?keyword=${list.name}&id=${list.id}`
        },
        getLists(){
            axios.post(url.topList).then(res => {
                this.topLists = res.data.lists
            })
        },
        getSublist(id,index){
            this.topIndex = index
            if (index === 0) {
                this.getRank()
            }else{
                axios.post(url.subList,{id}).then(res => {
                    this.subData = res.data.data
                    
                })
            }
        },
        getRank(){
            axios.post(url.rank).then(res => {
                this.rankData = res.data.data
            })
        }
    },
    created() {
        this.getLists(),
        this.getSublist(0,0)
    },
    filters: {
        numPrice(price){
            let indexFloat =  `${price}`.split('').reverse().join('').indexOf('.');
            if (indexFloat === -1) {
                return price + '.00'
            } else if (indexFloat === 1){
                return price + '0'
            } else if (indexFloat === 2) {
                return price 
            }
        }
    }
})
