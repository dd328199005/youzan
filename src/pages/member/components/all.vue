<template>
   <div class="container " style="min-height: 597px;">
    <div class="block-list address-list section section-first js-no-webview-block">
      <a class="block-item js-address-item address-item " 
        @click="toEdit(list)"
        v-if="lists && lists.length"
        v-for="(list) in lists"
        :class="{'address-item-default':list.isDefault}"
        :key="list.id"
      >
        <div class="address-title">{{list.name}} {{list.tel}}</div>
        <p>{{list.provinceName}}{{list.cityName}}{{list.districtName}}{{list.address}}</p>
        <a class="address-edit" 
          
          >修改</a>
      </a>
    
    </div>
    <div class="block stick-bottom-row center">
      <router-link :to="{name:'form',query:{type:'add',instance:{a:1}}}" class="btn btn-blue js-no-webview-block js-add-address-btn" >
            新增地址
        </router-link>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import addressUrl from "js/easy_api.js"
// import address from "js/address_service.js";

export default {
  // data(){
  //   return {
  //     data: null,
  //   }
  // },
  created(){
    if (!this.lists) {
      this.$store.dispatch('getLists')
    }
    

    // address.list().then(res=>{
    //   this.data = res.data.lists
    // })
    // document.documentElement.scrollTop = 0

    // axios.post(addressUrl.addressList).then(res => {
    //   this.data = res.data.lists
    // })

  },
  computed:{
    lists() {
      return this.$store.state.lists
    }
  },
  methods: {
    toEdit(list){
      this.$router.push({name:'form',query:{type:'edit',instance:list}})//编程式导航
    }
  }
}
</script>