import {request} from "./request"

export function getDetail(id) {
  return request({
    method: 'post',
    url:'/detail',
    // post方式不能设为params
    data: {
      id
    }
  })
}

// 封装做DetailBaseInfo的数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.nowPrice = itemInfo.newPrice
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 封装店铺信息的数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.fans
    this.sells = shopInfo.sells
    this.score = shopInfo.score
    this.goodsCount = shopInfo.goods
  }
}



// 封装商品规格信息的数据
export class GoodsParam {
  constructor(info, rule) {
    // images可能没有值，某些商品有值，某些没有
    this.image = info.image ? this.image[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}