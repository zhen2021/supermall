import Vue from 'vue'
import App from './App.vue'
import router from './router'  //挂载Vuerouter
import store from './store'  //挂载Vuex
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'  //全局引入toast提示弹窗



require('./mock/index')

Vue.config.productionTip = false

// 将vue实例作为事件总线
Vue.prototype.$bus = new Vue()

// 安装自定义插件tosat
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)
// 使用vue-lazyload
Vue.use(VueLazyLoad,{
  // 参数可在网上搜索，有error、占位图之类
  loading:require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')



// 路由守卫，验证是否登录
router.beforeEach((to, from, next) => {
  // 是否需要登录
  if (to.meta.needLogin){
    // 是否存有token
    if(window.sessionStorage.data){
      let token = window.sessionStorage.data

      // 请求token是否过期失效，更新token 通过vuex执行
      store.dispatch('makeCheckToken', token).then(res => {
        if(res > 0){
          next()  //没有失效  免登陆
        }else{
          next({
            path: '/login'
          })
        }
      })
      
    }else{
      next({
        path: '/login'
      })
    }
  }

  next()
})
