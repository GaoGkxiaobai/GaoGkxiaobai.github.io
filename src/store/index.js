import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { GET_HEADNAV_DATA, GET_INDEX_DATA } from './type'
// import { Indicator } from 'mint-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局状态
    headData: [],
    indexData: []
  },
  getters: {

  },
  mutations: {
    // 存放更改全局状态的方法
    // 接收两个参数：1、state状态默认的 2、调用时传的参数，可以没有
    // vue中可以直接用$store.commit("方法名")来调用内部的方法
    [GET_HEADNAV_DATA] (state, data) {
      state.headData = data
    },
    [GET_INDEX_DATA] (state, data) {
      state.indexData = data
    }
  },
  actions: {
    // 存放异步操作的方法
    // 默认接收一个与 store 实例具有相同方法和属性的 context 对象
    // vue中可以直接用$store.dispatch("方法名")来调用内部的方法
    // 内部的方法操作完最好用context.commit('方法名')调用mutations内的方法改变状态，因为只用mutations受监控
    getheadnav (store) {
      Axios({
        url: 'https://m.ximalaya.com/m-revision/page/index/queryIndexTabModule',
        method: 'get'
      }).then(res => {
        store.commit(GET_HEADNAV_DATA, res.data.data)
      })
    },
    getindexdata (store) {
      Axios({
        url: `https://m.ximalaya.com/m-revision/page/index/queryIndexCategoryTabContent?moduleKey=xiangsheng`
      }).then(res => {
        store.commit(GET_INDEX_DATA, res.data.data.moduleContent.moduleRankDatas)
      })
    }
  },
  modules: {
    // 分割模块

  }
})
