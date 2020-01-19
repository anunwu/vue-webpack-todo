import Vue from 'vue'

// new Vue({
//   el: '#root',
//   template: `<div>this is</div>`
// })

const app = new Vue({
  template: `<div ref="test">{{ text }} {{ obj.a }}</div>`,
  data: {
    text: 0,
    // 初始状态obj没有a属性，当动态添加属性a时，并不会渲染出来
    // 解决方法要么给a一个空字符串初始值，要么调用app.$forceUpdate()强制更新组件
    // 还可以用app.$set(app.obj, 'a', '1')，也可以解决这个问题
    obj: {}
  },
  // 组件都有生命周期，当切换组件时，watch监听的值应该被销毁，不然会引起内存溢出等问题
  // 但是在这里定义的watch会自动注销。而通过app.$watch()手动添加的则需要手动销毁
  // watch: {
  //   text(newText, oldText) {
  //     console.log(`${newText} : ${oldText}`)
  //   }
  // }
})
// app.$mount('#app') 等效于==> new Vue({ el: '#root' })
app.$mount('#root')

// let i = 0
setInterval(() => {
  // i++
  // app.text += 1
  // app.text += 1
  // app.text += 1
  // app.text += 1  => vue的数据更新是异步的，连续四个+1，dom的变化是4叠加，而不是每次更新都+1

  // app.obj.a = i
  // app.$forceUpdate()
  // 上面两行代码也可以用下面一行代码解决
  // app.$set(app.obj, 'a', i)

  // app.$options 跟 vue实例不是同一个引用
  // app.$options.data.text += 1
  // app.$data.text += 1
} , 1000)

/*
  vue实例的属性：
 */
console.log('data:', app.$data)
console.log('props:', app.$props)
console.log('el:', app.$el)

// 拥有vue实例的内容，但跟vue实例不是同个引用
console.log('options:', app.$options)

// 给$options重新复制render属性会影响了渲染效果
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function')
// }

// vue应用是一颗树状结构,$root是根节点，也就是最外层的实例
// 在这里app.$root === app，因为这里只有一个实例
console.log('root:', app.$root)
console.log('children:', app.$children)
console.log('slots:', app.$slots)
console.log('scopedSlots:', app.$scopedSlots)
console.log('refs:', app.$refs)  // { test:div }

// 服务端渲染才会用到
console.log(app.$isServer)


/*
  vue实例的方法
 */
// 以下方式添加watch是手动添加，所以撤销也需要手动撤销
const unWatch = app.$watch('text', (newText, oldText) => {
  console.log(`${newText} : ${oldText}`)
})
// 调用unWatch()就能注销掉
setTimeout(() => {
  unWatch()
}, 2000)

// // 监听事件,多次监听
// app.$on('test', (a, b) => {
//   console.log(`test emited ${a} ${b}`)
// })
// // 触发事件，不会冒泡，可穿参数
// setInterval(() => {
//   app.$emit('test', 1, 2)
// }, 1000)
//
// // 只监听一次
// app.$once('test', (a, b) => {
//   console.log(`test once emited ${a} ${b}`)
// })

// 强制组件重新渲染
// app.$forceUpdate()

