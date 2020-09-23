import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../views/Miste/Miste.vue'
import Order from '../views/Order/Order.vue'
import Profile from '../views/Profile/Profile.vue'
import Search from '../views/Search/Search.vue'
Vue.use(VueRouter)

// 组建规则
const routes = [
  { path: '/', redirect: '/miste' },
  { path: '/miste', component: Msite },
  { path: '/order', component: Order },
  { path: '/profile', component: Profile },
  { path: '/search', component: Search }
]

const router = new VueRouter({
  routes
})

export default router
