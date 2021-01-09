<template>
  <div>
    <b-button class="btn_tijiao" variant="outline-success" @click="addUseradmin()">添 加</b-button>
    <br><br>
    <b-table striped hover :items="userList" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template slot="index" slot-scope="datas">
        {{ datas.index + 1 }}
      </template>
      <template slot="userPaw" slot-scope="datas">******</template>
      <template slot="user_status" slot-scope="datas">
        <p v-if="datas.item.user_status === 1" >正常</p>
        <p v-else class="h_color">锁定</p>
      </template>
      <template slot="actives" slot-scope="datas">
        <b-button size="sm" variant="outline-primary" @click="fixUser(datas.item)" class="mr-1">修改</b-button>
        <b-button size="sm" variant="outline-danger" @click="deleteUser(datas.item)" class="mr-1">删除</b-button>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center"></b-pagination>
    <b-modal id="deletemodal" title="提示" size="sm" @ok="deleteUserCommit" cancel-title="取消" ok-title="确定">
      <h6 class="btn_lubo_tijiao h_color">你确定删除吗 !!!</h6>
    </b-modal>
    <b-modal id="usermodal" title="用户信息" @ok="addUserCommit" cancel-title="取消" ok-title="确定">
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">用户名</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="etuserName" placeholder="请输入用户名"></b-form-input>
      </b-input-group>
      <br>
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">密码</b></b-input-group-prepend>
        <b-form-input type="password" v-model.trim="etuserPaw1" placeholder="请输入密码"></b-form-input>
      </b-input-group>
      <br>
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">再次输入密码</b></b-input-group-prepend>
        <b-form-input type="password" v-model.trim="etuserPaw2" placeholder="请再次输入密码"></b-form-input>
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
      userList: [],
      fields: [
        { key: 'index', label: '序号', class: 'text-center' },
        { key: 'username', label: '用户名', sortable: true, class: 'text-center' },
        { key: 'userPaw', label: '密码', class: 'text-center' },
        { key: 'user_status', label: '状态', class: 'text-center' },
        { key: 'actives', label: '操作', class: 'text-center' }
      ],
      etuserName: '',
      etuserPaw1: '',
      etuserPaw2: '',
      perPage: 10,
      currentPage: 1,
      count: 1,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    userlistInfo () {
      var _this = this
      var param = {}
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/user_list_admin',
        params: param
      }).then(function (response) {
        console.log('=======用户=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.userList = response.data.data
          _this.count = _this.userList.length
          _this.currentPage = 1
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    addUseradmin () {
      this.userId = null
      this.etuserName = ''
      this.etuserPaw1 = ''
      this.etuserPaw2 = ''
      this.$root.$emit('bv::show::modal', 'usermodal')
    },
    fixUser (item) {
      console.log('==========fixUser==========' + JSON.stringify(item))
      this.userId = item.id
      this.etuserName = item.username
      this.etuserPaw1 = item.userPaw
      this.etuserPaw2 = item.userPaw
      this.$root.$emit('bv::show::modal', 'usermodal')
    },
    deleteUser (item) {
      console.log('==========deleteUser==========' + JSON.stringify(item))
      this.userId = item.id
      this.$root.$emit('bv::show::modal', 'deletemodal')
    },
    deleteUserCommit () {
      var _this = this
      var param = {
        user_id: _this.userId
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/delete_user_admin',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======deleteUserCommit======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.userList = response.data.data
          _this.count = _this.userList.length
          _this.currentPage = 1
        } else {
          alert('失败,' + response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    addUserCommit () {
      if (this.etuserName === '' || this.etuserPaw1 === '' || this.etuserPaw2 === '') {
        alert('请输入用户名,密码')
        return
      }
      if (this.etuserPaw1 !== this.etuserPaw2) {
        alert('两次输入密码不一致')
        return
      }
      var _this = this
      var param = {
        user_id: _this.userId,
        user_name: _this.etuserName,
        user_password: _this.etuserPaw1
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/add_user_admin',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======addUserCommit======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.userList = response.data.data
          _this.count = _this.userList.length
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
