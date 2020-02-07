<template>
  <div id="app">
    <div id="cover"></div>
    <Header />
    <p>{{ fullName }} {{ count }} </p>
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
    ...mapState(['count']),
    ...mapGetters(['fullName'])
  },
  mounted() {
    // console.log(this.$route)
    console.log(this.$store)
    let i = 1
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // setInterval(() => {
    //   this.updateCount(i++)
    // }, 1000)
    // this.$store.dispatch('updateCountAsync', {
    //   num: 2,
    //   time: 1000
    // })
    this.updateCountAsync({
      num: 2,
      time: 1000
    })
  },
  methods: {
    ...mapMutations(['updateCount']),
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
