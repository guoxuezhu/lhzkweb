<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">门禁名称</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="doorDataInfo.name" placeholder="请输入门禁名称"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">门禁IP地址</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="doorDataInfo.IP" placeholder="请输入门禁IP地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">是否启用</b></b-input-group-prepend>
          <b-form-select v-model="doorDataInfo.isStart" :options="doorStatusOptions"></b-form-select>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="doorInfoCommit()">提 交</b-button>
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
      doorDataInfo: {
        name: '',
        IP: '',
        isStart: 0
      },
      doorStatusOptions: [
        { value: 1, text: '启用' },
        { value: 0, text: '禁用' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    doorInfo () {
      var _this = this
      var param = {
        user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken')
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/doorSeting',
        params: param
      }).then(function (response) {
        console.log('=======doorSeting=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.doorDataInfo = response.data.data
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    doorInfoCommit () {
      if (this.doorDataInfo.IP === '') {
        alert('请输入门禁IP地址')
        return
      }
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (reg.test(this.doorDataInfo.IP) === false) {
        alert('输入的IP地址不合法')
        return
      }
      var _this = this
      var param = {
        user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken'),
        doorDatas: JSON.stringify(_this.doorDataInfo)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataDoorInfo',
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
