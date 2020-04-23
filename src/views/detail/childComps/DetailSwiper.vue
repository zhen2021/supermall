<template>
  <swiper>
      <swiper-item v-for="(item,index) in topImages" :key="index" class="swiper-item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'DetailSwiper',
  props: {
    topImages:{
      type: Array,
      // 类型是对象或者数组时，默认值必须是一个函数
      default() {
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
}
</script>

<style scoped>

</style>