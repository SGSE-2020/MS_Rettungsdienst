<template>
  <div class="patientInfos">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="getPatient(aktMission)">Patientenakte abfragen</button>
    <div class="krankenList">
      <OnePatient v-for="patient in krankenakte" :krankenakte="patient" :key="patient.datum"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import OnePatient from '@/components/onePatient.vue'

export default {
  name: 'patientInfo',
  data: function() {
    return {
      krankenakte: [],
    };
  },
  methods: {
    getPatient(payload){
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