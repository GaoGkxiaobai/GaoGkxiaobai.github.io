import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MintUI from 'mint-ui' // 引入mint-ul框架
import 'mint-ui/lib/style.css' // 引入 mint-ul 框架的css
// vue js 唯一入口
Vue.use(MintUI)
Vue.config.productionTip = false

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
