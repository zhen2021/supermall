export default {
  addCounter(state,payload){
    payload.count++
  },
  addToCart(state,payload) {
    // 默认选中
    payload.checked = true  
    state.cartList.push(payload)
  },

  eachChecked(state) {
    state.cartList.forEach(item => item.checked = true)
  },
  eachDisChecked(state) {
    state.cartList.forEach(item => item.checked = false)
  },

  // 存储用户信息
  storeUserInfo(state,payload) {
    state.userInfo = payload
  },
  //删除用户信息
  deleteUserInfo(state) {
    state.userInfo = {}
  },

}