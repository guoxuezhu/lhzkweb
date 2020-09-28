<template>
  <div>
    <br><br>
    <!-- <h6 class="btn_lubo_tijiao h_color">每天定时系统重启，防止长时间使用造成超负荷运行</h6> -->
    <b-row>
      <b-col lg="3">
      </b-col>
      <b-col lg="6" class="btn_lubo_tijiao">
        <b-input-group>
          <b-input-group-prepend is-text><b style="width: 118px;">系统重启时间</b></b-input-group-prepend>
          <b-form-input type="text" v-model.trim="rebootTimeData" placeholder="格式22:00:00"></b-form-input>
        </b-input-group>
        <br>
        <b-button variant="outline-success" @click="rebootTimeInfoCommit()">提 交</b-button>
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
      rebootTimeData: '',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    rebootInfo () {
      var _this = this
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/rebootTime',
        params: param
      }).then(function (response) {
        console.log('=======doorSeting=============' + JSON.stringify(response.data))
        _this.rebootTimeData = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    rebootTimeInfoCommit () {
      var _this = this
      var param = {
        rebootTime: _this.rebootTimeData
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataRebootTime',
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
          alert('修改失败')
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
