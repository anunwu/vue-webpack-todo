<template>
  <section class="real-app">
    <input
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="接下来要做什么？"
        @keyup.enter="addTodo"
    >
    <Item
        v-for="todo in filterTodos"
        :todo="todo"
        :key="todo.id"
        @del="deleteTodo"
    />
    <Tabs
        :filter="filter"
        :todos="todos"
        @toggle="toggleFilter"
        @clearAllCompleted="clearAllCompleted"
    />
<!--    <router-view />-->
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
let id = 0
export default {
  // 组件内部的守卫
  beforeRouteEnter(to, from, next) {
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log('todo before enter')
    // 你可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。
    next(vm => {
      console.log('after enter vm.id is ', vm.id)
    })
  },
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  beforeRouteUpdate(to, from, next) {
    console.log('todo update enter')
    next()
  },
  // 这个离开守卫通常用来禁止用户在还未保存修改前突然离开。该导航可以通过 next(false) 来取消。
  beforeRouteLeave(to, from, next) {
    console.log('todo leave enter')
    if (window.confirm('are you sure')) {
      next()
    } else {
      next(false)
    }
  },
  props: ['id'],
  // 对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // mounted并不会再次被调用，因此如果想根据不同id显示不同内容时，数据初始化应该在beforeRouteUpdate进行
  mounted() {
    console.log('todo mounted')
  },
  data() {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item,
    Tabs
  },
  computed: {
    filterTodos() {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo(e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter(state) {
      this.filter = state
    },
    clearAllCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .real-app{
    width 600px
    margin 0 auto
    box-shadow 0 0 5px #666
  }
  .add-input {
    position relative
    margin 0
    width 100%
    font-size 24px
    font-family inherit
    font-weight inherit
    line-height 1.4em
    border none
    outline none
    color inherit
    box-sizing border-box
    padding 16px 16px 16px 36px
    box-shadow inset 0 -2px 1px rgba(0, 0, 0, 0.03)
  }
</style>
