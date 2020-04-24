import {request} from "./request"

// 轮播图数据
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })
}


// 原接口配置   如果get请求方式params此参数会拼接到url上，最后形式为:/home/data?type=''&page=1
export function getHomeGoods(type,page) {
  return request({
    method: 'post',
    url: '/home/data',
    // post方式不能设为params
    data: {
      type,
      page
    }
  })
}