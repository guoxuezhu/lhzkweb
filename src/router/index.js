import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Connect from '@/components/Connect'

Vue.use(Router)

const routes = [
  {
    path: '/helloWorld',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/connect',
    name: 'Connect',
    component: Connect
  }
]

const router = new Router({
  mode: 'history',
  routes
})

export default router
