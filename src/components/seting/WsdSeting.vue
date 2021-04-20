<template>
  <div>
    <br><br>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制冷温度</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.wenstr_leng" placeholder="请输入制冷温度"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制冷开始时间</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.leng_timeStart" placeholder="请输入制冷开始时间"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制冷结束时间</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.leng_timeEnd" placeholder="请输入制冷结束时间"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制冷指令ID</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.leng_ml" placeholder="请输入制冷指令ID"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制热温度</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.wenstr_re" placeholder="请输入制热温度"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制热开始时间</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.re_timeStart" placeholder="请输入制热开始时间"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制热结束时间</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.re_timeEnd" placeholder="请输入制热结束时间"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">制热指令ID</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="ktData.re_ml" placeholder="请输入制热指令ID"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 128px;">是否启用</b></b-input-group-prepend>
          <b-form-select v-model="ktData.kt_status" :options="ktStatusOptions"></b-form-select>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="ktInfoCommit()">提 交</b-button>
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
      ktData: {
        wenstr_re: '',
        re_timeStart: '',
        re_timeEnd: '',
        re_ml: '',
        wenstr_leng: '',
        leng_timeStart: '',
        leng_timeEnd: '',
        leng_ml: '',
        kt_status: '0'
      },
      ktStatusOptions: [
        { value: '1', text: '启用' },
        { value: '0', text: '禁用' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    ktInfo () {
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken')
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/get_kt_set',
        params: param
      }).then(function (response) {
        console.log('=======ktInfo=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.ktData = response.data.data
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    ktInfoCommit () {
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken'),
        kongTiaoData: JSON.stringify(_this.ktData)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updata_kt_set',
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
