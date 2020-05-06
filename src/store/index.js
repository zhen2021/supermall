import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'


// 1、安装插件
Vue.use(Vuex)

// 2、创建store对象
const state = {
  cartList:[],
  userInfo:{},
}


const store = new Vuex.Store({
  // 管理状态数据
  state,

  // mutations 的唯一目的就是修改state中的状态，里面每个方法完成的事件尽可能单一，有判断等操作，就应该放actions里面
  mutations,


  // 进行多种操作，需要修改state的要提交到mutations
  actions,

  getters,

})

// 3、挂载Vue实例上
export default store