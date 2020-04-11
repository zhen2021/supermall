<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">团购网</div></nav-bar>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
          <img :src="item.image" alt="">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'
import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
  name:'Home',
  components: {
    NavBar,
    Swiper,
    SwiperItem,
  },
  data () {
    return {
      banners:[],
      recommends:[],
    }
  },

  //组件一旦创建好了发送网络请求
  created () {
    //请求多个数据
    getHomeMultidata().then(res => {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend
      console.log(res)
    })
  }

}
</script>

<style scoped>
.home-nav{
  background-color: var(--color-tint);
  color: #ffffff;
}
</style>