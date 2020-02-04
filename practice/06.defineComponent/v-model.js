import Vue from 'vue'

const component = {
  // 由于父组件在该组件绑定v-model后，相当于内部做了两件事：
  // 1. 在该组件内添加props一个变量。变量名即v-model="value"定义的名称
  // 2. 给该组件添加事件监听即input时将该值$emit出去
  // 这可能会存在问题：当props中的一个变量名用来实现一个业务功能，
  // 但是外部组件想v-model一个同名的变量，此时就会造成冲突，解决办法是：
  // model属性用来配置当外部对该组件使用v-model时内部自定义变量名和$emit的触发事件
  model: {
    prop: 'val',
    event: 'change'
  },
  props: ['val'],
  template: `
    <div>
      <input type="text" @input="handleInput" :value="val">
    </div>
  `,
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data() {
    return {
      value: '123'
    }
  },
  template: `
    <div>
<!--    自定义双向绑定事件-->
      <comp-one :val="value" @change="value = arguments[0]"></comp-one>
<!--      vue自带的双向绑定事件，但内部实现机制与上面类似-->
      <comp-one v-model="value"></comp-one>
    </div>
  `
})
