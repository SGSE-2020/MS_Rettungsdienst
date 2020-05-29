import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: 0,
  },
  mutations: {
    increment: state => state.role++,
    decrement: state => state.role--
  },
  actions: {
    increment () {
      this.commit('increment')
    },
    decrement () {
      this.commit('decrement')
    }
  },
  modules: {
  }
})
