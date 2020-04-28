<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product="item"/>
    </scroll>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll'
import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name:"CartList",
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(['cartList'])
  },

  activated () {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.cart-list {
  /* 一些手机端不支持calc */
  /* height: calc(100% - 44px - 49px - 40px); */
  position: absolute;
  top: 44px;
  bottom: 89px;
  width: 100%;
}
.content{
  height: 100%;
  overflow: hidden;
}

</style>