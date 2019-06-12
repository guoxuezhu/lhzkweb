<template>
  <div>
    <MyNavbar></MyNavbar>
    <br><br><br><br>
    <b-row>
      <b-col cols="1"></b-col>
      <b-col cols="10">
        <b-button class="btn_tijiao" variant="outline-success" @click="addShowModal" >添 加</b-button>
        <br><br>
        <b-table striped hover :fields="fields" :items="items">
          <template slot="isActive" slot-scope="item">
            <b-btn variant="outline-success" size="sm" @click="etzhongkong(item.item)" >修改</b-btn>
            <b-btn variant="outline-danger" size="sm" @click="delectOk(item.item)" >删除</b-btn>
            <b-btn variant="outline-success" size="sm" @click="connect(item.item)" >管理</b-btn>
          </template>
        </b-table>
      </b-col>
      <b-col cols="1"></b-col>
    </b-row>
    <b-modal id="zkadd-modal" title="中控信息" cancel-title="关闭" ok-title="确定" @ok="addIPCommit">
      <b-row>
        <b-col sm="4">
          <label>教室：</label>
        </b-col>
        <b-col sm="8">
          <b-form-input type="text" v-model.trim="className" placeholder="请输入教室"></b-form-input>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col sm="4">
          <label>中控IP地址：</label>
        </b-col>
        <b-col sm="8">
          <b-form-input type="text" v-model.trim="zkIP" placeholder="请输入中控IP地址"></b-form-input>
        </b-col>
      </b-row>
    </b-modal>
    <b-modal id="delect-add-modal" title="提示信息" cancel-title="关闭" ok-title="确定" @ok="delectOkCommit">
      <h4 align="center">你确定要删除吗？</h4>
      <h6 align="center" style="color: #FF0000;">一旦删除将不会恢复</h6>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../api/apply.js'
import Bmob from 'hydrogen-js-sdk'
import MyNavbar from './MyNavbar.vue'
export default {
  name: 'Connect',
  created () {
    this.getlhzkInfo()
  },
  components: {
    MyNavbar
  },
  data () {
    return {
      fields: [
        { key: 'name', label: '教室' },
        { key: 'ip', label: '中控IP' },
        { key: 'createdAt', label: '创建时间' },
        { key: 'updatedAt', label: '修改时间' },
        { key: 'isActive', label: '操作' }
      ],
      items: [],
      seleId: '',
      username: localStorage.getItem('userName'),
      className: '',
      zkIP: ''
    }
  },
  methods: {
    etzhongkong (item) {
      console.log('=======etzhongkong======' + JSON.stringify(item))
      this.seleId = item.objectId
      this.className = item.name
      this.zkIP = item.ip
      this.$root.$emit('bv::show::modal', 'zkadd-modal')
    },
    addShowModal () {
      this.seleId = ''
      this.className = ''
      this.zkIP = ''
      this.$root.$emit('bv::show::modal', 'zkadd-modal')
    },
    getlhzkInfo () {
      var _this = this
      const query = Bmob.Query(localStorage.getItem('usertable'))
      query.equalTo('userName', '==', localStorage.getItem('userName'))
      query.find().then(res => {
        console.log('=======getlhzkInfo======' + JSON.stringify(res))
        _this.items = res
      }).catch(err => {
        console.log('err=' + JSON.stringify(err))
      })
    },
    addIPCommit () {
      var _this = this
      const query = Bmob.Query(localStorage.getItem('usertable'))
      if (this.seleId !== '') {
        query.set('id', _this.seleId)
      }
      query.set('name', _this.className)
      query.set('ip', _this.zkIP)
      query.set('userName', localStorage.getItem('userName'))
      query.save().then(res => {
        console.log('=======addIPCommit======' + JSON.stringify(res))
        _this.getlhzkInfo()
      }).catch(err => {
        console.log('err=' + JSON.stringify(err))
      })
    },
    delectOk (item) {
      this.seleId = item.objectId
      this.$root.$emit('bv::show::modal', 'delect-add-modal')
    },
    delectOkCommit () {
      var _this = this
      const query = Bmob.Query(localStorage.getItem('usertable'))
      query.destroy(_this.seleId).then(res => {
        console.log('=======delectOk======' + JSON.stringify(res))
        _this.getlhzkInfo()
      }).catch(err => {
        console.log('err=' + JSON.stringify(err))
      })
    },
    connect (item) {
      var _this = this
      localStorage.setItem('zhongkongIP', item.ip)
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/ipconnect',
        params: param
      }).then(function (response) {
        console.log('=======连接=============' + JSON.stringify(response.data))
        _this.$router.push({path: '/helloWorld'})
      }).catch(function (error) {
        console.log('error=' + JSON.stringify(error))
        alert('连接此中控失败')
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.borde_red {
  border: 1px solid red;
}
.titleAppbar {
  width: 100%;
  position: fixed;
  z-index: 1024;
}
.titleheight {
  height: 56px;
}
.btn_tijiao {
  float: right;
}
</style>
