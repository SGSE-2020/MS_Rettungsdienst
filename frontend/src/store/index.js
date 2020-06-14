import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    aktUser:{
      uid: null,
      email: null,
      name:null,
      role: 0,
    },
    aktMission: {
      _id: null,
      patientenID: null,
      adresse: null,
      einsatzbegin: null,
      einsatzende: null,
      sanitater: null,
      symptome: null,
      medikamente: null,
      diagnose: null
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
    },
    missions: {
      all: []
    },
    paramedics: {
      all: ['1234', '5678', '1212']
    }
  },
  mutations: {
    setMisID: (state, payload) => { state.aktMission._id = payload },
    setPatiID: (state, payload) => { state.aktMission.patientenID = payload },
    setAdres: (state, payload) => { state.aktMission.adresse = payload },
    setMisBeg: (state, payload) => { state.aktMission.einsatzbegin = payload },
    setMisEnd: (state, payload) => { state.aktMission.einsatzende = payload },
    setSani: (state, payload) => { state.aktMission.sanitater = payload },
    setSymp: (state, payload) => { state.aktMission.symptome = payload },
    setMedi: (state, payload) => { state.aktMission.medikamente = payload },
    setDiag: (state, payload) => { state.aktMission.diagnose = payload },
    setAktMis: (state, payload) => { state.aktMission = payload },
    setUid:(state, payload) => { state.aktUser.uid = payload },
    setUmail:(state, payload) => { state.aktUser.email = payload },
    setUname:(state, payload) => { state.aktUser.name = payload },
    setUrole:(state, payload) => { state.aktUser.role = payload },
  },
  actions: {
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
    setDiagnose: (context, payload) => {
      context.commit('setDiag', payload)
    },
    setAktMiss: (context, payload) => {
      context.commit('setAktMis', payload)
    },
    setUserId: (context, payload) => {
      context.commit('setUid', payload)
    },
    setUserMail: (context, payload) => {
      context.commit('setUmail', payload)
    },
    setUserName: (context, payload) => {
      context.commit('setUname', payload)
    },
    setUserRole: (context, payload) => {
      context.commit('setUrole', payload)
    },
    socket_newMission(context, mission) {
      context.commit('setAktMis', mission)
    },
    emitCreateMission(context, sanitater) {
      context.commit('setSani', sanitater)
      this._vm.$socket.client.emit('Create', context.state.aktMission);
    },
    socket_endMission(context, payload) {
      context.commit('setAktMis', payload)
    },
    emitEndMission(context) {
      this._vm.$socket.client.emit('End', context.state.aktMission);
    }
  },
  modules: {
  }
})

export const mutations = {
  setMisID: (state, payload) => { state.aktMission._id = payload },
}
