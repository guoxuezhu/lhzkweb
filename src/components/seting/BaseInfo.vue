<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="4">
      </b-col>
      <b-col lg="4">
        <p>中控IP地址:  {{zkIP}}</p>
        <br>
      </b-col>
      <b-col lg="4">
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
export default {
  created () {
    console.log('=========BaseInfo===========')
    this.getBaseInfo()
  },
  data () {
    return {
      zkIP: localStorage.getItem('zhongkongIP'),
      zkversion: ''
    }
  },
  methods: {
    getBaseInfo () {
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/baseInfo',
        params: param
      }).then(function (response) {
        console.log('=======getBaseInfo=============' + JSON.stringify(response.data))
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
