<template>
<div class="content">
  <p>热门分类</p>
  <div class="activeclass">
    <category-class-item v-for="(item, index) in activeClassList" :key="index" :classItem="item"/>
  </div>
</div>
  
</template>

<script>
import CategoryClassItem from './CategoryClassItem'

export default {
  name:"CategoryActiveClass",
  components: {
    CategoryClassItem
  },
  props: {
    activeClassList:{
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.activeclass{
  /* display: flex; */
  /* 包裹，根据具体宽度分配每行数量 */
  flex-wrap: wrap;
  /*居中均等分 */
  /* justify-content: space-around; */
  /*间隙均等分 */
  /* justify-content: space-evenly; */
  /* justify-content:space-between; */
  padding: 10px 10px 50px;
  overflow: hidden;
}
.content p{
  font-size: 14px;
  font-weight: bold;
  padding-top: 15px;
  padding-left: 10px;
}
</style>