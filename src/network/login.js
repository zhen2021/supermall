import {request} from "./request"
// 请求用户信息是否存在
export function getLogin(username,passWord) {
  return request({
    method: 'post',
    url:'/login',
    // post方式不能设为params
    data: {
      username,passWord
    }
  })
}


// 检查token是否过期无效，未过期更新token  main.js路由跳转前测，免登陆
export function checkToken(token) {
  return request({
    method: 'post',
    url:'/login/token',
    data: {
      token
    }
  })
}




export function getRegister(username,passWord) {
  return request({
    method: 'post',
    url:'/register',
    data: {
      username,passWord
    }
  })
}
