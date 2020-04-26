import Vue from 'vue'
import App from './App.vue'
import router from './router'  //挂载Vuerouter
import store from './store'  //挂载Vuex

require('./mock/index')

Vue.config.productionTip = false

// 将vue实例作为事件总线
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
