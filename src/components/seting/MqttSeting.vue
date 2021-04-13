<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">电脑ip地址</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="dnData.dn_ip" placeholder="请输入电脑ip地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">关机命令</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="dnData.dn_ml" placeholder="请输入关机命令"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">端口</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="dnData.dn_port" placeholder="请输入端口"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">是否启用</b></b-input-group-prepend>
          <b-form-select v-model="dnData.dn_status" :options="dnStatusOptions"></b-form-select>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="diannaoInfoCommit()">提 交</b-button>
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
      dnData: {
        dn_ip: '',
        dn_ml: '',
        dn_port: '',
        dn_status: '0'
      },
      dnStatusOptions: [
        { value: '1', text: '启用' },
        { value: '0', text: '禁用' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    diannaoInfo () {
      var _this = this
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/get_diannao_set',
        params: param
      }).then(function (response) {
        console.log('=======diannaoInfo=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.dnData = response.data.data
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    diannaoInfoCommit () {
      var _this = this
      var param = {
        diannaoData: JSON.stringify(_this.dnData)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updata_diannao_set',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======diannao======提交=======' + JSON.stringify(response.data))
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
