<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">团购网</div></nav-bar>
    <!-- 此处是脱离scroll，实现吸顶替换 -->
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>

        <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
        <goods-list :goods="showGoods"/>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'

export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },

  data () {
    return {
      banners:[],
      recommends:[],
      //商品请求的数据模型
      goods: {
        'pop': {page:0,list: []},
        'new': {page:0,list: []},
        'sell': {page:0,list: []},
      },
      currentType:'pop',

      isShowBackTop: false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
    }
  },
  computed: {
    showGoods() {
      // 根据单击动态改变展示的商品类别，传给子组件
      return this.goods[this.currentType].list
    }
  },

//组件离开活跃状态记录滚动位置，回来时恢复
  activated () {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY ,0)
  },
  deactivated () {
    // 保存Y值保存页面状态
    this.saveY = this.$refs.scroll.getScrollY()

    // 取消事件监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },

  //组件一旦创建好了发送网络请求
  created () {
    //请求多个数据
    this.getHomeMultidata()
    // 分别请求三类商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },


  // 直接在生命周期函数中混入该内容替代下方内容
  mixins: [itemListenerMixin],

  // 挂载图片不一定加载完，仅仅结构挂载
  // mounted () {
  //   // 把函数传给防抖方法，接收的是方法返回的防抖函数，并且有闭包不会被回收
  //   const refresh = debounce(this.$refs.scroll.refresh,200)
  //   // 准备好通过事件总线监听事件，监听itemImageLoad图片加载完成
  //   // 每次图片加载完成就行一次scroll的刷新，重新计算高度

  //   //对监听事件所要执行的函数进行保存
  //   this.itemImgListener = () => {refresh()}
  //   this.$bus.$on('itemImageLoad',this.itemImgListener)
  // },



  
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      // 拿到scroll组件，再拿到scroll属性对应对象，再使用其方法第三个参数是毫秒
      // this.$refs.scroll.scroll.scrollTo(0,0,500)
      this.$refs.scroll.scrollTo(0,0)
    },

    //对滚动的高度信息决定隐藏或者显示backtop组件
    contentScroll(position) {
      // 1、判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //2、决定tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },

    //上拉加载更多 
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    //轮播图加载完成可以计算TabControl吸顶高度 是否吸顶
    swiperImageLoad(){
       // 获取tabControl的offsetTop
      // 所有的组件都有一个属性$el:用于获取组件的元素的
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },



  /**
   * 网络请求相关方法
   */
    //请求多个数据的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      console.log(res)
    })
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
    
  }

}
</script>

<style scoped>
#home{
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
  /* 在用浏览器原生滚动时，为了让导航不跟随一起滚动用以下属性 */
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99; */
}
/* 另一种方案 */
.content{
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
  overflow: hidden;
}
.tab-control{
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>