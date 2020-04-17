const Mock = require('mockjs');
// test测试使用mock
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const NewsData = function() {
  // 生成多条图片数据的方法
  const listMethods = function(num) {
      let list = []
      for (let i = 0; i < num; i++) {
        let listObject = {
          image: Random.image('750x390', '#02adea', 'photo'),
          link: Random.url('https'),
          title: Random.cword(4),
        }
        list.push(listObject)
      } 
        return list
    };

    return {
      data: {
        banner: {
          list: listMethods(4),
        },
    
        recommend: {
          list: listMethods(4),
        }
      }
    }

}
console.log(NewsData()) 

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('http://123.207.32.32:8000/home/multidata', 'get', NewsData);
console.log('-------------------') 

