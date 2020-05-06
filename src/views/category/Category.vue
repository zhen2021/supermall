<template>
<div id="category">
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
  </nav-bar>

<!-- 左侧 -->
  <scroll class="content-left" ref="scroll1" :probeType="3">
    <ul class="list"  ref="list">
      <li :class="{'list-item-checked':index==currentIndex}" class="list-item" @click="listClick(index,$event)" 
      v-for="(item, index) in categoryList" :key="index">{{item.classname}}</li>
    </ul>
  </scroll>


<!-- 右侧 -->
  <scroll class="content-right" ref="scroll">
    <category-active-class :activeClassList="activeClassList"/>

    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
    <goods-list :goods="showGoods"/>
  </scroll>

</div>
 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

import CategoryActiveClass from './childComps/CategoryActiveClass'
import {tabControlGoodsListMixin} from 'common/mixin'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import {getCategorydata} from 'network/category'

export default {
  name:"Category",
  components: {
    NavBar,
    Scroll,
    CategoryActiveClass,
    TabControl,
    GoodsList
  },

  data () {
    return {
      currentIndex:0,
      maxY: 0,
      activeClassList: [],
      // categoryList:['热门推荐','手机数码','电脑办公','家用电器','计生情趣','个护清洁','美妆美肤','汽车用品','图书音像','医药保健','珠宝首饰','内衣配饰','生鲜','粮米油面','水果蔬菜','男装','男鞋','女装','女鞋','特产']
      categoryList:[],
    }
  },
  methods: {
    backClick(){
      this.$router.push('/home')
    },
    // 通过事件获得元素属性，控制列表点击滑动高度
    listClick(index,$event) {
      this.currentIndex = index
      // 改变详细类展示
      this.activeClassList = this.categoryList[index].classlist
      // 回到顶端
      this.$refs.scroll.scrollTo(0,0)

      let height = -($event.toElement.offsetTop)
      if(height >= this.maxY){
        this.$refs.scroll1.scrollTo(0,height,300)
      }
      // console.log(height)
    },

    getCategorydata() {
      getCategorydata().then(res => {
      this.categoryList = res
        // 获取到数据先给的默认值
      this.activeClassList = this.categoryList[0].classlist
      console.log(res)
    })
    }
  },

  mixins:[tabControlGoodsListMixin],

  created () {
    // 请求分类数据
    this.getCategorydata()
  },

    updated() {
      this.$nextTick(() => {
       this.maxY = this.$refs.scroll1.scroll.maxScrollY
      })
    }

}
</script>

<style scoped>
#category{
  color: #333;
  height: 100vh;
}
.nav-bar {
    background-color: #fff;
}
.back img{
  margin-top: 12px;
  height: 20px;
}
.content-left{
  width: 85px;
  position: absolute;
  top: 45px;
  bottom: 49px;
  overflow: hidden;
  background-color: #f8f8f8;
}
.list{
  position: relative;
  background-color: #f8f8f8;
  border-right: 1px solid #f8f8f8;
}
.list-item{
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  text-align: center;
}
.list-item-checked{
  background-color: #fff;
  color: var(--color-tint);
}

.content-right{
  width: calc(100% - 86px);
  position: absolute;
  top: 45px;
  bottom: 49px;
  right: 0;
  overflow: hidden;
}

</style>