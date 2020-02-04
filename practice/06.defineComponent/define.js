import Vue from 'vue'

const data = {
  text: 0
}

const parent = new Vue({
  name: 'parent'
})

const component = {
  // props: ['active', 'propOne']
  // props: {
  //    active: Boolean,
  //    propOne: String
  // },
  props: {
    active: {
      type: Boolean,
      // required 与 default 同时存在没意义，一般选一个
      // required: true,
      // default 如果是引用类型，必须将以函数的形式出现如default(){ return {} },
      // 原因与data一致，防止出现多个组件共用同个引用
      default: true,
      // 自定义验证数据，type属性用于验证类型，自定义validator可更详细地验证
      // validator (val) {
      //   return typeof val === 'boolean'
      // }
    },
    propOne: String
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
    // 查看父组件的名称, 即组件定义中的属性name
    // this.$parent.name ==> undefined 由于name定义后不会出挂载到组件的实例中，而是挂载到组件的$options对象中
    console.log('我的父组件是', this.$parent.$options.name)
    // 通过this.$parent直接修改父组件中的data，但不建议这么做，会导致后期维护较为困难
    this.$parent.text = '我是子组件'
  },
  methods: {
    handleChange () {
      this.$emit('change')
    }
  }
}

// 全局注册组件
// 命名规则：首字母大写，采用驼峰命名
// 但在html中不区分大小写且可用-代替驼峰
// Vue.component('CompOne', component)
new Vue({
  // 设置父组件
  parent: parent,
  name: 'Root',
  // 局部注册组件
  components: {
    CompOne: component
  },
  el: '#root',
  template: `
    <div>
      <comp-one :active="true" :prop-one="text" @change="handleChanger"></comp-one>
      <comp-one :activce="false" ref="comp2"></comp-one>
      <span>{{ text }}</span>
    </div>
  `,
  mounted () {
    // console.log(this.$refs.comp2)
    console.log(this.$parent.$options.name)
  },
  data: {
    text: 'text1'
  },
  methods: {
    handleChanger () {
      this.text += 1
    }
  }
})
