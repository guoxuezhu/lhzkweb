<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <div v-for="ui in uiData" :key="ui.btnId">
          <b-input-group>
            <b-input-group-prepend is-text><b style="width: 128px;">{{ui.btn_name}}</b></b-input-group-prepend>
            <b-form-select v-model="ui.btn_status" :options="uiStatusOptions"></b-form-select>
          </b-input-group>
          <br>
        </div>
        <b-button variant="outline-success" @click="uiInfoCommit()">提 交</b-button>
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
      uiData: [],
      uiStatusOptions: [
        { value: 0, text: '隐藏' },
        { value: 1, text: '显示' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    uiInfo () {
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken')
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/get_ui_status',
        params: param
      }).then(function (response) {
        console.log('=======ktInfo=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.uiData = response.data.data
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    uiInfoCommit () {
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken'),
        ui_status_datas: JSON.stringify(_this.uiData)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updata_ui_status',
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
