<template>
  <div>
    <b-button class="btn_tijiao" variant="outline-success" @click="addWgdata()">添 加</b-button>
    <br><br>
    <b-table striped hover :items="wgList" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="wg_status" slot-scope="datas">
        <p v-if="datas.item.wg_status === 1" >启用</p>
        <p v-else class="h_color">禁用</p>
      </template>
      <template slot="actives" slot-scope="datas">
        <b-button size="sm" variant="outline-primary" @click="fixWg(datas.item)" class="mr-1">修改</b-button>
        <b-button size="sm" variant="outline-danger" @click="deletewg(datas.item)" class="mr-1">删除</b-button>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center"></b-pagination>
    <b-modal id="WgDeletemodal" title="提示" size="sm" @ok="deleteWgCommit" cancel-title="取消" ok-title="确定">
      <h6 class="btn_lubo_tijiao h_color">你确定删除吗 !!!</h6>
    </b-modal>
    <b-modal id="wgmodal" title="用户信息" @ok="addWGCommit" cancel-title="取消" ok-title="确定">
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">网关 ID</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="web_wg_id" placeholder="请输入网关ID(1-100)"></b-form-input>
      </b-input-group>
      <br>
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">网关 IP</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="web_wg_ip" placeholder="请输入网关IP"></b-form-input>
      </b-input-group>
      <br>
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">网关端口</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="web_wg_port" placeholder="请输入网关端口"></b-form-input>
      </b-input-group>
      <br>
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">是否启用</b></b-input-group-prepend>
        <b-form-select v-model="web_wg_status" :options="wgStatusOptions"></b-form-select>
      </b-input-group>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
import Qs from 'qs'
export default {
  data () {
    return {
      wgList: [],
      fields: [
        { key: 'wg_id', label: '网关ID', sortable: true, class: 'text-center' },
        { key: 'wg_ip', label: '网关IP', class: 'text-center' },
        { key: 'wg_port', label: '网关端口', class: 'text-center' },
        { key: 'wg_status', label: '是否启用', class: 'text-center' },
        { key: 'actives', label: '操作', class: 'text-center' }
      ],
      web_wg_id: '',
      web_wg_ip: '',
      web_wg_port: '',
      web_wg_status: 0,
      wgStatusOptions: [
        { value: 1, text: '启用' },
        { value: 0, text: '禁用' }
      ],
      perPage: 10,
      currentPage: 1,
      count: 1,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    wgkzqInfo () {
      var _this = this
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/wgkzqInfo',
        params: param
      }).then(function (response) {
        console.log('=======wgkzqInfo=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.wgList = response.data.data
          _this.count = _this.wgList.length
          _this.currentPage = 1
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    addWgdata () {
      this.wgId = null
      this.web_wg_id = ''
      this.web_wg_ip = ''
      this.web_wg_port = ''
      this.web_wg_status = 0
      this.$root.$emit('bv::show::modal', 'wgmodal')
    },
    fixWg (item) {
      console.log('==========fixWg==========' + JSON.stringify(item))
      this.wgId = item.wg_id
      this.web_wg_id = item.wg_id
      this.web_wg_ip = item.wg_ip
      this.web_wg_port = item.wg_port
      this.web_wg_status = item.wg_status
      this.$root.$emit('bv::show::modal', 'wgmodal')
    },
    deletewg (item) {
      console.log('==========deletewg==========' + JSON.stringify(item))
      this.wgId = item.wg_id
      this.$root.$emit('bv::show::modal', 'WgDeletemodal')
    },
    deleteWgCommit () {
      var _this = this
      var param = {
        wg_id: _this.wgId
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/deleteWgkzqInfo',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======deleteWgCommit======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.wgList = response.data.data
          _this.count = _this.wgList.length
          _this.currentPage = 1
        } else {
          alert('失败,' + response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    addWGCommit () {
      if (this.web_wg_id === '' || this.web_wg_ip === '' || this.web_wg_port === '') {
        alert('请输入网关ID,网关IP,网关端口')
        return
      }
      var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
      if (reg.test(this.web_wg_ip) === false) {
        alert('输入的IP地址不合法')
        return
      }
      if (this.wgId === null) {
        this.wgId = this.web_wg_id
      }
      var _this = this
      var param = {
        wg_id: _this.wgId,
        wg_ip: _this.web_wg_ip,
        wg_port: _this.web_wg_port,
        wg_status: _this.web_wg_status
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/updataWgkzqInfo',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======addWGCommit======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.wgList = response.data.data
          _this.count = _this.wgList.length
          _this.currentPage = 1
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
.btn_tijiao {
  float: right;
}
.btn_lubo_tijiao {
  text-align: center;
}
.h_color {
  color: red;
}
</style>
