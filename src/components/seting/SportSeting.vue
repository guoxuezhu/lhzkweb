<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="串口１" active>
        <p>I'm the first tab</p>
      </b-tab>
      <b-tab title="串口２"><p>I'm the second tab</p></b-tab>
      <b-tab title="串口３"><p>I'm a dd tab!</p></b-tab>
      <b-tab title="串口４"><p>I'm a dd tab!</p></b-tab>
      <b-tab title="串口５"><p>I'm a dd tab!</p></b-tab>
      <b-tab title="串口６"><p>I'm a dd tab!</p></b-tab>
      <b-tab title="串口７"><p>I'm a dd tab!</p></b-tab>
      <b-tab title="串口８"><p>I'm a dd tab!</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
export default {
  created () {
    // this.getSportInfo(1)
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getSportInfo (spnumer) {
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
