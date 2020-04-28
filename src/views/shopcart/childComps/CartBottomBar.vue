<template>
  <div class="bottom-bar">
    <check-button class="select-all" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
    <span>全选</span>
    <span class="total-price">合计: ¥{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去结算({{checkedLength}})</span>
  </div>
</template>

<script>
import CheckButton from './CheckButton'
import {mapGetters } from 'vuex'

export default {
  name:"CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return this.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.newPrice * item.count
      },0).toFixed(2)
    },

    checkedLength() {
      return this.cartList.filter(item => item.checked).length
    },

    // 判断是否有没选中的
    isSelectAll() {
      if (this.cartList.length === 0) return false

      // return !(this.cartList.filter(item => !item.checked).length)   循环完才结束 性能不高
      return !(this.cartList.find(item => !item.checked))
    }
  },

  methods: {
    // 全选按钮
    checkClick() {
      // 全部选中了
      if (this.isSelectAll){
        this.$store.commit('eachDisChecked')
      }else{
        this.$store.commit('eachChecked')
      }
    },

    //结算前判断是否没选中商品
    calcClick() {
      if(!this.isSelectAll){
        this.$toast.show('您还没有选择商品哦',2000)
      }
    }
  }
}
</script>

<style scoped>
.bottom-bar {
    width: 100%;
    position: absolute;
    bottom: 49px;
    height: 40px;
    
    background-color: #eee;
    box-shadow: 0 -1px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    padding-left: 35px;
    line-height: 40px;
    box-sizing: border-box;
  }
  .bottom-bar .select-all {
    position: absolute;
    line-height: 0;
    left: 5px;
    top: 11px;
  }
  .bottom-bar .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }
   .bottom-bar .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 30px;
    text-align: center;
    float: right;

    margin: 4px 8px 5px;
    line-height: 30px;
    border-radius: 30px;
  }

</style>