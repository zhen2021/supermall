import {request} from "./request"

// 分类数据
export function getCategorydata() {
  return request({
    url:'/category'
  })
}
