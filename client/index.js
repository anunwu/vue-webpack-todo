import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import VueRouter from 'vue-router'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(VueRouter)
Vue.use(Vuex)

const router = createRouter()
const store = createStore()

// vuex不常用的api
// 动态注册模块
store.registerModule('c', {
  state: {
    text: 2
  }
})
// 解绑模块
store.unregisterModule('c')

// 以下3个api主要用于vuex的插件
// 监听state变化,一旦state.count变化，则会返回state.count+1，newCount是+！后的结果
store.watch((state) => state.count + 1, (newCount) => {
  console.log('new count watched:', newCount)
})
// 监听mutations变化，每次有mutations被调用会执行以下函数
store.subscribe((mutation, state) => {
  // 哪个mutation被调用
  // console.log(mutation.type)
  // mutation接收的参数
  // console.log(mutation.payload)
})
// 监听actions变化
store.subscribeAction((action, state) => {
  // 哪个action被调用
  // console.log(action.type)
  // action接收的参数
  // console.log(action.payload)
})


// 全局导航守卫
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  next()
  // // 校验
  // if(to.fullPath === '/app') {
  //   // 路由跳转
  //   // next()
  //   // next({ name: 'app' })
  //   next('/login')
  // } else {
  //   next()
  // }
})
// 当全局守卫beforeEach、路由配置守卫beforeEnter、组件内部守卫beforeRouteEnter执行完才执行该钩子
router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  // 执行跳转
  next()
})
router.afterEach((to, from) => {
  console.log('after each invoked')
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#root')
