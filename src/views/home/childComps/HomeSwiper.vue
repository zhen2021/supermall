<template>
  <swiper>
      <swiper-item v-for="(item,index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    banners:{
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
  }
}
</script>

<style>

</style>