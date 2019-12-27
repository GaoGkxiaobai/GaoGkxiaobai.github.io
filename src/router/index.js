import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Recommend from '@/views/index/Recommend'
import AudioBook from '@/views/index/AudioBook'
import topRight from '@/views/top/topRight'
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
        path: '/index/:category', // 其余全部
        name: 'youshengshu',
        component: AudioBook
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
        path: '/top/:top',
        component: () => import('@/views/top/Free.vue'), // 免费榜
        props: true,
        children: [
          {
            path: '/top/:top/:left',
            component: topRight,
            props: true
          },
          {
            path: '/top/:top',
            redirect: '/top/:top/all'
          }
        ]
      },
      {
        path: '/top',
        redirect: '/top/free/all'
      }
    ]
  },
  {
    path: '/ting', // 听单
    component: () => import('@/views/listeningList'),
    name: 'tingdan',
    children: [
      {
        path: '/ting/:tou',
        component: () => import('@/views/listeninglist/listeningListxia'), // 免费榜
        props: true
      },
      {
        path: '/ting',
        redirect: '/ting/remen'
      }
    ]
  },
  {
    path: '/search', // 搜索
    component: () => import('@/views/Search'),
    children: [
      {
        path: '/search/:search',
        component: () => import('@/views/search/SearchAll'),
        props: true
      },
      {
        path: '/search',
        redirect: '/search/-1'
      }
    ]
  },
  {
    path: '/result', // 搜索结果
    component: () => import('@/views/Result'),
    children: [
      {
        path: '/result/all/:all',
        component: () => import('@/views/result/ResultAll')
      },
      {
        path: '/result/album/:album', // 专辑
        component: () => import('@/views/result/Album')
      },
      {
        path: '/result/sound/:sound', // 声音
        component: () => import('@/views/result/Sound')
      },
      {
        path: '/result',
        redirect: '/result/all'
      }
    ]
  },
  {
    path: '/detail/:myid',
    name: 'detail',
    props: true,
    component: () => import('@/views/Detail.vue') // 详情
  },
  {
    path: '/category',
    props: true,
    component: () => import('@/views/Categoryall.vue') // 全部分类
  },
  {
    path: '/jihe/:lei/:juti/', // 分类排行点击进入
    props: true,
    component: () => import('@/views/fenleijihe.vue'),
    children: [
      {
        path: '/jihe/:lei',
        redirect: '/jihe/:lei/quanbu'
      }
    ]
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
