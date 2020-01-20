import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template:`<div>{{ text }}</div>`,
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this.$el, 'beforeCreate')
  },
  created () {
    console.log(this.$el, 'created')
  },
  beforeMount () {
    console.log(this.$el, 'beforeMount')
  },
  mounted () {
    console.log(this.$el, 'mounted')
  },
  beforeUpdate () {
    console.log(this.$el, 'beforeUpdate')
  },
  updated () {
    console.log(this.$el, 'updated')
  },
  activated () {
    console.log(this.$el, 'activated')
  },
  deactivated () {  // 这两个跟组件的keep-alive有关
    console.log(this.$el, 'deactivated')
  },
  beforeDestroy () {
    console.log(this.$el, 'beforeDestroy')
  },
  destroyed () {
    console.log(this.$el, 'destroyed')
  },
  // 在beforeMount和mounted之间执行
  render(h) {
    // throw new TypeError('render error')
    console.log('render function invoked')
    return h('div', {}, this.text)
  },
  // 是在本组件render渲染过程中报错才会执行该函数，但只会在开发环境被调用，生产环境不被调用
  renderError(h , err) {
    return h('div', {}, err.stack)
  },
  errorCaptured(err, vm, info) {
    // 会向上冒泡，并且正式环境可以使用
  }
})

app.$mount('#root')
// setInterval(() => {
//   app.text += 1
// }, 1000)
setTimeout(() => {
  // 主动销毁组件，但一般不这么做
  app.$destroy()
}, 1000)
