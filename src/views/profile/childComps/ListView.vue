<template>
    <div id="list">
      <div v-for="(item, index) in listData" :key="index" class="item">
        <img :src="item.img" alt="">
        <div class="info">{{item.info}}</div>

      </div>

    </div>
</template>

<script>
	export default {
		name: "ListView",
    props: {
		  listData: {
		    type: Array,
        default: function () {
          return []
        }
      }
    }
	}
</script>

<style scoped>
#list {
  background-color: #fff;
  font-size: 12px;
  color: #333;
  overflow: hidden;
  padding:5px 15px 15px;
  margin: 15px 10px;
  border-radius: 10px;
}
#list .item{
  text-align: center;
  width: 20%;
  float: left;
  padding-top: 15px;
}
#list .item img {
  max-width: 40%;
}
#list .item .info{
  line-height: 25px;
}
</style>