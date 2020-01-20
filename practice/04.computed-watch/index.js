import Vue from 'vue'

new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name: {{ name }}</p>
      <p>Name: {{ getName() }}</p>
      <p> {{ number }}</p>
      <p> {{ fullName }}</p>
      <p>number:<input type="text" v-model="number"></p>
      <p>firstName:<input type="text" v-model="firstName"></p>
      <p>lastName:<input type="text" v-model="lastName"></p>
      <p>name:<input type="text" v-model="name"></p>
      <p>obj.a:<input type="text" v-model="obj.a"></p>
    </div>
  `,
  data: {
    firstName: 'anun',
    lastName: 'wu',
    number: 0,
    fullName: '',
    obj: {}
  },
  computed: {
    name() {
      console.log('new name')
      return `${this.firstName}${this.lastName}`
    }
    // computed也可以用get set方法，但一般不推荐使用，容易复杂化
    // name: {
    //   get() {
    //     console.log('new name')
    //     return `${this.firstName}${this.lastName}`
    //   },
    //   set(name) {
    //     const names = name.split(' ')
    //     this.firstName = names[0]
    //     this.lastName = names[1]
    //   }
    // }
  },
  // watch不会在页面刚渲染的时候执行，而是会在数据发生改变的时候才执行
  watch: {
    // firstName(newName, oldName) {
    //   this.fullName = newName + '' + this.lastName
    // }
    firstName: {
      handler (newName, oldName) {
        this.fullName = newName + '' + this.lastName
      },
      // 该配置项会使得handler函数在页面刚渲染的时候就执行一次
      immediate: true
    },
    obj: {
      handler() {
        console.log('obj changed')
      },
      immediate: true,
      // 在监听对象的时候如果没有添加deep:true配置项，
      // 则只会监听对象本身，也就是只有当Obj = {}一整个重新赋值的时候才会监听到
      // 而对象内部的属性发生变化时是不会引起监听的
      // 而该配置项deep就能深层的监听对象的内部每一层属性
      // deep: true
    },
    // 用于监听对象的某个属性
    'obj.a': {
      handler() {
        console.log('obj.a changed')
      },
      immediate: true
    }
  },
  methods: {
    getName() {
      console.log('getName invoked')
      return `${this.firstName}${this.lastName}`
    }
  }
})
