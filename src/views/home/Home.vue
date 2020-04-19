<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">团购网</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>

    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"/>
    <goods-list :goods="showGoods"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getHomeMultidata, getHomeGoods} from 'network/home'

export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList
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
      currentType:'pop'
    }
  },
  computed: {
    showGoods() {
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
      console.log(res)
    })
    },
    
  }

}
</script>

<style scoped>
#home{
  padding-top: 44px;
  padding-bottom: 50px;
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
</style>