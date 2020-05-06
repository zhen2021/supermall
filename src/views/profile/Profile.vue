<template>
  <div id="profile">
    <UserInfo :accountInfo="accountInfo" :userName="userName"></UserInfo>

    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>

    <div class="btn out-btn" @click="loginOutClick">注销登录</div>
  </div>
</template>

<script>
  import UserInfo from './childComps/UserInfo'
  import ListView from './childComps/ListView'

	export default {
		name: "Profile",
    components: {
		  UserInfo, ListView, 
    },
    data(){
		  return {
       userInfo:{},
       accountInfo:[
          {num:"12",title:"历史浏览"},
          {num:"123",title:"商品关注"},
          {num:"10",title:"优惠券"},
          {num:'200.00',title:"账户余额"},
        ],
		    orderList: [
          {img: require("assets/img/profile/order/payment.svg"), info: '待付款'},
          {img: require("assets/img/profile/order/delivery.svg"), info: '待发货'},
          {img: require("assets/img/profile/order/takeDelivery.svg"), info: '待收获'},
          {img: require("assets/img/profile/order/evaluate.svg"), info: '评价'},
          {img: require("assets/img/profile/order/postSale.svg"),info: '售后'},
        ],

         serviceList: [
        {img: require("assets/img/profile/option/signIn.svg"),info: "签到"},
        {img: require("assets/img/profile/option/customer.svg"),info: "客服"},
        {img: require("assets/img/profile/option/manage.svg"),info: "设置"},
        {img: require("assets/img/profile/option/orientation.svg"), info: "定位"},
        {img: require("assets/img/profile/option/recharge.svg"),info: "充值" },
        {img: require("assets/img/profile/option/rise.svg"),info: "报表"}
        ],

      }
    },

    computed: {
      userName() {
        this.userInfo = this.$store.getters.getUserInfo
        return this.userInfo.name
      }
    },

    methods: {
      loginOutClick() {
        //删除原登录用户信息
       this.$store.commit('deleteUserInfo')
        // 注销后 清除session信息 ，并返回登录页
        window.sessionStorage.removeItem('data');
        this.$router.push('/login'); 
      }
    }


	}
</script>

<style scoped>
  #profile {
    height: 100vh;
    background-color: #f2f2f2;
  }
 

 .btn{
  margin:0 10px auto;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
}
.out-btn{
  border: 1px solid #ff2000;
  color:#ff2000;
}
</style>