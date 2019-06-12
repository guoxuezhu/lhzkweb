<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="success" class="titleAppbar titleheight">
      <b-navbar-brand href="#">力弘智慧教育</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template slot="button-content"><em>{{username}}</em></template>
            <b-dropdown-item v-show="ifShow"　@click="backbtn" >首页</b-dropdown-item>
            <b-dropdown-item @click="loginOut" >退出</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import Bmob from 'hydrogen-js-sdk'
export default {
  name: 'Connect',
  created () {
    this.loginInfo()
  },
  data () {
    return {
      username: localStorage.getItem('userName'),
      zkIP: ''
    }
  },
  computed: {
    ifShow () {
      if (this.$route.path === '/connect') {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    loginInfo () {
      console.log('=======navbar======' + localStorage.getItem('zhongkongIP'))
      if (localStorage.getItem('zhongkongIP') !== '' && localStorage.getItem('zhongkongIP') !== null) {
        this.username = localStorage.getItem('userName') + '(' + localStorage.getItem('zhongkongIP') + ')'
      } else {
        this.username = localStorage.getItem('userName')
      }
    },
    loginOut () {
      localStorage.setItem('zhongkongIP', '')
      Bmob.User.logout()
      this.$router.push({path: '/login'})
    },
    backbtn () {
      localStorage.setItem('zhongkongIP', '')
      this.$router.push({path: '/connect'})
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
</style>
