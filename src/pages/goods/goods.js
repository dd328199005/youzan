import "./goods_common.css"
import "./goods_custom.css"
import "./goods.css"
import "./goods_theme.css"
import "./goods_mars.css"
import "./goods_sku.css"
import "./goods_transition.css"

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import mixin from 'js/mixin.js'
import qs from 'qs'
import Swiper from 'components/Swiper.vue'

let {id} = qs.parse(location.search.substr(1))

let detailTab = ['商品详情','本店成交']

new Vue({
    el: '#app',
    data: {
        details: null,
        detailTab,
        tabIndex:0, 
        dealList: null,
        bannerLists:[],
        skuType: 1,
        showSku:false,
        skuNum: 1,
        addEd: false,
        id,
        showAdd : false
    },
    created(){
        this.getDetails()
    },
    methods: {
        addCart(){
            axios(url.addCart,{
                id,
                number:this.skuNum
            }).then(res => {
                if(res.data.status === 200){
                    this.showSku = false;
                    this.addEd = true;
                    this.showAdd = true;
                    setTimeout(() => {
                        this.showAdd = false;
                    }, 1000);
                }
            })
        },
        chooseSku(num){
            this.skuType = num
            this.showSku = !this.showSku
        },
        changeNum(num){
            if (num<0 && this.skuNum === 1) return
            this.skuNum +=num
         
            
        },
        getDetails(){
            axios.post(url.details,{id}).then(res =>{
                this.details = res.data.data
                this.details.imgs.forEach(item => {
                    this.bannerLists.push({
                        clickUrl: '',
                        image: item
                    }
                       
                    )
                })
            })
        },
        changeTab(index){
            this.tabIndex = index
            if(index){
                this.getDeal()
            }
        },
        getDeal(){
            axios.post(url.deal, { id }).then(res => {
                this.dealList = res.data.data.lists
            })
        }
    },
    mixins:[mixin],
    components :{
        Swiper,
    },
    watch: {
        showSku(val,oldVal){
            document.body.style.overflow = val ? 'hidden' : 'auto'
            document.body.style.height = val ? '100vh' : 'auto'
        }
    }
})