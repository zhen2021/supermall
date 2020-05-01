<template>
  <div class="item">
    <img :src="classItem.image" alt="">
    <p>{{classItem.title}}</p>
  </div>
  
</template>

<script>
export default {
  name:"CategoryClassItem",
  props: {
    classItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },

}
</script>

<style scoped>
.item{
  float: left;
  width: 33%;
  text-align: center;
  font-size: 13px;
  line-height: 20px;
  padding: 10px 5px;
}
.item img {
  max-width: 90%;
}
</style>
