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
      img: Random.image('500x500', '#49ace0', type),
      link: Random.url('https'),
      title: Random.cword(30),
      cfav:Random.natural(0, 300),
      price:Random.natural(50, 300),

    }
    // 设置商品详细数据
    listObject.result = {
      itemInfo:{
        discountDesc: '活动价',
        newPrice: listObject.price,
        lowNowPrice: listObject.price,
        oldPrice: Random.natural(listObject.price, 500),
        title: listObject.title,
        topImages:[
          Random.image('375x375', '#49ace0', type+"id:"+listObject.id),
          Random.image('375x375', '#49ace0', type+"id:"+listObject.id),
          Random.image('375x375', '#49ace0', type+"id:"+listObject.id)
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
      },

      // 商品规格参数
      itemParams: {
        info: {
          set:[
            {key:"图案",value:"宫廷复古图/民族复古图，字母/文字/数字"},
            {key:"厂名",value:"艾玫莉服饰有限公司"},
            {key:"颜色",value:"黑白拼接"},
            {key:"袖型",value:"常规袖"},
            {key:"上衣厚度",value:"适中"},
            {key:"尺码",value:"XL,L,M,XXL"},
            {key:"衣长",value:"常规款（51-65cm）"},
            {key:"版型",value:"宽松"},
            {key:"季节",value:"春秋"},
            {key:"厂址",value:"广东省揭阳市普宁市池尾镇政山老区"},
            {key:"材质",value:"棉"},
            {key:"领型",value:"圆领"},
            {key:"元素",value:"面料拼接，平绣"},
            {key:"袖长",value:"长袖"},
            {key:"风格",value:"原宿"},
            {key:"潮流",value:"韩系"},
          ]
        },
        rule: {
          tables:[
            [
              ["尺码","M","L","XL","XXL"],
              ["衣长","61.5",'63','64.5','66'],
              ["胸围","98",'104','110','116'],
              ["袖长","63",'66','68.5','70.5']
            ]
          ]
        },
      },

      // 评论信息数据  list是具体每一条一个对象
      rate: {
        crate:Random.natural(0, 500),
        list:[
          {
            canExplain:false,
            content: Random.cword(20,100),
            style: "颜色：白色 上衣 尺码：L",
            created:Random.natural(1000000000, 1999999999),
            user: {
              avatar: Random.image('50x50', '#49ace0', "Photo"),
              uname: Random.cword(2,8),
            },
            images:[Random.image('100x100', '#49ace0', "Show"),Random.image('100x100', '#49ace0', "Show")]
          },
        ]
      }


    }

    list.push(listObject)
  } 
  return list
};


const dataObj = {
  pop:listMethods(120,'流行商品'),
  new:listMethods(150,'新款商品'),
  sell:listMethods(200,'精品商品'),
}



  //  自定义模拟商品数据 
  dataObj.pop[0].img = 'http://img12.360buyimg.com/mobilecms/s360x360_jfs/t1/93924/33/17079/197469/5e82f3d5Ed0754363/c343347283ec34d8.jpg!q70.dpg.webp'
  dataObj.pop[0].result.itemInfo.topImages[0] = 'http://m.360buyimg.com/mobilecms/s750x750_jfs/t1/93924/33/17079/197469/5e82f3d5Ed0754363/c343347283ec34d8.jpg!q80.dpg.webp'
  dataObj.pop[0].result.itemInfo.topImages[1] = 'http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/96079/10/17036/172997/5e82f3d5E9cba0de5/1afe9da2512fb955.jpg!q70.dpg.webp'
  dataObj.pop[0].result.itemInfo.topImages[2] = 'http://m.360buyimg.com/mobilecms/s843x843_jfs/t1/98165/7/17008/189747/5e82f3d6E2c03d8a6/b7206ce2febf5eb1.jpg!q70.dpg.webp'
  dataObj.pop[0].result.itemInfo.title = '小赖猴2020春季新款韩版宽松牛仔外套女ins超火的时尚百搭长袖上衣开衫 蓝色 均码'
  dataObj.pop[0].title = '小赖猴2020春季新款韩版宽松牛仔外套女ins超火的时尚百搭长袖上衣开衫 蓝色 均码'
  dataObj.pop[0].result.shopInfo.name = '小赖猴女装旗舰店'
  dataObj.pop[0].result.detailInfo.detailImage[0].list[0] = 'http://img30.360buyimg.com/popWaterMark/jfs/t1/102801/39/16982/254492/5e82f41dE19ba1ce4/4419d0e29e0a80eb.jpg!q70.dpg.webp'
  dataObj.pop[0].result.detailInfo.detailImage[0].list[1] = 'http://img30.360buyimg.com/popWaterMark/jfs/t1/98833/2/16963/49323/5e82f41dEc3af83d0/b26fc9753f0e5373.jpg!q70.dpg.webp'
  dataObj.pop[0].result.detailInfo.detailImage[0].list[2] = 'http://img30.360buyimg.com/popWaterMark/jfs/t1/103790/8/17080/77666/5e82f41dE88a7d545/5dc734f40cd47026.jpg!q70.dpg.webp'
  dataObj.pop[0].result.detailInfo.detailImage[0].list[3] = 'http://img30.360buyimg.com/popWaterMark/jfs/t1/96450/40/16891/370289/5e82f41eE07a9cecc/1601a3b0d7aa7ace.jpg!q70.dpg.webp'
  dataObj.pop[0].result.detailInfo.detailImage[0].list[4] = 'http://img30.360buyimg.com/popWaterMark/jfs/t1/108070/31/10914/222383/5e82f41fE876c3827/2823aaf7eeace53c.jpg!q70.dpg.webp'
  dataObj.pop[0].result.detailInfo.detailImage[0].list[5] = 'http://img30.360buyimg.com/popWaterMark/jfs/t1/107088/33/17043/220693/5e82f41eEcea7f1ed/726be73e8ce41a5b.jpg!q70.dpg.webp'
  dataObj.pop[0].result.detailInfo.detailImage[0].list[6] = 'http://img30.360buyimg.com/popWaterMark/jfs/t1/90072/15/17104/275091/5e82f41fE57435fd7/40bcece3110d827e.jpg!q70.dpg.webp'
  
  dataObj.pop[0].result.rate.list[0].images[0] = 'http://img30.360buyimg.com/shaidan/s128x96_jfs/t1/88151/20/18182/217159/5e92ebbdE7360f722/a52b4b7c568b111b.jpg!cc_100x100!q70.dpg.webp'
  dataObj.pop[0].result.rate.list[0].images[1] = 'http://img30.360buyimg.com/shaidan/s128x96_jfs/t1/109026/3/12196/242104/5e92ebc0Ef87782ae/2331a08cb6987f4c.jpg!cc_100x100!q70.dpg.webp'
  dataObj.pop[0].result.rate.list[0].content = '这件衣服是今年新款，上身效果很好，面料薄厚适中，非常适合春天穿，穿搭牛仔裤工装裤都可以，比较满意这次的购物，只是物流时间有点长让我等了一周，希望以后物流能够再快些。'
  dataObj.pop[0].result.rate.list[0].user.uname = 'yangyang_aijj'
  dataObj.pop[0].result.rate.list[0].user.avatar = 'http://storage.360buyimg.com/i.imageUpload/6a645f3630356337326665393965363431353131313336373934333835_sma.jpg'








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

// -----------------------商品详情页需要的商品推荐数据------------------------------
Mock.mock('http://123.207.32.32:8000/recommend', 'get', () => {
  return{
    data:{
      list: dataObj['sell'].slice(0, 20)
    }
  } 
});









// -----------------------首页的banner等数据模拟------------------------------
const listM = function(num,type,size) {
  let list = []
  for (let i = 0; i < num; i++) {
    let listObject = {
      image: Random.image(size, '#02adea', type),
      link: Random.url('https'),
      title: Random.cword(2,4),
    }
    list.push(listObject)
  } 
    return list
};

const bannerData = function() {
  // 生成多条图片数据的方法
    return {
      data: {
        banner: {
          // list: listM(4,'Banner','750x390'),
          list: [{image: 'http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/115491/9/3412/135947/5ea7f15eE4e65a4c2/c71a891289bf42a1.jpg!cr_1125x445_0_171!q70.jpg.dpg'},
          {image: 'http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/89334/6/19290/132701/5e9cfa6aE43b43796/5c2e5a153e7ce375.jpg!cr_1125x445_0_171!q70.jpg.dpg'},
          {image: 'http://imgcps.jd.com/ling4/100012686074/5omL5py66LSt5a6e5oOg/5aSH6LSn6LaF5YC8/p-5e7d9726dc9f2b4301a42c88/40f05556/cr_1125x445_0_171/s1125x690/q70.jpg'},
          {image: 'http://m.360buyimg.com/mobilecms/s700x280_jfs/t1/110791/2/6340/151563/5ea93aebEa7bfd43e/c8b2484b697c985c.jpg!cr_1125x445_0_171!q70.jpg.dpg'},
          ],
        },
        recommend: {
          // list: listM(4,'Class','100x100'),
          list: [
          {image: 'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/84753/1/16651/5549/5e7d5f9eE492c3864/4b9963fe16fae211.png.webp', title:'超市'},
          {image: 'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/104104/6/16755/5068/5e7d6202E212fcc22/3fda8f7d8b63b55f.png.webp', title:'生鲜'},
          {image: 'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/105719/14/16594/7294/5e7d605eE007a21e7/63392310fbb001a4.png.webp', title:'服饰'},
          {image: 'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/99304/34/16507/5170/5e7ccacaE08d0d35d/ea8a30610a682386.png.webp', title:'美妆'},
          {image: 'http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/96542/9/16707/3569/5e7d62bcE5c4ee6a7/3bf6ac36ac9f17d9.png.webp', title:'服务'},
          ],
        }
      }
    }
}

// Mock.mock( url, post/get , 返回的数据)；
Mock.mock('http://123.207.32.32:8000/home/multidata', 'get', bannerData);







//分类页面的数据请求 
const CategoryData = function() {
  let cList = ['热门推荐','手机数码','电脑办公','家用电器','计生情趣','个护清洁','美妆美肤','汽车用品','图书音像','医药保健','珠宝首饰','内衣配饰','生鲜','粮米油面','水果蔬菜','男装','男鞋','女装','女鞋','特产']
  
  // const  categoryList = [
  //     {
  //       classname:'热门推荐',
  //       classlist: [],
  //       },
  //   ]
  var CategoryList = []
  for(let i= 0;i < cList.length;i++){
    let obj = {}
    obj.classname =  cList[i]
    obj.classlist = listM(Random.natural(5, 20),'ClassItem','100x100')
    CategoryList.push(obj)
  }


  
  // 模拟真实数据
  CategoryList[0].classlist[0].title = '手机'
  CategoryList[0].classlist[0].image = 'http://img14.360buyimg.com/focus/s140x140_jfs/t27136/183/1628977274/31007/a6f7ed55/5be6ebd8Nb07ef492.png'
  CategoryList[0].classlist[1].title = '冰箱'
  CategoryList[0].classlist[1].image = 'http://img20.360buyimg.com/focus/s140x140_jfs/t21115/83/225125274/13856/5473fb3f/5b0567c1N59d53b27.png'
  CategoryList[0].classlist[2].title = '电视'
  CategoryList[0].classlist[2].image = 'http://img10.360buyimg.com/focus/s140x140_jfs/t1/99259/34/11845/15840/5e3e8258Ea2ebb9dd/50154478628700f6.jpg'
  CategoryList[0].classlist[3].title = '微波炉'
  CategoryList[0].classlist[3].image = 'http://img11.360buyimg.com/focus/s140x140_jfs/t13267/86/981023661/1871/6fae5f11/5a17f203N50016f64.jpg'
  CategoryList[0].classlist[4].title = '饮料'
  CategoryList[0].classlist[4].image = 'http://img20.360buyimg.com/focus/s140x140_jfs/t21136/27/148114098/21764/dfe7107f/5afeb956Na0fe3b4c.jpg'
  CategoryList[0].classlist[5].title = '衣物清洁'
  CategoryList[0].classlist[5].image = 'http://img10.360buyimg.com/focus/s140x140_jfs/t12136/32/190594635/3030/39a660be/5a057ef3N4b20576c.jpg'



  return CategoryList
}
Mock.mock('http://123.207.32.32:8000/category', 'get', CategoryData);








const userData = [
  {
    name: '123456789',
    passWord: '123456789',
    token: '123133123',

  },
]

// 登录请求
Mock.mock('http://123.207.32.32:8000/login', 'post', (params) => {
  var info = JSON.parse(params.body)
  // console.log(info)
  let username = info.username
  let passWord = info.passWord
  let len = userData.length
  let userNameArr = [];
  let passWordArr = [];

  for (var i = 0; i < len; i++) {
    userNameArr.push(userData[i].name);
    passWordArr.push(userData[i].passWord);
  }

  // 查找判断账号
  if (userNameArr.indexOf(username) === -1) {
    return {
      error_code:1,  
      text: '账号不存在'
    }  
  } else {
    var index = userNameArr.indexOf(username);
    if (passWordArr[index] === passWord){
      return {
        error_code:1,   
        text: '登录成功',
        userInfo: userData[index]
      }
    }
  }


  return {
    error_code:0,   //密码错误
    text: '密码错误'
  }

});






// token验证请求  免登陆状态
Mock.mock('http://123.207.32.32:8000/login/token', 'post', (params) => {
  var info = JSON.parse(params.body)
  // console.log(info)
  let token = info.token
  let len = userData.length
  let tokenArr = []

  for (let i=0 ;i<len; i++){
    tokenArr.push(userData[i].token);
  }
  let index = tokenArr.indexOf(token)
  if (index === -1) {
    return {
      error_code: -1,  
      text: '登录失效'
    }  
  }//更新token情况忽略  error_code:0, token：新值

  return {
    error_code: 1,
    text:'状态有效',
    userInfo: userData[index]
  }
});




// 注册请求
Mock.mock('http://123.207.32.32:8000/register', 'post', (params) => {
  var info = JSON.parse(params.body)
  // console.log(info)
  let username = info.username
  let len = userData.length
  let userNameArr = [];

  for (var i = 0; i < len; i++) {
    userNameArr.push(userData[i].name);
  }
  // 账号不存在 即可注册
  if(userNameArr.indexOf(username) === -1){
    let userRegister = {
      name: info.username,
      passWord: info.passWord,
      token:Random.string('number', 6, 10)
    }
    
    userData.push(userRegister)
    return {
      error_code: 1,
      text:'注册成功'
    }
  }

  return {
    error_code: 0,
    text:'账号已存在'
  }

});