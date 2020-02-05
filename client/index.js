import Vue from 'vue'
import App from './app.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import './assets/styles/global.styl'
import createRouter from './config/router'

const router = createRouter()

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
