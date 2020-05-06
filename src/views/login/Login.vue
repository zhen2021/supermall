<template>
  <div id="login">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">登 录</div>
    </nav-bar>


    <input-form ref="inputForm"/>
    <div class="btn submit-btn" @click="submitClick">登 录</div>
    <div class="btn register-btn" @click="registerClick">快速注册</div>

  </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import InputForm from "./childComps/InputForm";

import {getLogin} from 'network/login'

export default {
  name:"Login",
  data() {
    return {
      userInfo:{}
    };
  },
  components: {
    NavBar,
    InputForm,
  },


  methods: {
    backClick(){
      this.$router.push('/home')
    },


    submitClick() {
      let flag = this.$refs.inputForm.submitFlag
      console.log(flag)

      if (flag) {
        this.userInfo.name = this.$refs.inputForm.name
        this.userInfo.passWord = this.$refs.inputForm.passWord

        this.$refs.inputForm.name = ''
        this.$refs.inputForm.passWord = ''
        console.log(this.userInfo);

       // 请求服务器验证账号密码
       getLogin(this.userInfo.name,this.userInfo.passWord).then(res => {
        console.log(res);
        this.$toast.show(res.text,1500)

        if(res.error_code === 1){
          // 登录成功存储token
          let ses = window.sessionStorage
          ses.setItem("data",res.userInfo.token)
          console.log(ses,'ses')
          
          //存储用户信息
          this.$store.commit('storeUserInfo', res.userInfo)

          //跳转到首页
          this.$router.push("/home");
          this.userInfo={}
        }
       })


      }else{
        this.$toast.show('请输入正确格式账号密码',1500)
      }
    },


     registerClick() {
      this.$router.push('/register')
    }

  }
};
</script>
<style scoped>
.nav-bar {
    background-color: #fff;
}
.back img{
  margin-top: 12px;
  height: 20px;
}
#login {
  font-size: 15px;
  height: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: 999;
  position: relative;;
}



.btn{
  width: 85%;
  margin: 0 auto;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
}
.submit-btn{
  margin-top: 30px;
 background-image: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
 color: #fff;
}
.register-btn{
  margin-top: 10px;
  border: 1px solid #ff2000;
  color:#ff2000;
}
</style>
