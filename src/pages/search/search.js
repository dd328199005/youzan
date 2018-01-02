import 'css/common.css'
import './search.css'
import 'mint-ui/lib/style.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import qs from "qs"
import mixin from 'js/mixin.js'
import velocity from 'velocity-animate'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

let {keyword, id} = qs.parse(location.search.substr(1)) 

new Vue({
    el:'.container',
    data: {
        searchLists: [],
        keyword,
        totop: false,
        loading: false,
        // allLoaded: false,
    },
    created() {
        this.getSearchList()
    },
    methods: {
        getSearchList() {
            axios.post(url.searchLists, { 
                keyword, id,
            }).then(res => 
            {   
                let curLists = res.data.lists
                this.searchLists = this.searchLists.concat(curLists)
            })
            // v - infinite - scroll="getSearchList"
            // infinite - scroll - disabled="loading"
            // infinite - scroll - distance="200"
        },
        getMoreLists(){
            console.log(2)
            this.loading = true
            axios.post(url.searchLists, {
                keyword, id,
            }).then(res => {
                let curLists = res.data.lists
                this.searchLists = this.searchLists.concat(curLists)
                this.loading = false
            })
            this.loading = false
        },
        move(){
            if (document.documentElement.scrollTop > 100) {
                this.totop = true
            }else{
                this.totop = false
            }
        },
        gototop(){
            velocity(document.body,'scroll',{duration: 300})
            // document.documentElement.scrollTop = 0
        }
    },
   
    mixins:[mixin]
})