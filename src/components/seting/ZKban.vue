<template>
  <div>
    <br><br>
    <b-button @click="btnSendMsg('SKJAA')" v-b-popover.hover.right="'没有卡的时候可以控制操作面板进入控制界面'"
      variant="outline-success">启动操作面板</b-button>
    <b-button @click="wsdDatadao()" variant="outline-success">温湿度数据</b-button>
    <b-button @click="dnbDatadao()" variant="outline-success">电能表数据</b-button>
    <b-button @click="deviceDatadao()" variant="outline-success">设备状态数据</b-button>
    <br><br>
    <div class="borde_1">
      <b>视频一键全切</b>
      <br><br>
      <b-button @click="btnSendMsg('VIDC7')" variant="outline-success" class="vid_btn">录播</b-button>
      <b-button @click="btnSendMsg('VIDC8')" variant="outline-success" class="vid_btn">电脑</b-button>
      <b-button @click="btnSendMsg('VIDC0')" variant="outline-success" class="vid_btn">老师投屏</b-button>
      <b-button @click="btnSendMsg('VIDC1')" variant="outline-success" class="vid_btn">小组一</b-button>
      <b-button @click="btnSendMsg('VIDC2')" variant="outline-success" class="vid_btn">小组二</b-button>
      <b-button @click="btnSendMsg('VIDC3')" variant="outline-success" class="vid_btn">小组三</b-button>
      <b-button @click="btnSendMsg('VIDC4')" variant="outline-success" class="vid_btn">小组四</b-button>
      <b-button @click="btnSendMsg('VIDC5')" variant="outline-success" class="vid_btn">小组五</b-button>
      <b-button @click="btnSendMsg('VIDC6')" variant="outline-success" class="vid_btn">小组六</b-button>
    </div>
    <br>
    <div class="borde_1">
      <b>录播</b>
      <br><br>
      <b-button @click="btnSendMsg('LUB1')" variant="outline-success" class="vid_btn">开始</b-button>
      <b-button @click="btnSendMsg('LUB2')" variant="outline-success" class="vid_btn">暂停</b-button>
      <b-button @click="btnSendMsg('LUB3')" variant="outline-success" class="vid_btn">停止</b-button>
      <b-button @click="btnSendMsg('LUB4')" variant="outline-success" class="vid_btn">直播</b-button>
    </div>
    <br>
    <div class="borde_1">
      <b-button @click="btnSendMsg('MBS1')" variant="outline-success" class="vid_btn">上课</b-button>
      <b-button @click="btnSendMsg('MBS2')" variant="outline-success" class="vid_btn">下课</b-button>
      <br><br>
      <b-button @click="btnSendMsg('MBS13')" variant="outline-success" class="vid_btn">灯光开</b-button>
      <b-button @click="btnSendMsg('MBS3')" variant="outline-success" class="vid_btn">窗帘开</b-button>
      <b-button @click="btnSendMsg('MBS9')" variant="outline-success" class="vid_btn">投影机开</b-button>
      <b-button @click="btnSendMsg('MBS11')" variant="outline-success" class="vid_btn">幕布升</b-button>
      <b-button @click="btnSendMsg('MBS39')" variant="outline-success" class="vid_btn">空调开</b-button>
      <br><br>
      <b-button @click="btnSendMsg('MBS14')" variant="outline-success" class="vid_btn">灯光关</b-button>
      <b-button @click="btnSendMsg('MBS4')" variant="outline-success" class="vid_btn">窗帘关</b-button>
      <b-button @click="btnSendMsg('MBS10')" variant="outline-success" class="vid_btn">投影机关</b-button>
      <b-button @click="btnSendMsg('MBS12')" variant="outline-success" class="vid_btn">幕布降</b-button>
      <b-button @click="btnSendMsg('MBS40')" variant="outline-success" class="vid_btn">空调关</b-button>
      <br><br>
      <b-button @click="btnSendMsg('MBS8001')" variant="outline-success" class="vid_btn">电风扇关</b-button>
      <b-button @click="btnSendMsg('MBS8002')" variant="outline-success" class="vid_btn">风速1级</b-button>
      <b-button @click="btnSendMsg('MBS8003')" variant="outline-success" class="vid_btn">风速2级</b-button>
      <b-button @click="btnSendMsg('MBS8004')" variant="outline-success" class="vid_btn">风速3级</b-button>
      <b-button @click="btnSendMsg('MJD46')" variant="outline-success" class="vid_btn">门禁</b-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
import Qs from 'qs'
export default {
  created () {
    console.log('=========控制面板===========')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    wsdDatadao () {
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/get_datadao_wsd',
        params: param
      }).then(function (response) {
        console.log('=======wsdDatadao=============' + JSON.stringify(response.data))
      }).catch(function (error) {
        alert(error)
      })
    },
    dnbDatadao () {
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/get_datadao_dnb',
        params: param
      }).then(function (response) {
        console.log('=======dnbDatadao=============' + JSON.stringify(response.data))
      }).catch(function (error) {
        alert(error)
      })
    },
    deviceDatadao () {
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/deviceStatus',
        params: param
      }).then(function (response) {
        console.log('=======deviceDatadao=============' + JSON.stringify(response.data))
      }).catch(function (error) {
        alert(error)
      })
    },
    btnSendMsg (btnmsg) {
      var param = {
        login_user_name: localStorage.getItem('userName'),
        zkbtn: btnmsg
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/zkczbtn',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======提交======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          alert('成功')
        } else {
          alert('失败,' + response.data.message)
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
.vid_btn {
  width: 100px;
  margin-left: 10px;
}
.borde_1 {
  border: 1px solid #0000FF;
  padding: 30px;
  text-align: center;
}
</style>
