<template>
  <div>
    <br><br>
    <h6 class="btn_lubo_tijiao h_color">设备名称 设置必须保证与别的学校不同，并且容易记住，作为远程控制连接</h6>
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">设备名称</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="baseinfoList.title" placeholder="请输入设备名称"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">IP 地址</b></b-input-group-prepend>
          <b-form-input type="text" disabled v-model.trim="baseinfoList.ip" placeholder="请输入IP地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">系统版本</b></b-input-group-prepend>
          <b-form-input type="text" disabled v-model.trim="baseinfoList.version" placeholder="请输入系统版本"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">数据库版本</b></b-input-group-prepend>
          <b-form-input type="text" disabled v-model.trim="baseinfoList.data_version" placeholder="请输入数据库版本"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">显示屏个数</b></b-input-group-prepend>
          <b-form-input type="number" min="0" v-model.trim="baseinfoList.video_num" placeholder="请输入显示屏个数"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">服务器地址</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="baseinfoList.ser_ip" placeholder="请输入服务器地址"></b-form-input>
        </b-input-group>
        <br>
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">外网控制</b></b-input-group-prepend>
          <b-form-select v-model="baseinfoList.show" :options="mqttStatusOptions"></b-form-select>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="baseInfoCommit()">提 交</b-button>
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
  created () {
    console.log('=========BaseInfo=====created=======')
    this.getBaseInfo()
  },
  data () {
    return {
      mqttStatusOptions: [
        { value: 1, text: '启动' },
        { value: 0, text: '禁止' }
      ],
      baseinfoList: {
        title: '',
        ip: '',
        version: '',
        data_version: '',
        video_num: 0,
        ser_ip: '',
        uuid: '',
        show: 0
      },
      zkIP: localStorage.getItem('zhongkongIP')
    }
  },
  methods: {
    getBaseInfo () {
      var _this = this
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/zkBaseInfo',
        params: param
      }).then(function (response) {
        console.log('=======getBaseInfo=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.baseinfoList = response.data.data
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    baseInfoCommit () {
      var _this = this
      if (_this.baseinfoList.title === '') {
        alert('请输入设备名称')
        return
      }
      if (_this.baseinfoList.ser_ip.indexOf('http://') === -1 && _this.baseinfoList.ser_ip.indexOf('https://') === -1) {
        alert('服务器地址不正确')
        return
      }
      var param = {
        zkbaseInfoData: JSON.stringify(_this.baseinfoList)
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataZKbaseInfo',
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
.h_color {
  color: red;
}
</style>
