import Vue from 'vue'

const component = {
  name: 'comp',
  props: ['props1'],
  // template: `
  //   <div :style="style">
  //       <slot></slot>
  //   </div>
  // `,
  render(createElement) {
    return createElement('div',{
      style: this.style,
      on: {
        click: () => this.$emit('click')
      }
    }, [
      // this.$slots.default, ==> <slot></slot>
      this.$slots.header,    //  ==> <slot name="header"></slot>
      this.props1
    ])
  },
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
  // template: `
  //   <comp-one ref="comp">
  //       <span ref="span">{{ value }}</span>
  //   </comp-one>
  // `,
  render (createElement) {
    // return this.$createElement()
    return createElement(
      'comp-one',
      {
        ref: 'comp',
        // 传props的值
        props: {
          props1: this.value
        },
        // 事件绑定
        on: {
          click: this.handleClick
        },
        // nativeOn不需要在子组件发送emit，vue已经自动帮我们将事件绑定到原生的节点
        // 即当绑定在原生节点上就直接绑定在该节点，若绑定在组件上，则绑定到组件的原生节点上
        // nativeOn: {
        //   click: this.handleClick
        // }
      },
      // 当该节点的内容是字符串就直接传入字符串，当是子节点是就用数组
      [
        createElement('span', {
          ref: 'span',
          slot: 'header',
          // domProps: {
          //   innerHTML: '<span>1234</span>'
          // }
          attrs: {
            id: 'test-id'
          }
        }, this.value)
      ]
      )
  },
  methods: {
    handleClick() {
      console.log('clicked')
    }
  }
})
