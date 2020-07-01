<template>
  <div class="patientInfos">
    <img alt="Vue logo" src="../assets/logo.png">
    <input v-model="aktMission.patientenID" placeholder="PatientenID" />
    <button @click="getPatient(aktMission.patientenID)">Patientenakte abfragen</button>
    <div class="krankenList">
      <OnePatient v-for="patient in krankenakte" :krankenakte="patient" :key="patient.datum"/>
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