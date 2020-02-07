<template>
  <div id="app">
    <div id="cover"></div>
    <Header />
<!--    <Todo></Todo>-->
    <router-link to="/app/123">app123</router-link>
    <router-link to="/app/456">app456</router-link>
    <router-link :to="{ name: 'app' }">app</router-link>
    <router-link to="/login">login</router-link>
    <transition name="fade">
      <router-view />
    </transition>
    <Footer />
<!--    <router-view name="a" />-->
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
// import Todo from './views/todo/todo.vue'

export default {
  components: {
    Header,
    Footer
    // Todo
  }
  // mounted() {
  //   console.log(this.$route)
  // }
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
