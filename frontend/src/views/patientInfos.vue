<template>
  <div class="patientInfos">
    <h1>Patientenakte</h1>
    <input v-model="aktMission.patientenID" placeholder="PatientenID" />
    <button class="btn-create" @click="getPatient(aktMission.patientenID)">Patientenakte abfragen</button>
    <div class="krankenList">
      <OnePatient v-for="patient in krankenakte" :krankenakte="patient" :key="patient.datum"/>
    </div>
    <div class="Naviga">
    <button class="btn-create" @click="$router.push('missionReport')">Zum Einsatzbericht</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OnePatient from '@/components/onePatient.vue'
import { mapState } from "vuex";

export default {
  name: 'patientInfo',
  data: function() {
    return {
      krankenakte: [],
    };
  },
  computed: mapState(["aktMission"]),
  methods: {
    getPatient(payload){
      console.log(payload)
        this.$socket.client.emit('getPatientInfo', payload)
      }
    },
  sockets: {
    getPatient: function(data){
      console.log(data)
      this.krankenakte = data.patientenakte;
    }
  },
  components: {
    OnePatient
  }
}
</script>

<style scoped>
.btn-create {
  background-color: #009900; 
  color: #ffffff; 
  border: none; 
  padding: 10px; 
  text-align: center; 
  font-size: 16px; 
  margin: 5pt;
}
</style>