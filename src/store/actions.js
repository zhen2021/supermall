import {checkToken} from 'network/login'

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
    
  },


  //请求服务器检查token是否有效，无效则删除用户信息
makeCheckToken(context,payload)  {
  return new Promise((resolve,reject) => {
    
    // 网络请求，校验token
    checkToken(payload).then(res => {
    console.log(res)

    if(res.error_code === -1){ //无效token
       //删除原登录用户信息
       context.commit('deleteUserInfo')

    }else if(res.error_code === 0){  
      //更新token
      let ses = window.sessionStorage
      ses.setItem("data",res.token)
      console.log(ses,'ses')

      // 存储用户信息
      context.commit('storeUserInfo', res.userInfo)
      
    }else{
      
      // 存储用户信息
      context.commit('storeUserInfo', res.userInfo)
    }
    resolve(res.error_code)
  })
    
  })

  
}


}