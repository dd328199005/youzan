## 
1. 挂载点，不写的话需要在vm.$mount()触发
2. 挂载点不能写HTML / BODY  可以在需要管理外层嵌套一个div
3. mint-ui ui库 阅读官网~看全局或者按需引入的介绍 [这是移动端的]elment是PC端的
4. concat()数组合并方法

6. 组件嵌入 is 属性标识渲染结果~~ 单vue组件中可不写

5. 单vue组件 template是必须的而且{根节点}只能是一个 script只能有一个

6. YD ui vue推荐移动端UI组件库

7. img下面有缝隙的解决问题vertical-algin：top

8. created 生命周期 props 向child传递数据【相当于自定义属性】可以写成对象也可以写成数组

9. axios swiper 第三方库  fullpage
10. filters过滤器  利用【|】

11. 下面的值为false:

false

null

undefined

""  即空字符串

0

NaN

12. 混合mixins的使用

13. velocity-animate 动画[import velocity from 'velocity-animate']

14. v-html   qs解析query的JS库

15. [v-clock]{
      display: none;
    }  【编译没有完成的时候不显示】

16. 图片需要固定宽高

17. touchmove【移动端事件】

18. mockjs【模拟数据网站】

19. 原始数据上没有的属性~添加时需要先处理原始数据后赋值~~~不然的话后添加的属性将不是响应式的

20. 计算属性Computed的应用  set 和 get的使用方法

21. v-if v-show  ! ?  都会把相关变量转化成布尔值

22. hammerjs 移动端手势库

23. promise 的运用~

24. Class 的静态方法的运用 【static】

25. ref做识别dom  【dom节点的相应注册】

26. 函数传入 $event用来传入对象事件

27. router-view   router-link的使用   【路由默认使用hash】

28. scoped 【HTML5新特性】

29.  this.$router.push({path:'/address/form'})//编程式导航     router-link //正常式导航

30. :to="{name:"all"}"  可以给路由起名字 然后动态绑定to来使用它

31. vux vue ui库

32. v-model.trim去除前后空格

33.   scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    }  【路由滚动行为——回到顶部】

34. $on $emit 不同的使用方法

35. vuexLists: {
            handler(){
                this.$router.go(-1)
            },
            deep: true
        }
        【深度监听】watch监听内部的变化     【对对象的监听有时候需要json.parse.需要深拷贝】应为内存不变不会引起变化

36. 组件分发map查文档   mapActions   map…

37. 状态管理的时候异步操作只能在action  对数据的修改要在mutation里


38. vuex 不同模块可以有不同的的内部名字 但是getter不能重名