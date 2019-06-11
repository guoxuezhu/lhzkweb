// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from './http'
import store from './store/'
import Bmob from 'hydrogen-js-sdk'

Bmob.initialize('726c39426f2021d5288d57be47627cf2', 'c1c3ae47868bd8f53852e2bb0247ed22')
Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.prototype.Bmob = Bmob

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
