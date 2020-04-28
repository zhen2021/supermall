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
  }
}