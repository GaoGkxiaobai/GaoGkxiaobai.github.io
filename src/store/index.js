import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { GET_HEADNAV_DATA, GET_INDEX_DATA, GET_HEIGHT_DATA, GET_MOVE_DATA, GET_SEARCH_DATA, GET_ALLSEARCH_DATA, GET_SEARCHLIST_DATA, GET_TUIJAIN_DATA, GET_RESULT_DATA } from './type'
import { Indicator } from 'mint-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局状态
    headData: [],
    indexData: [],
    topH: 0,
    moveData: [],
    searchData: [],
    allsearchData: [],
    searchlistData: [],
    tuijianData: [],
    resultData: null
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
    },
    [GET_TUIJAIN_DATA] (state, data) {
      state.tuijianData = data
    },
    [GET_HEIGHT_DATA] (state, h) {
      state.topH = h
    },
    [GET_MOVE_DATA] (state, data) {
      state.moveData = [...state.moveData, ...data]
    },
    [GET_SEARCH_DATA] (state, data) {
      state.searchData = data
    },
    [GET_ALLSEARCH_DATA] (state, data) {
      state.allsearchData = data
    },
    [GET_SEARCHLIST_DATA] (state, data) {
      state.searchlistData = data
    },
    [GET_RESULT_DATA] (state, data) {
      state.resultData = data
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
    getindexdata (store, name) {
      // if (name == 'tuijian') {
      //   Axios({
      //     url: `https://m.ximalaya.com/m-revision/page/index/queryIndexTabContent?moduleKey=tuijian`

      //   }).then(res => {
      //     Indicator.close()
      //     store.commit(GET_INDEX_DATA, res.data.data.moduleContent)
      //   })
      // } else {
      Axios({
        url: `https://m.ximalaya.com/m-revision/page/index/queryIndexCategoryTabContent?moduleKey=${name}`
      }).then(res => {
        Indicator.close()
        store.commit(GET_INDEX_DATA, res.data.data.moduleContent)
      })
      // }
    },
    gettopheight (store, h) {
      store.commit(GET_HEIGHT_DATA, h)
    },
    getMove (store, name) {
      Axios({
        url: `https://m.ximalaya.com/m-revision/page/index/queryCategoryFeed?moduleKey=${name}`
      }).then(res => {
        store.commit(GET_MOVE_DATA, res.data.data.materials)
      })
    },
    getsearchdata (store) {
      Axios({
        url: `https://m.ximalaya.com/hotWordBillboardCategory`
      }).then(res => {
        store.commit(GET_SEARCH_DATA, res.data.category)
      })
    },
    getallsearch (store, id) {
      Axios({
        url: `https://search.ximalaya.com/hotWordBillboard/list/2.0?categoryId=${id}&size=24`
      }).then(res => {
        store.commit(GET_ALLSEARCH_DATA, res.data.hotWordResultList)
      })
    },
    getsearch (store, data) {
      Axios({
        url: `revision/suggest?kw=${data}&paidFilter=false&scope=all`
      }).then(res => {
        store.commit(GET_SEARCHLIST_DATA, res.data.data.result)
      })
    },
    getresultall (store, path) {
      Axios({
        url: `https://m.ximalaya.com/m-revision/page/search?kw=${path}&core=all&page=1&rows=5`
      }).then(res => {
        // console.log(res.data.data)
        store.commit(GET_RESULT_DATA, res.data.data)
      })
    }
  },
  modules: {
    // 分割模块

  }
})
