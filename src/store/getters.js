export default {
  cartLength(state) {
    return state.cartList.length
  },
  cartList(state) {
    return state.cartList
  },

  getUserInfo(state) {
    return state.userInfo
  }
}