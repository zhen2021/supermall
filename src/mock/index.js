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


// -----------------------------------------------------
//mock.js 文件
import Mock from 'mockjs' // 引入mockjs
const Random = Mock.Random // Mock.Random 是一个工具类，用于生成各种随机数据

// 生成多条图片数据的方法
const listMethods = function(num,type) {
  let list = []
  for (let i = 0; i < num; i++) {
    let listObject = {
      img: Random.image('600x800', '#02adea', type),
      link: Random.url('https'),
      title: Random.cword(30),
      cfav:Random.natural(0, 300),
      price:Random.natural(50, 300),
      id:Random.string( 'number', 7,7 ),
    }
    list.push(listObject)
  } 
    return list
};


const dataObj = {
  pop:listMethods(120,'pop'),
  new:listMethods(150,'new'),
  sell:listMethods(200,'sell'),
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

