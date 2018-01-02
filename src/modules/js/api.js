import axios from 'axios'
let url = {
    hotLists: '/index/hotLists',
    banner:'/index/banner',
    topList: '/category/topList',
    subList: '/category/subList',
    rank: '/category/rank',
    searchLists: '/search/list',
    details: '/goods/details',
    deal: '/goods/deal',
    addCart: '/cart/add',
}
//开发环境与真实环境的切换
let host = 'http://rap.taobao.org/mockjsdata/24170';
for(let key in url){
    if(url.hasOwnProperty(key)){
        url[key] = host + url[key]
    }
}

export default url