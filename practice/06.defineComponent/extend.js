// extend即继承，用于给已有组件扩展功能而无需重新写一个新组件

import Vue from 'vue'

const component = {
  props: {
     active: Boolean,
     propOne: {
       required: true
     }
  },
  template: `
    <div>
      <input type="text" v-model="text">
      <span @click="handleChange">{{ propOne }}</span>
      <span v-show="active">see me if active</span>
    </div>
`,
  // 只有根组件可以采用data:{}这样定义，子组件必须定义一个data函数
  data () {
    // 不能return一个对象变量，因为这样所有引用该组件的都共享该变量的引用
    // return data
    return {
      text: 0
    }
  },
  mounted() {
    console.log('comp mounted')
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

const component2 = {
  // 指定从哪个组件进行继承
  extends: component,
  data () {
    return {
      text: 123
    }
  },
  mounted() {
    console.log('comp2 mounted')
  }
}

/*
  extend的使用方法一
 */
// const CompVue =  Vue.extend(component)
//
// new CompVue({
//   el: '#root',
//   // 传props
//   propsData: {
//     propOne: '123'
//   },
//   // 覆盖component中的data
//   data() {
//     return {
//       text: 2
//     }
//   },
//   // 无法覆盖component的mounted
//   // 会先执行component的mounted，再执行这里的mounted
//   mounted() {
//     console.log('instance mounted')
//   }
// })

/*
  extend的使用方法二
 */
new Vue({
  el: '#root',
  components: {
    Comp: component2
  },
  template: `<comp prop-one="hello"></comp>`
})
