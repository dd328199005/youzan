import 'css/common.css'
import './index.css'
import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'

import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);

import Foot from 'components/Footer.vue'
import Swiper from 'components/Swiper.vue'

new Vue({
    el:'#app',//挂载点，此处不写的话需要在vm.$mount()触发
    data: {
        lists: null,
        pageNum:1,
        pageSize:6,
        loading: false,
        allLoaded:false,
        bannerLists:[],
    },
    created(){
        this.getLists(),
        this.getBanner()
    },
    methods: {
        getLists(){
            // 判断是否请求完数据了
            if (this.allLoaded) {
                return
            }
            this.loading = true
            // 告诉插件不要请求了
            axios.post(url.hotLists, {
                pageNum: this.pageNum,
                pageSize: this.pageSize,
            }).then(res => {
                let curLists = res.data.lists
                if (curLists.length < this.pageSize) {
                    this.allLoaded = true
                }
                if (this.lists) {
                    this.lists = this.lists.concat(curLists)
                }else{
                    //第一次请求数据
                    this.lists = curLists 
                }
                this.loading = false
                this.pageNum++
                console.log(2)
            })
        },
        getBanner(){
            axios.get(url.banner).then(res => {
                this.bannerLists = res.data.lists

                
            })
        }
    },
    components: {
        Foot,
        Swiper
    }
})