<template>
  <div class="loigin_Bg">
    <h1 class="borde_red">{{ msg }}</h1>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../api/apply.js'
export default {
  name: 'Login',
  created () {
    this.selectSchool()
  },
  data () {
    return {
      msg: 'Logissssddn'
    }
  },
  methods: {
    selectSchool () {
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'api/school/menu',
        params: param
      }).then(function (response) {
        console.log('=======学校=============' + JSON.stringify(response.data.data))
      }).catch(function (error) {
        alert('====menuTerm====' + error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borde_red{
  border: 1px solid red;
}
.loigin_Bg {
  position:absolute;
  width: 100%;
  height: 100%;
  background: url('../assets/login_bg.png') no-repeat ;
  background-size: cover;
}
</style>
