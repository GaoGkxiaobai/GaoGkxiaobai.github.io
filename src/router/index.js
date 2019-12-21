import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Recommend from '@/views/index/Recommend'
import AudioBook from '@/views/index/AudioBook'
import CrossTalk from '@/views/index/CrossTalk'
import Music from '@/views/index/Music'
import Children from '@/views/index/Children'
import Humanity from '@/views/index/Humanity'
import Emotion from '@/views/index/Emotion'
import History from '@/views/index/History'
import Science from '@/views/index/Science'
import More from '@/views/index/More'
Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: 'tuijian', // 推荐页面
        name: 'tuijian',
        component: Recommend
      },
      {
        path: 'youshengshu', // 有声书
        name: 'youshengshu',
        component: AudioBook
      },
      {
        path: 'xiangsheng', // 相声
        name: 'xiangsheng',
        component: CrossTalk
      },
      {
        path: 'yinyue', // 音乐
        name: 'yinyue',
        component: Music
      },
      {
        path: 'ertong', // 儿童
        name: 'ertong',
        component: Children
      },
      {
        path: 'renwen', // 人文
        name: 'renwen',
        component: Humanity
      },
      {
        path: 'qinggan', // 情感
        name: 'qinggan',
        component: Emotion
      },
      {
        path: 'lishi', // 历史
        name: 'lishi',
        component: History
      },
      {
        path: 'keji', // 科技
        name: 'keji',
        component: Science
      },
      {
        path: 'more', // 更多
        name: 'more',
        component: More
      },
      {
        path: '/index',
        redirect: '/index/tuijian'
      }
    ]
  },
  {
    path: '/top', // 排行页面
    component: () => import('@/views/Top.vue'),
    children: [
      {
        path: 'free',
        component: () => import('@/views/top/Free.vue'), // 免费榜
        children: [
          {
            path: 'all',
            component: () => import('@/views/top/free/All.vue') // 热门
          },
          {
            path: 'youshengshu',
            component: () => import('@/views/top/free/Youshengshu.vue')
          },
          {
            path: 'xiangsheng',
            component: () => import('@/views/top/free/Xiangsheng.vue')
          },
          {
            path: 'ertong',
            component: () => import('@/views/top/free/Ertong.vue')
          },
          {
            path: '/free',
            redirect: '/free/all'
          }
        ]
      },
      {
        path: 'rise', // 飙升榜
        component: () => import('@/views/top/Rise.vue'),
        children: [
          {
            path: 'all',
            component: () => import('@/views/top/rise/All.vue') // 总榜
          }
        ]
      },
      {
        path: '/top',
        redirect: '/top/free'
      }
    ]
  },
  {
    path: '/detail/:myid',
    props: true,
    component: () => import('@/views/Detail.vue') // 详情
  },
  {
    path: '/categoryall',
    props: true,
    component: () => import('@/views/Categoryall.vue') // 全部分类
  },
  {
    path: '*',
    redirect: '/index'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
