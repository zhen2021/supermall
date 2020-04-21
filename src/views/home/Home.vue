<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">团购网</div></nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true" @scroll="contentScroll" @pullingUp="loadMore">
        <home-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>
        <feature-view/>

        <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
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

      isShowBackTop: false
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
    //请求多个数据
    this.getHomeMultidata()
    // 分别请求三类商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted () {
    // 把函数传给防抖方法，接收的是方法返回的防抖函数，并且有闭包不会被回收
    const refresh =  this.debounce(this.$refs.scroll.refresh,200)

    // 准备好通过事件总线监听事件，监听itemImageLoad图片加载完成
    // 每次图片加载完成就行一次scroll的刷新，重新计算高度
    this.$bus.$on('itemImageLoad',() => {
      refresh()
    })
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
    },
    backClick() {
      // 拿到scroll组件，再拿到scroll属性对应对象，再使用其方法第三个参数是毫秒
      // this.$refs.scroll.scroll.scrollTo(0,0,500)

      this.$refs.scroll.scrollTo(0,0)
    },

    //对滚动的高度信息决定隐藏或者显示backtop组件
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y > 1000
    },

    //上拉加载更多 
    loadMore() {
      this.getHomeGoods(this.currentType)
    },

    // 防抖节流函数方法封装  args是func函数需要传的参数
    debounce(func,delay) {
      let timer = null
      return function(...args) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
          func.apply(this,args)
        },delay)
      }
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
  padding-top: 44px;
  height: 100vh;
}
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99;
}
.tab-control{
  position: sticky;
  top: 44px;
  background-color: #fff;
  z-index: 9;
}
/* .content{
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
} */
/* 另一种方案 */
.content{
  height: calc(100% - 49px);
  overflow: hidden;
}

</style>