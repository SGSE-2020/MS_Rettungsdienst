import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
// import SocketIO from "socket.io-client"

Vue.config.productionTip = false

Vue.use(VueSocketIO, 'http://localhost:3000', store)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
