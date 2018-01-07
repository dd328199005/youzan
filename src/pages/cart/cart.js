import './cart_base.css'
import './cart_trade.css'
import './cart.css'
import './cart_model.css'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import velocity from 'velocity-animate'
import Cart from 'js/cart_service.js'
new Vue({
    el:'.container',
    data: {
        lists: null,
        total: 0,
        editShop: null,
        editShopIndex: -1,
        isloading : false,
        removePopup: false,
        removeDate: null,
        removeMsg : null
    },
    created(){
        this.getList()
    },
    computed: {
        allSelected:{
            get(){
                if(this.lists && this.lists.length){
                    return this.lists.every( (shop)=>{
                        return shop.checked
                    })
                }
                // return false
            },
            set(newVal){
                    this.lists.forEach((shop) => {
                         shop.checked = newVal
                         shop.goodsList.forEach(good => {
                             good.checked = newVal
                         }) 
                    })
            }
        },
        allRemoveSelected:{
            get(){
                if (this.editShop) {
                    return this.editShop.removeChecked
                }else{
                    return false
                }
            },
            set(newVal){
                if (this.editShop) {
                    this.editShop.removeChecked = newVal
                    this.editShop.goodsList.forEach(good => {
                        good.removeChecked = newVal
                    })
                }

            }
        },
        selectLists(){
            if(this.lists && this.lists.length){
                let arr = []
                let total = 0
                this.lists.forEach(shop => {
                    shop.goodsList.forEach(good => {
                        if (good.checked) {
                            arr.push(good)
                            total += good.price * good.number
                        }
                    })
                })
                this.total = total
                let totalList = {arr,total}
                return totalList
            }else{
                let arr = []
                let total = 0
                let totalList = { arr, total }
                return totalList
            }
        },
        removelists(){
            let arr = []
            if (this.editShop) {
                this.editShop.goodsList.forEach(good => {
                    if (good.removeChecked) {
                        arr.push(good)
                    }
                })
                return arr
            }else{
                return []
            }
        }
    },
    mixins:[mixin],
    methods: {
        edit(shop, shopIndex){
            this.lists.forEach(shop =>{
                shop.removeChecked = false
                shop.goodsList.forEach(good => {
                    good.removeChecked = false
                })
            })
            shop.editing = !shop.editing
            shop.editMsg = shop.editing? '完成':'编辑'
            this.lists.forEach((item,idx)=>{
                if (shopIndex !== idx) {
                    item.editing = false
                    item.editMsg = shop.editing? '':'编辑'
                }
            })
            this.editShop = shop.editing ? shop : null
            this.editShopIndex = shop.editing ? shopIndex : -1
            
        },
        getList(){
            axios.post(url.cartLists).then(res => {
                let lists = res.data.cartList
                lists.forEach(shop => {
                    shop.removeChecked = false
                    shop.editing = false
                    shop.editMsg = '编辑'
                    shop.checked = false
                    shop.goodsList.forEach(good => {
                        good.checked = false
                        good.removeChecked = false
                    })
                });
                this.lists = lists
            })
        },
        selectGood(shop,good,shopIndex){
            let attr = this.editShop ? 'removeChecked' : 'checked'
            if (this.editShop) {
                if (this.editShopIndex === shopIndex) {
                    good[attr] = !good[attr]
                    shop[attr] = shop.goodsList.every((good) => {
                        return good[attr]
                    })
                }else{
                    return
                }
            }else{
                good[attr] = !good[attr]
                shop[attr] = shop.goodsList.every((good) => {
                    return good[attr]
                })
            }
            
        },
        selectShop(shop, shopIndex){
            let attr = this.editShop? 'removeChecked':'checked'
            if (this.editShop) {
                if (this.editShopIndex === shopIndex) {
                    shop[attr] = !shop[attr]
                    shop.goodsList.forEach((good) => {
                        good[attr] = shop[attr]
                    })
                }else{
                    return
                }
            }else{
                shop[attr] = !shop[attr]
                shop.goodsList.forEach((good) => {
                    good[attr] = shop[attr]
                })
            }
        },
        selectAll(){
            let attr = this.editShop ? 'allRemoveSelected':'allSelected'
            this[attr] = !this[attr]
        },
        reduce(good){
            if (good.number === 1 || good.number<0) {
                return
            }
            if (this.isloading) {
                return
            }
            this.isloading = true
            Cart.reduce(good.id).then(res => {
                good.number--
                this.isloading = false
            })
            // axios.post(url.cartReduce, {
            //     id: good.id,
            //     number: 1
            // }).then(res => {
            //     good.number--
            //     this.isloading = false
            // })
        },
        add(good){
            if (this.isloading) {
                return
            }
            this.isloading = true
            Cart.add(good.id).then(res => {
                good.number++
                this.isloading = false
            })
            // axios.post(url.addCart,{
            //     id: good.id,
            //     number: 1
            // }).then(res => {
            //     good.number++
            // })
        },
        remove(shop, shopIndex, good, goodIndex){
            this.removePopup = !this.removePopup
            document.body.style = "height:100%; overflow:hidden"
            this.removeDate = { shop, shopIndex, good, goodIndex }
            this.removeMsg = '确定删除该商品么'
        },
        allEditRemove(){
            this.removePopup = true
            this.removeMsg = `确定删除所选${this.removelists.length}商品么`
        },
        removeConfirm() {
            if (this.removeMsg === '确定删除该商品么') {
                let { shop, shopIndex, good, goodIndex } = this.removeDate
                axios.post(url.cartRemove, {
                    id: good.id
                }).then(res => {
                    shop.goodsList.splice(goodIndex, 1)
                    this.removePopup = !this.removePopup
                    document.body.style = ""
                    if (shop.goodsList.length === 0) {
                        this.lists.splice(shopIndex, 1)
                        this.removeShop()
                    }
                })
            }else {
                let ids = []
                this.removelists.forEach(good => {
                    ids.push(good.id)
                })
                axios.post(url.cartRemove,{
                    ids
                }).then(res => {
                    let arr = []
                    this.editShop.goodsList.forEach(good => {
                        if (good.removeChecked === false) {
                            arr.push(good)
                        }
                    })
                    this.editShop.goodsList = arr 
                    if (this.editShop.goodsList.length) {
                        console.log('不为空')
                    }else {
                        this.lists.splice(this.editShopIndex, 1)
                        this.removeShop()
                        console.log('为空')
                    }
                    this.removePopup = !this.removePopup
                    
                    // let arr = []
                    // this.editShop.goodsList.forEach(good =>{
                    //     let index = this.removelists.findIndex(item =>{
                    //         return item.id === good.id
                    //     })
                    //     if (index === -1) {
                    //         arr.push(good)
                    //     }
                    // })
                    // if (arr.length) {
                    //     this.editShop.goodsList = arr
                    // }else{
                    //     this.lists.splice(this.editShopIndex,1)
                    //     this.removeShop()
                    // }
                    // this.removePopup = !this.removePopup
                })
            }
            
        },
        removeShop(){
            this.editShop = null
            this.editShopIndex = -1
            this.lists.forEach(shop => {
                shop.editing = false
                shop.editMsg = '编辑'
            })
        },
        end(e, good, shopIndex, goodIndex){
            let endX = e.changedTouches[0].clientX
            let left = '0px'
            if (good.startX - endX > 100) {
                left = '-60px'
            }
            if (endX - good.startX > 100) {
                left = '0px'
            }
            velocity(this.$refs[`goods${shopIndex}-${goodIndex}`],{
                left,
                
            },{
                duration: 100
            })
            
        },
        start(e,good){
            good.startX = e.changedTouches[0].clientX
        }
    },
})