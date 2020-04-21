<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 到时使用的直接替换插槽位置 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
 name: "Scroll",
 props: {
   probeType: {
     type:Number,
     default: 0
   },
   pullUpLoad: {
     type:Boolean,
     default:false
   }
 },
 data () {
   return {
    scroll: null  
    // 此处是为了保留mounted运行完创建的scroll对象
   }
 },
 mounted () {
  //  1.创建BScroll对象
   //this.$refs.wrapper 拿到的必是本组件的wrapper
   this.scroll = new BScroll(this.$refs.wrapper,{
     probeType: this.probeType,
     pullUpLoad: this.pullUpLoad,
     click:'true',
     mouseWheel: true
   })

  // 2、监听滚动的位置
  this.scroll.on('scroll',(position) => {
    // 将这个事件发出去
    this.$emit('scroll', position)
    // console.log(position);
  })

  //3、监听上拉事件
  if(this.pullUpLoad) {
      this.scroll.on('pullingUp',() => {
      // 将这个事件发出去
      this.$emit('pullingUp')
    })
  }
 
 },
//  封装了返回顶部的方法,默认时间300毫秒
 methods: {
   scrollTo(x, y, time=200) {
    //  防止挂载时间顺序问题导致出错，确定有值在进行调用方法
     this.scroll && this.scroll.scrollTo(x, y, time)
   },
//  封装了结束完成一次下拉加载更多的方法
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },

//  封装刷新方法，重新计算滚动区域的高度
    refresh() {
      this.scroll && this.scroll.refresh()
      console.log("防抖后执行scroll.refresh()一次");
    },

// 封装获取存储滚动到的位置y
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    } 

 }
}
</script>

<style>

</style>