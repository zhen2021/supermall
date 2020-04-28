<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车（{{length}}）</div>
      </nav-bar>

    <!-- 商品列表 -->
    <cart-list/>

    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar' 

import { mapGetters } from 'vuex'

export default {
  name:"Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
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
.cart {
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
  color: #fff;
}
</style>