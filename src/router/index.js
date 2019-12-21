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
        path: 'recommend', // 推荐页面
        name: 'recommend',
        component: Recommend
      },
      {
        path: 'audiobook', // 有声书
        name: 'audiobook',
        component: AudioBook
      },
      {
        path: 'crosstalk', // 相声
        name: 'crosstalk',
        component: CrossTalk
      },
      {
        path: 'music', // 音乐
        name: 'music',
        component: Music
      },
      {
        path: 'children', // 儿童
        name: 'children',
        component: Children
      },
      {
        path: 'humanity', // 人文
        name: 'humanity',
        component: Humanity
      },
      {
        path: 'emotion', // 情感
        name: 'emotion',
        component: Emotion
      },
      {
        path: 'history', // 历史
        name: 'history',
        component: History
      },
      {
        path: 'science', // 科技
        name: 'science',
        component: Science
      },
      {
        path: 'more', // 更多
        name: 'more',
        component: More
      },
      {
        path: '/index',
        redirect: '/index/recommend'
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
