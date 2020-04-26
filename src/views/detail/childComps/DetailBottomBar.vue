<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">立即购买</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "DetailBottomBar",
    methods: {
      addToCart() {
        this.$emit('addCart')
      }
    }
	}
</script>

<style scoped>
.bottom-bar{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  background-color: #fff;
  display: flex;
  text-align: center;
  box-shadow: 0 -1px 1px rgba(100,100,100, 0.1);
}
 .bar-item {
    flex: 2;
    display: flex;
  }
  .bar-item>div {
    flex: 1;
  }
  .bar-left .text {
    font-size: 10px;
  }
  .bar-left .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 7px auto 3px;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
  }
  .bar-left .service {
    background-position:0 -54px;
  }
  .bar-left .shop {
    background-position:0 -98px;
  }
  .bar-right {
    flex: 3;
    font-size: 12px;
    color: #fff;
    line-height: 58px;
  }
  .bar-right .cart {
    text-align: center;
    margin: 7px 5px;
    line-height: 35px;
    height: 35px;
    border-radius: 35px;
    background-color: #f00;
  }
  .bar-right .buy {
    background-color: #ffba0d;
    margin: 7px 5px;
    line-height: 35px;
    height: 35px;
    border-radius: 35px;
  }
</style>