<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"/>

    <scroll class="content" ref="scroll">
      <!--事件可以大写 属性不区分大小写 topImages 传入值top—images -->
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="recommends" ref="recommend"/>
    </scroll>
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'

import Scroll from 'components/common/scroll/Scroll'
import GoodsList from '../../components/content/goods/GoodsList'

import {getDetail, getRecommend, Goods, Shop, GoodsParam} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin} from 'common/mixin'



export default {
  name:"Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    Scroll,
    GoodsList
  },
  data () {
    return {
      id:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
    }
  },

  created () {
    // 保存传入的商品id
    this.id = this.$route.params.id

    // 一、根据id请求商品详情数据
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

    // 5.封装获取商品的参数
    this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

    // 6.取出评论信息
    if (data.rate.cRate !== 0) {
      this.commentInfo = data.rate.list[0]
    }
    }),


    // 二、请求商品详情页推荐商品
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    }),

    // 三、给getThemeTopY赋值  图片加载完调用，并且防抖
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      //  分别获取四个themeTopYs值，对应页面内跳转位置
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)

      console.log(this.themeTopYs);
    },50)
  },

  // 直接在生命周期函数中混入该内容代替下方内容
  mixins: [itemListenerMixin],

  //  mounted () {
  //   // 把函数传给防抖方法，接收的是方法返回的防抖函数，并且有闭包不会被回收
  //   const refresh = debounce(this.$refs.scroll.refresh,200)
  //   //对监听事件所要执行的函数进行保存
  //   this.itemImgListener = () => {refresh()}
  //   this.$bus.$on('itemImageLoad',this.itemImgListener)
  // },
  //  销毁取消事件的监听
  // destroyed () {
  //   this.bus.$off('itemImgLoad',this.itemImgListener)
  // },


  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
      // 图片加载完调用 getThemeTopYs ，更新themeTopYs值
      this.getThemeTopY()
    },
    // 点击顶部nav-bar跳转相应位置  
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -(this.themeTopYs[index]), 200)
    }
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
  position: relative;
  top: 44px;
}
.detail-nav {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  background-color: #fff;
}

</style>