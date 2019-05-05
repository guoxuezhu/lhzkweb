<template>
  <div>
    <b-tabs content-class="mt-3">
      <b-tab title="串口１" active>
        <Sport></Sport>
      </b-tab>
      <b-tab title="串口２">
        <Sport></Sport>
      </b-tab>
      <b-tab title="串口３">
        <Sport></Sport>
      </b-tab>
      <b-tab title="串口４">
        <Sport></Sport>
      </b-tab>
      <b-tab title="串口５">
        <Sport></Sport>
      </b-tab>
      <b-tab title="串口６">
        <Sport></Sport>
      </b-tab>
      <b-tab title="串口７">
        <Sport></Sport>
      </b-tab>
      <b-tab title="串口８">
        <Sport></Sport>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
import Sport from '../smcomponents/Sport.vue'
export default {
  components: {
    Sport
  },
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
