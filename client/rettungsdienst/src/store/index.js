import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: 0,
    aktMission: {
      einsatzID: null,
      patientenID: null,
      adresse: null,
      einsatzbegin: null,
      einsatzende: null,
      sanitater: null,
      symptome: null,
      medikamente: null,
    },
    aktPatient: {
      akteID: "Testakte",
      patID: "Testpatient",
      datum: "33.20.2837",
      anamnese: "vorhanden",
      symptome: "kotzen",
      diagnose: "corona",
      medikation: "nicht vorhanden",
      psychisch: "nein",
      sonstiges: "nicht vorhanden"
    }
  },
  mutations: {
    increment: state => state.role++,
    decrement: state => state.role--,
    setMisID: ( state, payload) => { state.aktMission.einsatzID = payload},
    setPatiID: (state, payload) => {state.aktMission.patientenID = payload},
    setAdres: (state, payload) => {state.aktMission.adresse = payload},
    setMisBeg: (state, payload) => {state.aktMission.einsatzbegin = payload},
    setMisEnd: (state, payload) => {state.aktMission.einsatzende = payload},
    setSani: (state, payload) => {state.aktMission.sanitater = payload},
    setSymp: (state, payload) => {state.aktMission.symptome = payload},
    setMedi: (state, payload) => {state.aktMission.medikamente = payload},  
    setAktMis: (state, payload) => {state.aktMission = payload}
  },
  actions: {
    increment () {
      this.commit('increment')
    },
    decrement () {
      this.commit('decrement')
    },
    setMissID: (context, payload) => {
      context.commit('setMisID', payload)
    },
    setAdress: (context, payload) => {
      context.commit('setAdres', payload)
    },
    setMissBeg: (context, payload) => {
      context.commit('setMisBeg', payload)
    },
    setMissEnd: (context, payload) => {
      context.commit('setMisEnd', payload)
    },
    setSanitaeter: (context, payload) => {
      context.commit('setSani', payload)
    },
    setSymptome: (context, payload) => {
      context.commit('setSymp', payload)
    },
    setMedikamente: (context, payload) => {
      context.commit('setMedi', payload)
    },
    setAktMiss: (context, payload) => {
      context.commit('setAktMis', payload)
    },
  },
  modules: {
  }
})
