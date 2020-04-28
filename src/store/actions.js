export default {
  addCart(context,payload) {
    return new Promise((resolve,reject) => {
      // payload 新添加的商品
      //  判断之前数组是否已有该商品
      let oldProduct = context.state.cartList.find(item => { return item.id === payload.id})

      // 判断oldProduct,已经存在则数量加一,交给mutations操作，以便对数据有更好的跟踪
      if (oldProduct) {  
        // oldProduct.count += 1
        context.commit('addCounter', oldProduct)

        resolve('当前商品数量 +1')
      }else {
        payload.count = 1
        // context.state.cartList.push(payload)
        context.commit('addToCart',payload)

        resolve('加入购物车成功')
      }
    })
    
  }
}