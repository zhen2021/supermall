<template>
  <div id="user-info">
      <div class="icon">
        <slot name="user-icon">
          <img src="~assets/img/profile/userIcon.svg" alt="">
        </slot>
      </div>

      <div class="login-info">
        <slot name="user-nickname">
          <p>{{userName}}</p>
        </slot>
      </div>

    <div class="account">
      <div class="account-item" v-for="(item,index) in accountInfo" :key="index">
        <p class="number">{{item.num}}</p>
        <p class="title">{{item.title}}</p>
      </div>

    </div>

  </div>
</template>

<script>
	export default {
    name: "UserInfo",
    props: {
      accountInfo:{
        type:Array,
        default:{}
      },
      userName:{
        type:String,
        default:'登录/注册'
      },
    }
	}
</script>

<style scoped>
  #user-info {
    background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
    padding: 44px 10px 20px;
    overflow: hidden;
    border-bottom-left-radius: 5%;
    border-bottom-right-radius: 5%;
    color: #666;
  }
  #user-info .icon {
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: #fff;
    float: left;
  }
   #user-info .icon img{
     width: 100%;
   }
  #user-info .login-info {
    margin-left: 10px;
    float: left;
    font-weight: bold;
    line-height: 60px;
  }



.account {
  width: 100%;
  display: flex;
  padding-top: 15px;
  }
.account-item {
  width: 100%;
  margin-right: 1px;
  text-align: center;
  font-size: 12px;
}
.account-item .number{
  line-height: 30px;
  font-size: 16px;
  font-weight:bold;
}

</style>