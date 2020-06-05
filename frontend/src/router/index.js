import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/missionReport',
    name: 'MissionReport',
    component: () => import('../views/missionReport.vue')
  },
  {
    path: '/patientInfos',
    name: 'PatientInfos',
    component: () => import('../views/patientInfos.vue')
  },
  {
    path: '/registerHospital',
    name: 'registerHospital',
    component: () => import('../views/hospital.vue')
  },
  {
    path: '/showWay',
    name: 'showWay',
    component: () => import('../views/showWay.vue')
  },
  {
    path: '/missionOverview',
    name: 'missionOverview',
    component: () => import('../views/MissionOverview.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
