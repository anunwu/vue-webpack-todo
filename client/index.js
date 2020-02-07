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
