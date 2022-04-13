import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UsersView from '../views/UsersView.vue'
import UserView from '../views/UserView.vue'
import WebsitesView from '../views/WebsitesView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/users',
    name: 'Users',
    component: UsersView
  },
  {
    path: '/user/:username',
    name: 'User',
    component: UserView
  },
  {
    path: '/websites',
    name: 'Websites',
    component: WebsitesView
  }
]

const router = new VueRouter({
  routes
})

export default router
