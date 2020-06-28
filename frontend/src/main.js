import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HereMap from './components/HereMap'
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import firebase from 'firebase'

Vue.config.productionTip = false
const socket = io.connect('https://rettungsdienst.dvess.network', {path: "/api/socket.io"});

var config = {
  apiKey: "AIzaSyBvTg0_QrhEvQ9UeZPH8--E2JZ55KA_u_c",
  authDomain: "smart-city-ss2020.firebaseapp.com",
  databaseURL: "https://smart-city-ss2020.firebaseio.com",
  projectId: "smart-city-ss2020",
  storageBucket: "smart-city-ss2020.appspot.com",
  messagingSenderId: "957240233717"
};
firebase.initializeApp(config);

Vue.use(VueSocketIOExt, socket, {store})

new Vue({
  router,
  store,
  HereMap,
  render: h => h(App)
}).$mount('#app')
