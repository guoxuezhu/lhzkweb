<template>
  <div>
    <h1>BaseInfo</h1>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
export default {
  created () {
    // this.getBaseInfo()
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getBaseInfo () {
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8089/api/baseInfo',
        params: param
      }).then(function (response) {
        console.log('=======连接=============' + JSON.stringify(response))
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

</style>
