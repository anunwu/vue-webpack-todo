<template>
  <div id="app">
    <div id="cover"></div>
    <Header />
    <p>{{ fullName }} {{ count }} </p>
<!--    <p>textA:{{ textA }} 、 textB:{{ textB }}、textC:{{ textC }} 、textPlus:{{ textPlus }}</p>-->
<!--    <Todo></Todo>-->
    <router-link to="/app/123">app123</router-link>
    <router-link to="/app/456">app456</router-link>
<!--    <router-link :to="{ name: 'app' }">app</router-link>-->
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
<!--    <router-view name="a" />-->
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  },
  computed: {
    // count () {
    //   return this.$store.state.count
    // },
    // fullName() {
    //   return this.$store.getters.fullName
    // }
    // textA () {
    //   // 调用a模块中的state
    //   return this.$store.state.a.text
    // },
    // textB () {
    //   return this.$store.state.b.text
    // }
    ...mapState({
      count: 'count',
      // 模块化的state必须用函数获取
      // textA: (state) => state.a.text,
      // textB: (state) => state.b.text,
      // textC: (state) => state.c.text
    }),
    // ...mapGetters(['fullName', 'a/textPlus']),
    ...mapGetters({
      fullName: 'fullName',
      // textPlus: 'a/textPlus'
    })
  },
  mounted() {
    // console.log(this.$route)
    // console.log(this.$store)
    let i = 1

    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)

    // setInterval(() => {
    //   this.updateCount({
    //     num: i++,
    //     num2: 1
    //   })
    // }, 1000)

    // this.$store.dispatch('updateCountAsync', {
    //   num: 2,
    //   time: 1000
    // })

    this.updateCountAsync({
      num: 2,
      time: 1000
    })

    // this.updateText(666)
    // this['a/updateText'](666)

    // console.log('a/textPlus:', this['a/textPlus'])

    // this['a/add']()

    // this['b/testActions']()
  },
  methods: {
    // updateText是a模块中的mutations，为什么不需要跟state一样函数式调用返回a模块的mutations？
    // 原因是vuex默认所有模块的mutations命名不能冲突,但当给模块设置了namespaced: true时，这样下面的引用方式会报错
    // ...mapMutations(['updateCount', 'updateText']),
    // 当给模块设置了namespaced: true时，必须模块化a/updateText，当调用时this['a/updateText']
    // ...mapMutations(['updateCount', 'a/updateText']),
    ...mapMutations(['updateCount']),
    // ...mapActions(['updateCountAsync', 'a/add', 'b/testActions'])
    ...mapActions(['updateCountAsync'])
  }
}
</script>

<style lang="stylus" scoped>
#app{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
}
#cover{
  position absolute
  left 0
  right 0
  top 0
  bottom 0
  background-color #999
  opacity 0.9
  z-index -1
}
</style>
