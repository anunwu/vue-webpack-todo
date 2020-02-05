import Vue from 'vue'

const ChildComponent = {
  template: `<div>child component : {{ data.value }}</div>`,
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.$parent.$options.name)
    console.log('爷爷是', this.yeye, this.data.value)
  }
}

const component = {
  name: 'comp',
  components: {
    ChildComponent
  },
  template: `
    <div :style="style">
<!--    具名插槽-->
<!--      <div class="header">-->
<!--        <slot name="header"></slot>-->
<!--      </div>-->
<!--      <div class="body">-->
<!--        <slot name="body"></slot>-->
<!--      </div>-->
<!--        作用于插槽-->
        <slot :value="value" aaa="1"></slot>
        <child-component></child-component>
    </div>
  `,
  data() {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'componentValue'
    }
  }
}

new Vue({
  components: {
    CompOne: component
  },
  // vue的实例是个树状结构，子节点只能通过this.$parent拿到父级节点，无法拿到爷爷级别，但是有以下方法可以解决：
  // provide提供的所有变量都可以被所有子节点通过inject拿到
  provide () {
    // provide定义的变量只会在当前组件实时更新，子组件通过inject拿到的变量无法实时更新，解决办法：
    const data = {}

    Object.defineProperty(data, 'value', {
      get: () => this.value,
      enumerable: true
    })

    return {
      yeye: this,
      // value: this.value
      data
    }
  },
  el: '#root',
  data() {
    return {
      value: 'instanceValue'
    }
  },
  mounted() {
    console.log(this.$refs.comp.value, this.$refs.span)
  },
  template: `
    <div>
      <comp-one ref="comp">
<!--        <span slot="header">this is header</span>-->
<!--        <span slot="body">this is body</span>-->
        <span slot-scope="props" ref="span">{{ value }} {{ props.value }} {{ props.aaa }} </span>
      </comp-one>
      <input type="text" v-model="value">
    </div>
  `
})
