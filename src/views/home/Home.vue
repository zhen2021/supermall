<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">团购网</div></nav-bar>
    <home-swiper :banners="banners"/>
    <recommend-view :recommends="recommends"/>
    <feature-view/>

    <tab-control class="tab-control" :titles="['流行','新款','精选']"/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'
import TabControl from 'components/content/tabControl/TabControl'

import {getHomeMultidata} from 'network/home'

export default {
  name:'Home',
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl
  },
  data () {
    return {
      banners:[],
      recommends:[],
      //商品请求数据模型
      goods: {
        'pop': {page:0,list: []},
        'news': {page:0,list: []},
        'sell': {page:0,list: []},
      },
    }
  },

  //组件一旦创建好了发送网络请求
  created () {
    //请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      console.log(res)
    })
    // 请求商品数据
    // getHomegoods('pop')
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
}
</style>