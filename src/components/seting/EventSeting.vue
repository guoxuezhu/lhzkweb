<template>
  <div>
    <b-button class="btn_tijiao" variant="outline-success" @click="EventInfoCommit()">提 交</b-button>
    <br><br>
    <div v-for="event in eventList" :key="event.id">
      <b-input-group >
        <b-input-group-prepend is-text><b style="width: 118px;">{{event.id}}</b></b-input-group-prepend>
        <b-input-group-prepend is-text><b style="width: 138px;">{{event.name}}</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="event.strMLs" placeholder="请输入操作指令"></b-form-input>
      </b-input-group>
      <br>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
export default {
  data () {
    return {
      eventList: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    eventInfo () {
      var _this = this
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/eventList',
        params: param
      }).then(function (response) {
        console.log('=======事件=============' + JSON.stringify(response.data))
        _this.eventList = response.data.data
      }).catch(function (error) {
        alert(error)
      })
    },
    EventInfoCommit () {
      var _this = this
      var param = {
        eventDatas: _this.eventList
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataEventInfo',
        params: param
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
.btn_tijiao {
  float: right;
}
</style>
