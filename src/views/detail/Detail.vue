<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"/>
    <scroll class="content">
      <detail-swiper :topImages="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detailInfo="detailInfo"/>

    </scroll>
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import Scroll from 'components/common/scroll/Scroll'

import {getDetail, Goods, Shop} from 'network/detail'

export default {
  name:"Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    Scroll
  },
  data () {
    return {
      id:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
    }
  },


  created () {
    // 保存传入的商品id
    this.id = this.$route.params.id
    // 根据id请求商品详情数据
    getDetail(this.id).then(res => {
      console.log(res);
      const data = res.result;
    //1. 获取详情轮播的图片
      this.topImages = data.itemInfo.topImages

    // 2.获取商品信息对象
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

    //3.创建店铺信息对象
    this.shop = new Shop(data.shopInfo) 

    // 4.获取商品详细信息
    this.detailInfo = data.detailInfo
    })
  }
}
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 999;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

</style>