<template>
  <div>
    <b-container>
      <b-row>
        <b-col lg="3">
          <b-input-group prepend="波特率">
            <b-form-select v-model="baudrateSelected" :options="baudrateOptions"></b-form-select>
          </b-input-group>
        </b-col>
        <b-col lg="3">
          <b-input-group prepend="校验位">
            <b-form-select v-model="checkoutBitSelected" :options="checkoutBitOptions"></b-form-select>
          </b-input-group>
        </b-col>
        <b-col lg="3">
          <b-input-group prepend="数据位">
            <b-form-select v-model="dataBitSelected" :options="dataBitOptions"></b-form-select>
          </b-input-group>
        </b-col>
        <b-col lg="3">
          <b-input-group prepend="停止位">
            <b-form-select v-model="stopBitSelected" :options="stopBitOptions"></b-form-select>
          </b-input-group>
        </b-col>
      </b-row>
    </b-container>
    <br>
    <div v-for="command in commandList" :key="command.commandId">
      <b-input-group >
        <b-input-group-prepend is-text><b style="width: 118px;">{{command.commandId}}</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="command.commandName" placeholder="请输入命令名称"></b-form-input>
        <b-form-input type="text" v-model.trim="command.commandStr" placeholder="请输入命令"></b-form-input>
      </b-input-group>
      <br>
    </div>
    <b-form-group>
      <b-form-radio-group v-model="jinzhiSelected" :options="jinzhiOptions" name="radio-inline"></b-form-radio-group>
    </b-form-group>
    <b-button variant="outline-success">提交</b-button>
    <br><br>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
export default {
  created () {
    console.log('=========Sport=====created======')
    // this.getBaseInfo()
  },
  data () {
    return {
      jinzhiSelected: 0,
      jinzhiOptions: [
        { value: 0, text: '十六进制' },
        { value: 1, text: '十进制' }
      ],
      baudrateSelected: 3,
      baudrateOptions: [
        { value: 0, text: '1200' },
        { value: 1, text: '2400' },
        { value: 2, text: '4800' },
        { value: 3, text: '9600' },
        { value: 4, text: '19200' },
        { value: 5, text: '38400' },
        { value: 6, text: '57600' },
        { value: 7, text: '115200' }
      ],
      checkoutBitSelected: 0,
      checkoutBitOptions: [
        { value: 0, text: 'NONE' },
        { value: 1, text: 'ODD' },
        { value: 2, text: 'EVEN' },
        { value: 3, text: 'MAAR' },
        { value: 4, text: 'SPACE' }
      ],
      dataBitSelected: 0,
      dataBitOptions: [
        { value: 0, text: '8' },
        { value: 1, text: '7' },
        { value: 2, text: '6' },
        { value: 3, text: '5' }
      ],
      stopBitSelected: 0,
      stopBitOptions: [
        { value: 0, text: '1' },
        { value: 1, text: '1.5' },
        { value: 2, text: '2' }
      ],
      commandList: [
        { commandId: '1-101', commandName: '投影机开', commandStr: 'sdfegadgtssfa' },
        { commandId: '1-102', commandName: '投影机关', commandStr: 'sdfegaa122adgtssfa' },
        { commandId: '1-103', commandName: '', commandStr: '' },
        { commandId: '1-104', commandName: '', commandStr: '' },
        { commandId: '1-105', commandName: '', commandStr: '' },
        { commandId: '1-106', commandName: '', commandStr: '' },
        { commandId: '1-107', commandName: '', commandStr: '' },
        { commandId: '1-108', commandName: '', commandStr: '' },
        { commandId: '1-109', commandName: '', commandStr: '' },
        { commandId: '1-110', commandName: '', commandStr: '' },
        { commandId: '1-111', commandName: '', commandStr: '' }
      ],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    getSportInfo (spnumer) {
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8089/api/baseInfo',
        params: param
      }).then(function (response) {
        console.log('=======连接=============' + JSON.stringify(response))
      }).catch(function (error) {
        alert(error)
      })
    },
    clicktest (eventmsg) {
      console.log('=========clicktest=====Sport======' + eventmsg)
    }
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
