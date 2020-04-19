<template>
  <div class="goods">
    <goods-list-item v-for="(item,index) in goods" :key="index" :goodsItem="item"/>
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: "GoodsList",
  components: {
    GoodsListItem
  },
  props: {
    goods:{
      type:Array,
      default(){
        return []
      }
    }
  }
}
</script>

<style scoped>
.goods {
  display: flex;
  /* 包裹，根据具体宽度分配每行数量 */
  flex-wrap: wrap;
  /*居中均等分 */
  /* justify-content: space-around; */
  /*间隙均等分 */
  justify-content: space-evenly;
}

</style>