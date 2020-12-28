<template>
  <div class="loigin_Bg">
    <div class="h-25 d-inline-block"></div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="6"></b-col>
        <b-col cols="4">
          <div class="login_Layout" @keyup.enter="login($event)">
            <h3 class="login_title">用户登录</h3>
            <b-input-group>
              <b-input-group-prepend>
                <img src="../assets/connect.png" class="login_input_img">
              </b-input-group-prepend>
              <b-form-input type="text" size="lg" v-model.trim="ZKIP" placeholder="请输入设备IP地址"></b-form-input>
            </b-input-group>
            <br/>
            <b-input-group>
              <b-input-group-prepend>
                <img src="../assets/zhanghao.png" class="login_input_img">
              </b-input-group-prepend>
              <b-form-input type="text" size="lg" v-model.trim="userName" placeholder="请输入用户名"></b-form-input>
            </b-input-group>
            <br/>
            <b-input-group>
              <b-input-group-prepend>
                <img src="../assets/mima.png" class="login_input_img">
              </b-input-group-prepend>
              <b-form-input type="password" size="lg" v-model.trim="passWord" placeholder="请输入密码"></b-form-input>
            </b-input-group>
            <b-container class="bv-example-row login_mima_jizhu">
              <b-row>
                <b-col><b-form-checkbox v-model="status" value="1" unchecked-value="0">记住密码</b-form-checkbox></b-col>
                <b-col><a href="javascript:return 0" class="a_login"><small>忘记密码?</small></a></b-col>
              </b-row>
            </b-container>
            <b-button @click="login" size="lg" variant="primary" class="loginbtn">登 录</b-button>
            <br/>
          </div>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../api/apply.js'
import md5 from 'js-md5'
import Qs from 'qs'
export default {
  name: 'Login',
  created () {
  },
  data () {
    return {
      ZKIP: localStorage.getItem('zhongkongIP'),
      userName: localStorage.getItem('userName'),
      passWord: localStorage.getItem('passWord'),
      status: localStorage.getItem('mimastatus'),
      msg: 'Login'
    }
  },
  methods: {
    login () {
      if (this.userName === '' || this.passWord === '' || this.ZKIP === '') {
        alert('请输入设备IP地址,用户名,密码')
        return
      }
      var _this = this
      var param = {
        user_name: _this.userName,
        user_password: md5(this.userName + 'SWQxcGJxM2RrRkoyOTAxNGU' + this.passWord)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + _this.ZKIP + ':8099/api/lh_zk_login',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======提交======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          alert('修改成功')
        } else {
          alert('修改失败')
        }
      }).catch(function (error) {
        alert(error)
      })
      if (this.userName !== 'admin' || this.passWord !== 'admin') {
        alert('用户名或密码错误')
        return
      }
      console.log('=======登录=============')
      if (this.status === '1') {
        localStorage.setItem('userName', this.userName)
        localStorage.setItem('passWord', this.passWord)
        localStorage.setItem('mimastatus', this.status)
      } else {
        localStorage.setItem('userName', '')
        localStorage.setItem('passWord', '')
        localStorage.setItem('mimastatus', '')
      }
      localStorage.setItem('isLogin', '1')
      this.$router.push({path: '/connect'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borde_red {
  border: 1px solid red;
}
.loigin_Bg {
  position:absolute;
  width: 100%;
  height: 100%;
  background: url('../assets/login_bg.png') no-repeat ;
  background-size: cover;
}
.login_Layout {
  height: auto;
  width: 100%;
  border-radius: 6px;
  background-color: #c8f8fa;
  padding: 20px;
  margin-top: 25%;
}
.login_title {
  text-align: center;
  margin-bottom: 19px;
}
.login_input_img {
  background: #555CE0;
  width: 48px;
  height: 48px;
  padding: 13px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.login_mima_jizhu {
  padding-left: 0px;
  padding-right: 0px;
  margin-top: 13px;
  margin-bottom: 13px;
}
.a_login {
  float: right;
}
.loginbtn {
  width: 100%;
}
</style>
