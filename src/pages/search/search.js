import 'css/common.css'
import './search.css'

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
        searchLists: null,
        keyword,
        totop: false,
        loading: false,
        allLoaded: false,
        pageNum: 0
    },
    methods: {
        getSearchList() {
            // this.loading = true;
            // setTimeout(() => {
            //     console.log(2)
            //     this.loading = false;
            // }, 2500);
            // console.log(2)
            if (this.allLoaded) {
                return
            }
            this.loading = true
            // 告诉插件不要请求了
            axios.post(url.searchLists, { 
                keyword, id,
                pageNum: this.pageNum
            }).then(res => 
            {
                let curLists = res.data.lists
                if (curLists.length < 6) {
                    this.allLoaded = true
                }
                if (this.searchLists) {
                    this.searchLists = this.searchLists.concat(curLists)
                    // this.loading = false
                } else {
                    //第一次请求数据
                    this.searchLists = curLists
                    this.loading = false
                }
                
                this.pageNum++
                console.log(this.loading)
                console.log(2)
            })
            
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
    created() {
        this.getSearchList()
    },
    mixins:[mixin]
})