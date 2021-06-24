import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'

import NotFound from '../errors/404.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/Upload', component: Upload },
  { path: '*', component: NotFound },
]

export default new VueRouter({
  routes // short for `routes: routes`
})
