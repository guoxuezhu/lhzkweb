<template>
  <div class="loigin_Bg">
    <div class="h-25 d-inline-block"></div>
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="6"></b-col>
        <b-col cols="4">
          <div class="connect_Layout">
            <h3 class="connect_title">中控连接</h3>
            <b-input-group>
              <b-input-group-prepend>
                <img src="../assets/zhanghao.png" class="connect_input_img">
              </b-input-group-prepend>
              <b-form-input type="text" size="lg" v-model.trim="ZKIP" :state="ipStatus" placeholder="请输入中控IP地址"></b-form-input>
            </b-input-group>
            <br/>
            <b-button @click="connect" size="lg" variant="primary" class="connectbtn">连 接</b-button>
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
export default {
  name: 'Connect',
  created () {
  },
  data () {
    return {
      ZKIP: '',
      ipStatus: 'null'
    }
  },
  methods: {
    connect () {
      if (this.ZKIP === '') {
        this.ipStatus = false
        return
      }
      this.ipStatus = true
      localStorage.setItem('zhongkongIP', this.ZKIP)
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8089/api/ipconnect',
        params: param
      }).then(function (response) {
        console.log('=======连接=============' + JSON.stringify(response))
        this.$router.push({path: '/helloWorld'})
      }).catch(function (error) {
        alert(error)
      })
    },
    selectSchool () {
      console.log('====================')
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
.connect_Layout {
  height: auto;
  width: 100%;
  border-radius: 6px;
  background-color: #c8f8fa;
  padding: 20px;
  margin-top: 35%;
}
.connect_title {
  text-align: center;
  margin-bottom: 19px;
}
.connect_input_img {
  background: #555CE0;
  width: 48px;
  height: 48px;
  padding: 13px;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.connectbtn {
  width: 100%;
}
</style>
