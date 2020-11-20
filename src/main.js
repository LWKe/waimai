import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import './filters'
import { Button } from 'mint-ui'

//加载mockServer
import './mock/mockServer'

Vue.config.productionTip = false
Vue.component(Button.name, Button)

new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')