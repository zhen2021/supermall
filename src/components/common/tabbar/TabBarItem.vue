<template>
   <div class="tab-bar-item" @click="itemClick">
     <!-- 直接写在插槽上的值可能会被替换，所以需要外层包一个div -->
    <div  v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name:"TabBarItem",
  props: {
    path:String,
    activeColor: {
      type: String,
      default:'#1296db'
    }
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick(){
      // 判断防止传入的path是原path报错
      if(this.$route.path !== this.path){
        this.$router.replace(this.path)
      }
    }

  }
}
</script>

<style  scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 12px;
}
.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 去除文字和图片中间3px空隙 */
  vertical-align: middle;
  margin-bottom: 5px;
}
</style>