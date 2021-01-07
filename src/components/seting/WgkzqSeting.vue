<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">网关控制器IP地址</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="wgkzqDataInfo.name" placeholder="请输入网关控制器IP地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">是否启用</b></b-input-group-prepend>
          <b-form-select v-model="wgkzqDataInfo.status" :options="wgkzqStatusOptions"></b-form-select>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="wgkzqInfoCommit()">提 交</b-button>
      </b-col>
      <b-col lg="3">
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
import Qs from 'qs'
export default {
  data () {
    return {
      wgkzqDataInfo: {
        name: '',
        status: 0
      },
      wgkzqStatusOptions: [
        { value: 1, text: '启用' },
        { value: 0, text: '禁用' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    wgkzqInfo () {
      var _this = this
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/wgkzqInfo',
        params: param
      }).then(function (response) {
        console.log('=======wgkzqSeting=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.wgkzqDataInfo = response.data.data
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    wgkzqInfoCommit () {
      if (this.wgkzqDataInfo.name === '') {
        alert('请输入网关控制器IP地址')
        return
      }
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (reg.test(this.wgkzqDataInfo.name) === false) {
        alert('输入的IP地址不合法')
        return
      }
      var _this = this
      var param = {
        wgkzqDatas: JSON.stringify(_this.wgkzqDataInfo)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataWgkzqInfo',
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
          alert('修改失败,' + response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_lubo_tijiao {
  text-align: center;
}
</style>
