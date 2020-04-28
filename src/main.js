import Vue from 'vue'
import App from './App.vue'
import router from './router'  //挂载Vuerouter
import store from './store'  //挂载Vuex

import toast from 'components/common/toast'

require('./mock/index')

Vue.config.productionTip = false

// 将vue实例作为事件总线
Vue.prototype.$bus = new Vue()

// 安装自定义插件tosat
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
