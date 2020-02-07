import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    // path: '/app/:id',
    // props: true时vue-router会将路由传参的id作为Todo组件的props传进去，
    // 而无需通过this.$route.params.id来获取,使得组件与路由解耦
    // props: true,
    // props: {
    //   id: 455
    // },
    // props: (route) => ({ id: route.query.b }),
    component: Todo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'app'
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
    component: Login
  }
]
