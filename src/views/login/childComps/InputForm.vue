<template>
  <div class="form">
    <input name="username" type="text" placeholder="邮箱/手机号" v-model="name" autocomplete="off">
    <span class="error">{{nameInpMsg}}</span>
    
    <input name="password" type="text" placeholder="请输入密码" v-model="passWord" autocomplete="off">
    <span class="error">{{passWordInpMsg}}</span>

  </div>
</template>

<script>
export default {
  name:'InputForm',
  data () {
    return {
      name:'',
      passWord:'',
      nameInpMsg:"",
      passWordInpMsg:"",

      submitFlagN:false,//姓名是否可提交
      submitFlagPW:false,//密码是否可提交
    }
  },

  computed: {
    submitFlag(){
      return this.submitFlagN && this.submitFlagPW
    }
  },




    // 数据改变验证是否合规
  watch: {
    name() {
      let phoneExp = /^([\u4e00-\u9fa5]|\w){4,11}$/g
      let emailExp = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/
       if ( this.name===''|| phoneExp.test(this.name) || emailExp.test(this.name) ) {
        this.nameInpMsg = ''
        this.submitFlagN = true

      } else {
        this.nameInpMsg = '用户名必须是邮箱或手机号格式'
        this.submitFlagN = false
      }
    },

    passWord() {
      let passWordExp = /^\w{6,16}$/
      if (this.name==='' || passWordExp.test(this.passWord) ) {
        this.passWordInpMsg = ''
        this.submitFlagPW = true

      } else {
        this.passWordInpMsg = '密码必须为6~16位，不能有特殊字符'
        this.submitFlagPW = false
      }
    }
  },

}
</script>


<style scoped>
.form{
  width: 85%;
  margin: 0 auto;
  margin-bottom: 30px;
  font-size: 16px;
}
.form input{
  width: 100%;
  display: block;
  height: 50px;
  padding: 10px 0;
  padding-left: 5px;
  margin-top: 25px;
  border: 0px;
  border-bottom: 1px solid #efefef;
}
.form input:focus {
    outline: 0px;
}

::-webkit-input-placeholder { color:rgba(0,0,0,.4); }
::-moz-placeholder { color:rgba(0,0,0,.4); } /* firefox 19+ */
:-ms-input-placeholder { color:rgba(0,0,0,.4); } /* ie */
input:-moz-placeholder { color:rgba(0,0,0,.4); }

.error {
  color: #ff2000;
  font-size: 13px;
  line-height: 19px;
  position: absolute;
}
</style>