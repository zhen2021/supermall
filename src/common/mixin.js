import {debounce} from "./utils"
import BackTop from 'components/content/backTop/BackTop'


// 混入监听itemImageLoad图片加载完成刷新
export const itemListenerMixin = {
    data () {
      itemImgListener:null
    },

   mounted () {
    // 把函数传给防抖方法，接收的是方法返回的防抖函数，并且有闭包不会被回收
    const refresh = debounce(this.$refs.scroll.refresh,200)
    // 准备好通过事件总线监听事件，监听itemImageLoad图片加载完成
    // 每次图片加载完成就行一次scroll的刷新，重新计算高度

    //对监听事件所要执行的函数进行保存
    this.itemImgListener = () => {refresh()}
    this.$bus.$on('itemImageLoad',this.itemImgListener)
  },
}


// 回到顶部的方法混入
export const backTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      // 拿到scroll组件，再拿到scroll属性对应对象，再使用其方法第三个参数是毫秒
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0,0)
    },
    listenShowBackTop(position){
      this.isShowBackTop = (-position.y) > 1000
    }
  }

}







import {getHomeGoods} from 'network/home'

// 商品列表混入给分类页面使用，首页维持原状
export const tabControlGoodsListMixin = {
  data () {
    return {
       //商品请求的数据模型
       goods: {
        'pop': {page:0,list: []},
        'new': {page:0,list: []},
        'sell': {page:0,list: []},
      },
      currentType:'pop',
    }
  },

  computed: {
    showGoods() {
      // 根据单击动态改变展示的商品类别，传给子组件
      return this.goods[this.currentType].list
    }
  },

  //组件一旦创建好了发送网络请求
  created () {
    // 分别请求三类商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    // tabControl单击事件 
    tabClick(index) {
      switch(index) {
        case 0: this.currentType = 'pop'
        break
        case 1: this.currentType = 'new'
        break
        case 2: this.currentType = 'sell'
        break
      }
      // this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },

    //上拉加载更多 
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

     // 请求商品数据的方法
     getHomeGoods(type) {
      //每次请求页码+1
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
      //拿出请求到的list数组元素，依次添加入新数组，push函数可以传可变参数
      this.goods[type].list.push(...res.data.list)
      // 数据页码+1
      this.goods[type].page += 1

      // 调用结束一次完成了下拉加载更多的方法
      this.$refs.scroll.finishPullUp()

      console.log(res)
    })
    },


  },
}


