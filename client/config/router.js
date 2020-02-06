import Router from 'vue-router'

import routes from './routes'

export default () => {
  return new Router({
    routes,
    mode: 'history',
    // 配置路径的前缀路径
    // base: '/base'
    // 配置点击路由链接router-link时的类名,
    // linkActiveClass是路由完全匹配当前路径
    linkActiveClass: 'active-link',
    // linkExactActiveClass是路由不完全匹配挡圈路径,
    // 如访问/login/exact时，router-link为/login会加上linkActiveClass,而/login/exact会加上linkExactActiveClass
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savePosition) {
      // 当之前进入页面时有滚动过，保存之前滚动效果
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // 不是每个浏览器都支持history模式，fallback: true是vue会在浏览器不支持这种模式的情况下帮我们转化为hash模式
    fallback: true
    // 将?a=1&b=2字符串转成object
    // parseQuery (query) {
    //
    // },
    // 将object转化成字符串
    // stringifyQuery (object) {
    //
    // }
  })
}
