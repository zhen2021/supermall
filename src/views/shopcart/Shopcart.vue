<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{length}}）</div>
      </nav-bar>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

export default {
  name:"Shopcart",
  components: {
    NavBar
  },

  // 直接从getter拿来当计算属性
  computed: {
    // 两种语法 第二种对象形式可起别名
    // ...mapGetters(['cartLength',])
    ...mapGetters({
      length:'cartLength',
    })
  }

}
</script>

<style scoped>
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>