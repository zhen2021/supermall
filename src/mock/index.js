/*const Mock = require('mockjs');
// test测试使用mock
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
// const bannerData = function() {
//   // 生成多条图片数据的方法
//   const listMethods = function(num) {
//       let list = []
//       for (let i = 0; i < num; i++) {
//         let listObject = {
//           image: Random.image('750x390', '#02adea', 'photo'),
//           link: Random.url('https'),
//           title: Random.cword(4),
//         }
//         list.push(listObject)
//       } 
//         return list
//     };

//     return {
//       data: {
//         banner: {
//           list: listMethods(4),
//         },
    
//         recommend: {
//           list: listMethods(4),
//         }
//       }
//     }
// }

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock('http://123.207.32.32:8000/home/multidata', 'get', bannerData);
// console.log('---------mock.js已返回bannerData数据----------') 

*/


// -----------------------这里是生成商品数据------------------------------
//mock.js 文件
import Mock from 'mockjs' // 引入mockjs
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

// 生成多条图片数据的方法
const listMethods = function(num,type) {
  let list = []
  for (let i = 0; i < num; i++) {
    let listObject = {
      id:Random.string( 'number', 7,7 ),
      img: Random.image('600x800', '#49ace0', type),
      link: Random.url('https'),
      title: Random.cword(30),
      cfav:Random.natural(0, 300),
      price:Random.natural(50, 300),

    }
    // 设置商品详细数据
    listObject.result = {
      itemInfo:{
        discountDesc: '活动价',
        newPrice: '￥'+listObject.price,
        lowNowPrice: '￥'+listObject.price,
        oldPrice: '￥'+Random.natural(listObject.price, 500),
        title: listObject.title,
        topImages:[
          Random.image('375x300', '#49ace0', type+"id:"+listObject.id),
          Random.image('375x300', '#49ace0', type+"id:"+listObject.id),
          Random.image('375x300', '#49ace0', type+"id:"+listObject.id)
        ]
      },
      columns:['销量'+Random.natural(0, 9999), '收藏'+listObject.cfav,'默认快递'],
      // 店铺信息
      shopInfo: {
        services:[
          {icon:'',name:'全国包邮'},
          {icon:'',name:'7天无理由退货'},
          {icon:'',name:'72小时发货'},
          {icon:'',name:'退货补运费'},
        ],
        shopLogo: Random.image('100x100', '#49ace0', "LOGO"),
        name: Random.cword(0,7),
        fans:Random.natural(0, 100000),
        sells:Random.natural(50, 100000),
        goods:Random.natural(1, 500),
        score:[
          {isBetter:Random.boolean(),name:'描述相符',score:Random.float( 3, 4, 0, 2 )},
          {isBetter:Random.boolean(),name:'价格合理',score:Random.float( 3, 4, 0, 2 )},
          {isBetter:Random.boolean(),name:'质量满意',score:Random.float( 3, 4, 0, 2 )}
        ],
      },
      //商品详情图片
      detailInfo: {
        desc: '新款上市~',
        detailImage:[{
          key:'穿着效果',
          list:[
            Random.image('600x900', '#49ace0', type+"商品展示id:"+listObject.id),
            Random.image('600x900', '#49ace0', type+"商品展示id:"+listObject.id),
            Random.image('600x750', '#49ace0', type+"商品展示id:"+listObject.id),
            Random.image('600x900', '#49ace0', type+"商品展示id:"+listObject.id),
            Random.image('600x750', '#49ace0', type+"商品展示id:"+listObject.id),
          ]
        }]
      }

    }

    list.push(listObject)
  } 
    return list
};


const dataObj = {
  pop:listMethods(120,'流行商品'),
  new:listMethods(150,'新款商品'),
  sell:listMethods(200,'精选商品'),
}


// list 分页接口()
Mock.mock(new RegExp('http://123.207.32.32:8000/home/data.*'), 'post', (params) => {
  // 拿出参数内容
  var info = JSON.parse(params.body)
  // console.log(info)
  // 对生成的数据取值，这里分页从0开始需要-1,因为请求的从1开始
  var [index, size, type] = [info.page-1, info.pageSize, info.type]
  // 单个种类的数据长度
  var [total] = [dataObj[type].length]

  size=30// 默认一页大小值size=30   20200419添加
  //页数
  var len = total / size
  var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
  // 分页出的单页数据
  var newData = dataObj[type].slice(index * size, (index + 1) * size)

  // console.log(newData)
  return {
    'code': '0',
    'message': 'success',
    'data': {
      'page': index,
      'pageSize': size,
      'list': newData,
      'total': total,
      'totalPages': totalPages
    }
  }
})





// -----------------------这里是生成商品详情数据------------------------------
Mock.mock(new RegExp('http://123.207.32.32:8000/detail.*'), 'post', (params) => {
  var info = JSON.parse(params.body)
  // console.log(info)
  var id = info.id
  var result = {}
  for (let index = 0; index < dataObj.new.length; index++) {
    if(id == dataObj.new[index].id){
      result = dataObj.new[index].result

      return {
        id:id,
        result:result
      }
    }
  }

  for (let index = 0; index < dataObj.pop.length; index++) {
    if(id == dataObj.pop[index].id){
      result = dataObj.pop[index].result
      
      return {
        id:id,
        result:result
      }
    }
  }


  for (let index = 0; index < dataObj.sell.length; index++) {
    if(id == dataObj.sell[index].id){
      result = dataObj.sell[index].result
      
      return {
        id:id,
        result:result
      }
    }
  }

  return {
    id:id,
    result:"没有找到该id商品"
  }
  
})
