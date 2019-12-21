import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import { Indicator } from 'mint-ui'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 全局状态
    isShow: true,
    comingsoon: [],
    maizuo: [],
    maizuoye: 1,
    maizuototal: 0
  },
  getters: {
    getTopThree (state) {
      return state.datalist.splice(0, 3)
    }
  },
  mutations: {
    // 存放更改全局状态的方法
    // 接收两个参数：1、state状态默认的 2、调用时传的参数，可以没有
    // vue中可以直接用$store.commit("方法名")来调用内部的方法

    showTabber (state) {
      state.isShow = true
    },
    hideTabber (state) {
      state.isShow = false
    },
    setcomingsoon (state, a) {
      state.comingsoon = a
    },
    setmaizuo (state, a) {
      state.maizuo = a
    },
    setmaizuototal (state, a) {
      state.maizuototal = a
    },
    sermaizuoyejia (state) {
      state.maizuoye++
    }
  },
  actions: {
    // 存放异步操作的方法
    // 默认接收一个与 store 实例具有相同方法和属性的 context 对象
    // vue中可以直接用$store.dispatch("方法名")来调用内部的方法
    // 内部的方法操作完最好用context.commit('方法名')调用mutations内的方法改变状态，因为只用mutations受监控
    getCommingsoon (context) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      Axios({
        url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=2&k=4753752',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15764847395450313498837","bc":"110100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        context.commit('setcomingsoon', res.data.data.films)

        Indicator.close()
      })
    },
    getmaizuo (context) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      Axios({
        url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${context.state.maizuoye}&pageSize=10&type=1&k=2430027`,
        method: 'get',
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15764847395450313498837"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data.data)
        context.commit('setmaizuo', res.data.data.films)
        context.commit('setmaizuototal', res.data.data.total)
        // this.list = res.data.data.films
        Indicator.close()
      })
    },
    getmaizuolan (context) {
      // Indicator.open({
      //   text: '加载中...',
      //   spinnerType: 'fading-circle'
      // })
      Axios({
        url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${context.state.maizuoye}&pageSize=10&type=1&k=6202538`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"15647165941739461757290","bc":"110100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        console.log(context.state.maizuo)
        // this.datalist = [...this.datalist,...res.data.data.films]
        context.state.maizuo = [...context.state.maizuo, ...res.data.data.films]

        // Indicator.close()
      })
    }
  },
  modules: {
    // 分割模块

  }
})
