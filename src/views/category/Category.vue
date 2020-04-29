<template>
<div id="category">
  <nav-bar class="nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
  </nav-bar>

  <scroll class="content" ref="scroll" :probeType="3">
    <ul class="list"  ref="list">
      <li :class="{'list-item-checked':index==currentIndex}" class="list-item" @click="listClick(index,$event)" 
      v-for="(item, index) in categoryList" :key="index">{{item}}</li>
    </ul>
  </scroll>


</div>
 
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'

export default {
  name:"Category",
  components: {
    NavBar,
    Scroll
  },

  data () {
    return {
      currentIndex:0,
      maxY: 0,
      categoryList:['热门推荐','手机数码','电脑办公','家用电器','计生情趣','个护清洁','美妆美肤','汽车用品','图书音像','医药保健','珠宝首饰','内衣配饰','生鲜','粮米油面','水果蔬菜','男装','男鞋','女装','女鞋','特产']
    }
  },
  methods: {
    backClick(){
      this.$router.push('/home')
    },
    // 通过事件获得元素属性，控制列表点击滑动高度
    listClick(index,$event) {
      this.currentIndex = index

      let height = -($event.toElement.offsetTop)
      if(height >= this.maxY){
        this.$refs.scroll.scrollTo(0,height,300)
      }
      // console.log(height)
    },
  },

  mounted(){
      this.$nextTick(() => { // 页面渲染完成后的回调,获取最大可滚动高度
        this.maxY = this.$refs.scroll.scroll.maxScrollY
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
.content{
  width: 85px;
  position: absolute;
  top: 45px;
  bottom: 49px;
  overflow: hidden;
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


</style>