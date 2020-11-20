import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../views/Miste/Miste.vue'
import Order from '../views/Order/Order.vue'
import Profile from '../views/Profile/Profile.vue'
import Search from '../views/Search/Search.vue'
import Login from '../views/Login/Login.vue'
import Shop from '../views/Shop/Shop.vue'
import ShopGoods from '../views/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../views/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../views/Shop/ShopRatings/ShopRatings.vue'
Vue.use(VueRouter)

// 组建规则
const routes = [
  { path: '/', redirect: '/miste' },
  { path: '/miste', component: Msite, meta: { Footer: true } },
  { path: '/order', component: Order, meta: { Footer: true } },
  { path: '/profile', component: Profile, meta: { Footer: true } },
  { path: '/search', component: Search, meta: { Footer: true } },
  { path: '/login', component: Login, meta: { Footer: false } },
  {
    path: '/shop', component: Shop, children: [
      { path: '/shop/goods', component: ShopGoods },
      { path: '/shop/ratings', component: ShopRatings },
      { path: '/shop/info', component: ShopInfo },
      { path: '', redirect: '/shop/goods' }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
