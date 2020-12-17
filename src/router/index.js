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
    path: '/',
    name: 'Login',
    component: Login
  }, {
    path: '/connect',
    name: 'Connect',
    component: Connect
  }
]

const router = new Router({
  routes
})

export default router
