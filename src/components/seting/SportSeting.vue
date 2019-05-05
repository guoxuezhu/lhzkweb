<template>
  <div>
    <b-tabs content-class="mt-3" v-model="tabIndex">
      <b-tab title="串口１" @click="tabSport(1)">
        <Sport ref="childSport"></Sport>
      </b-tab>
      <b-tab title="串口２" @click="tabSport(2)">
        <Sport ref="childSport"></Sport>
      </b-tab>
      <b-tab title="串口３" @click="tabSport(3)">
        <Sport ref="childSport"></Sport>
      </b-tab>
      <b-tab title="串口４" @click="tabSport(4)">
        <Sport ref="childSport"></Sport>
      </b-tab>
      <b-tab title="串口５" @click="tabSport(5)">
        <Sport ref="childSport"></Sport>
      </b-tab>
      <b-tab title="串口６" @click="tabSport(6)">
        <Sport ref="childSport"></Sport>
      </b-tab>
      <b-tab title="串口７" @click="tabSport(7)">
        <Sport ref="childSport"></Sport>
      </b-tab>
      <b-tab title="串口８" @click="tabSport(8)">
        <Sport ref="childSport"></Sport>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import axios from 'axios'
import apply from '../../api/apply.js'
import Sport from '../smcomponents/Sport.vue'
export default {
  components: {
    Sport
  },
  created () {
    console.log('=========SportSeting===========')
  },
  data () {
    return {
      tabIndex: 0
    }
  },
  methods: {
    sportInfo (spnumer) {
      this.tabIndex = 0
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
    tabSport (portNum) {
      this.$refs.childSport.getSportInfo(portNum)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
