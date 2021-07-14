<template>
  <div>
    <b-button class="btn_tijiao" variant="outline-success" @click="addIcdata()">添 加</b-button>
    <br><br>
    <b-table striped hover :items="icList" :fields="fields" :current-page="currentPage" :per-page="perPage">
      <template v-slot:cell(index)="datas">{{ datas.index + 1 }}</template>
      <template v-slot:cell(card_no)="datas">{{ datas.item.card_no.substring(0,5) }}******</template>
      <template v-slot:cell(actives)="datas">
        <b-button size="sm" variant="outline-primary" @click="fixIC(datas.item)" class="mr-1">修改</b-button>
        <b-button size="sm" variant="outline-danger" @click="deleteIC(datas.item)" class="mr-1">删除</b-button>
      </template>
    </b-table>
    <b-pagination v-model="currentPage" :total-rows="count" :per-page="perPage" align="center"></b-pagination>
    <b-modal id="IcDeletemodal" title="提示" size="sm" @ok="deleteICCommit" cancel-title="取消" ok-title="确定">
      <h6 class="btn_lubo_tijiao h_color">你确定删除吗 !!!</h6>
    </b-modal>
    <b-modal id="icmodal" title="用户信息" @ok="addICCommit" cancel-title="取消" ok-title="确定">
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">工号</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="icWorknum" placeholder="请输入工号"></b-form-input>
      </b-input-group>
      <br>
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">老师名称</b></b-input-group-prepend>
        <b-form-input type="text" v-model.trim="icTname" placeholder="请输入老师名称"></b-form-input>
      </b-input-group>
      <br>
      <b-input-group>
        <b-input-group-prepend is-text><b style="width: 118px;">卡号</b></b-input-group-prepend>
        <b-form-input type="number" v-model.trim="ic_numer" placeholder="请输入卡号"></b-form-input>
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
      icList: [],
      fields: [
        { key: 'index', label: '序号', class: 'text-center' },
        { key: 'workNum', label: '工号', sortable: true, class: 'text-center' },
        { key: 'name', label: '老师名称', class: 'text-center' },
        { key: 'card_no', label: '卡号', class: 'text-center' },
        { key: 'actives', label: '操作', class: 'text-center' }
      ],
      icWorknum: '',
      icTname: '',
      ic_numer: '',
      perPage: 10,
      currentPage: 1,
      count: 1,
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    icListInfo () {
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken')
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'get',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/ic_list_data',
        params: param
      }).then(function (response) {
        console.log('=======ic=============' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.icList = response.data.data
          _this.count = _this.icList.length
          _this.currentPage = 1
        } else {
          alert(response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    addIcdata () {
      this.icId = null
      this.icWorknum = ''
      this.icTname = ''
      this.ic_numer = ''
      this.$root.$emit('bv::show::modal', 'icmodal')
    },
    fixIC (item) {
      console.log('==========fixIC==========' + JSON.stringify(item))
      this.icId = item.cardNumId
      this.icWorknum = item.workNum
      this.icTname = item.name
      this.ic_numer = item.card_no
      this.$root.$emit('bv::show::modal', 'icmodal')
    },
    deleteIC (item) {
      console.log('==========deleteIC==========' + JSON.stringify(item))
      this.icId = item.cardNumId
      this.$root.$emit('bv::show::modal', 'IcDeletemodal')
    },
    deleteICCommit () {
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken'),
        ic_id: _this.icId
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/delete_ic_data',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======deleteICCommit======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.icList = response.data.data
          _this.count = _this.icList.length
          _this.currentPage = 1
        } else {
          alert('失败,' + response.data.message)
        }
      }).catch(function (error) {
        alert(error)
      })
    },
    addICCommit () {
      if (this.ic_numer === '' || this.icWorknum === '' || this.icTname === '') {
        alert('请输入工号,老师名称,卡号')
        return
      }
      if (this.ic_numer.length !== 10) {
        alert('请输入10位数字卡号')
        return
      }
      var _this = this
      var param = {
        login_user_name: localStorage.getItem('userName'),
        lh_zks_token: localStorage.getItem('usertoken'),
        ic_id: _this.icId,
        ic_num: _this.ic_numer,
        work_number: _this.icWorknum,
        admin_name: _this.icTname
      }
      var sign = apply.appSign(param) // 添加签名
      param.sign = sign
      axios({
        method: 'post',
        url: 'http://' + localStorage.getItem('zhongkongIP') + ':8099/api/add_ic_data',
        data: param,
        transformRequest: [function (data, headers) {
          console.log('===headers=====：' + JSON.stringify(headers))
          return Qs.stringify(data)
        }]
      }).then(function (response) {
        console.log('=======addICCommit======提交=======' + JSON.stringify(response.data))
        if (response.data.success) {
          _this.icList = response.data.data
          _this.count = _this.icList.length
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
