import Vue from 'vue'
import VueRouter from 'vue-router'
import People from '../views/People.vue'
import Stories from '../views/Stories.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: People
  },
  {
    path: '/admin',
    name: 'admin',
    component: Stories
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router