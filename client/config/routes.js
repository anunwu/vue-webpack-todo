// import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
// 在定义路由时通过import异步加载组件，从而提高首屏加载速度

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app/:id',
    // path: '/app/:id',
    // props: true时vue-router会将路由传参的id作为Todo组件的props传进去，
    // 而无需通过this.$route.params.id来获取,使得组件与路由解耦
    props: true,
    // props: {
    //   id: 455
    // },
    // props: (route) => ({ id: route.query.b }),
    component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   a: Login
    // },
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'app'
    },
    // 路由配置的守卫
    beforeEnter(to, from, next) {
      console.log('app route before enter')
      next()
    }
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
    // components: {
    //   default: Login,
    //   a: Todo
    // }
  }
]
