<template>
  <div id="register">
    <nav-bar class="nav-bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">快速 注册</div>
    </nav-bar>

    <input-form ref="inputForm"/>
    <div class="btn register-btn" @click="registerClick">注 册</div>

  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import InputForm from "./childComps/InputForm";

import {getRegister} from 'network/login'

export default {
  name:'Register',
  components: {
    NavBar,
    InputForm,
  },

  data () {
    return {
      userInfo:{},
    }
  },

  methods: {
    backClick(){
      this.$router.go(-1)
    },

    registerClick(){
      let flag = this.$refs.inputForm.submitFlag
      console.log(flag)

      // 格式正确可以提交
      if (flag) {
        this.userInfo.name = this.$refs.inputForm.name
        this.userInfo.passWord = this.$refs.inputForm.passWord

        this.$refs.inputForm.name = ''
        this.$refs.inputForm.passWord = ''

        //发送网络请求，注册用户
        getRegister(this.userInfo.name,this.userInfo.passWord).then(res => {
        console.log(res);
        //注册完成状态弹窗
        this.$toast.show(res.text,1500)

        if(res.error_code === 1){
          // 注册完成，跳转到登录
          this.$router.push('/login')
          this.userInfo={}
        }
       })

        
      }else{
        this.$toast.show('请输入正确格式账号密码',1500)
      }
    }
  }

}


</script>

<style scoped>
.nav-bar {
    background-color: #fff;
}
.back img{
  margin-top: 12px;
  height: 20px;
}
#register {
  font-size: 15px;
  height: 100%;
  min-height: 100vh;
  background-color: #fff;
  z-index: 999;
  position: relative;;
}

.btn{
  width: 85%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  border-radius: 25px;
}
.register-btn{
  margin: 10px auto;
  border: 1px solid #ff2000;
  color:#ff2000;
}
</style>