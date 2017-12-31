<template>
  <div class="bottom-nav">
      <ul>
        <li :class="{active:index == curActive}"
          v-for="(item,index) in navConfig" 
          @click="change(item,index)" 
        >
          <a>
            <i :class="item.icon"></i>
            <div>{{item.name}}</div>
          </a>
        </li>

      </ul>
    </div>
</template>

<script>
  import qs from 'qs'
  let {index} = qs.parse(location.search.substr(1))

  let navConfig = [{
    name: '有赞',
    icon: 'icon-home',
    href: 'index.html'
  },{
    name: '分类',
    icon: 'icon-category',
    href: 'category.html'
  },{
    name: '购物车',
    icon: 'icon-cart',
    href: 'cart.html'
  },{
    name: '我',
    icon: 'icon-user',
    href: 'member.html'
  }
  ]

  export default {
    data(){
      return {
        navConfig,
        curActive: parseInt(index) || 0
      }
    },
    methods:{
      change(item,index){
        location.href = `${item.href}?index=${index}`
      }
    }

  }
    
</script>

<style>
    .wakeup-app {
  position: fixed;
  top: -60px;
  left: 0;
  z-index: 5;
  background-color: #ececec;
  width: 100%;
  height: 60px;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  transition: all .5s linear
}

.wakeup-app .close {
  float: left;
  width: 40px;
  height: 60px;
  position: relative;
  cursor: pointer
}

.wakeup-app .close:after {
  position: absolute;
  display: block;
  content: "\D7";
  width: 18px;
  height: 18px;
  font-size: 14px;
  line-height: 16px;
  border-radius: 9px;
  color: #fff;
  background-color: #dddedf;
  top: 50%;
  left: 50%;
  margin-top: -9px;
  margin-left: -9px
}

.wakeup-app .app-icon {
  float: left;
  width: 60px;
  height: 60px;
  background-image: url(/v2/image/wap/weixin_share_default_logo.png);
  background-size: 80% 80%;
  background-repeat: no-repeat;
  background-position: 50%
}

.wakeup-app .description {
  float: left;
  text-align: left;
  padding: 5px 0 5px 3px
}

.wakeup-app .description .title {
  margin: 6px 0;
  font-size: 15px;
  line-height: 18px;
  font-weight: 400
}

.wakeup-app .description .meta {
  color: #999;
  line-height: 1;
  font-size: 12px;
  letter-spacing: 1px
}

.wakeup-app .btn {
  float: right;
  margin-top: 12px;
  margin-right: 12px;
  padding: 8px;
  border-color: #fc5959;
  background-color: #fc5959;
  letter-spacing: 1px
}

.wakeup-app-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: #000;
  opacity: .8;
  z-index: 6
}

.wakeup-app-opentip {
  position: fixed;
  height: 144px;
  top: 0;
  left: 10px;
  right: 10px;
  z-index: 7
}

.wakeup-app-opentip .lay {
  width: 100%;
  height: 120px;
  background-color: #f9f9f9;
  border-radius: 0 0 8px 8px;
  background: #f9f9f9 url(/v2/image/wap/opentip.png) 100% 4px no-repeat;
  background-size: 127px auto
}

.wakeup-app-opentip .note {
  float: right;
  margin: 39px 58px 0 0;
  width: 160px;
  line-height: 20px
}

.wakeup-app-opentip .note h3 {
  font-size: 20px;
  margin-bottom: 6px;
  font-weight: 400
}

.wakeup-app-opentip .note p {
  font-size: 14px
}
</style>

