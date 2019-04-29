import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

const routes = [
  {
    path: '/connect',
    name: 'HelloWorld',
    component: HelloWorld
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new Router({
  routes
})

export default router
