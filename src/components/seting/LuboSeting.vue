<template>
  <div>
    <br><br>
    <div>
      <b-row>
        <b-col lg="3">
        </b-col>
        <b-col lg="6" class="btn_lubo_tijiao">
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 128px;">录播IP地址</b></b-input-group-prepend>
            <b-form-input type="text" v-model.trim="lubo.record_ip" placeholder="请输入录播IP地址"></b-form-input>
          </b-input-group>
          <br>
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 128px;">录播用户名称</b></b-input-group-prepend>
            <b-form-input type="text" v-model.trim="lubo.record_user" placeholder="请输入录播用户名称"></b-form-input>
          </b-input-group>
          <br>
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 128px;">录播用户密码</b></b-input-group-prepend>
            <b-form-input type="text" v-model.trim="lubo.record_pass" placeholder="请输入录播用户密码"></b-form-input>
          </b-input-group>
          <br>
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 128px;">是否启用</b></b-input-group-prepend>
            <b-form-select v-model="lubo.status" :options="luboStatusOptions"></b-form-select>
          </b-input-group>
          <br>
          <b-button variant="outline-success" @click="luboInfoCommit()">提 交</b-button>
        </b-col>
        <b-col lg="3">
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
import Qs from 'qs'
export default {
  created () {
    // this.luboInfo()
  },
  data () {
    return {
      lubo: {
        record_ip: '',
        record_user: '',
        record_pass: '',
        status: 0
      },
      luboStatusOptions: [
        { value: 1, text: '启用' },
        { value: 0, text: '禁用' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    luboInfo () {
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken')
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/luboInfo',
        params: param
      }).then(function (response) {
        console.log('=======录播=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.lubo = response.data.data[0]
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    luboInfoCommit () {
      if (this.lubo.record_ip === '') {
        alert('请输入录播IP地址')
        return
      }
      if (this.lubo.record_user === '') {
        alert('请输入录播用户名称')
        return
      }
      if (this.lubo.record_pass === '') {
        alert('请输入录播用户密码')
        return
      }
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (reg.test(this.lubo.record_ip) === false) {
        alert('输入的IP地址不合法')
        return
      }
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken'),
        luboDatas: JSON.stringify(_this.lubo)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataLuboInfo',
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
