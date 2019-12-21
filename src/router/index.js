import Vue from 'vue'
import VueRouter from 'vue-router'
import Film from '@/views/Film.vue'
// import Cinema from '@/views/Cinema.vue'
// import Center from '@/views/Center.vue'
import Nowplaying from '@/views/Film/maizuo.vue'
import Comingsoon from '@/views/Film/Comingsoon.vue'
import Detail from '@/views/Detail'
import Login from '@/views/Login'

Vue.use(VueRouter)

const routes = [
  {
    path: '/film',
    component: Film,
    children: [
      {
        // path:"/film/nowplaying",
        path: 'nowplaying',
        name: 'nowplaying',
        component: Nowplaying
      },
      {
        path: 'comingsoon',
        name: 'comingsoon',
        component: Comingsoon
      },
      {
        path: '/film',
        redirect: '/film/nowplaying'
      }
    ]
  },
  {
    path: '/cinema',
    component: () => import('@/views/Cinema')
  },
  {
    path: '/center',
    component: () => import('@/views/Center.vue')
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/city',
    component: () => import('@/views/City.vue')
  },
  {
    path: '/detail/:myid', // 动态路由
    component: Detail,
    props: true,
    name: 'MyDetail' // 命名路由
  },
  {
    path: '*',
    redirect: '/film'
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,//应用的基路径。
  routes
})

export default router
