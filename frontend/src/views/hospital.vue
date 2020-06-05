<template>
  <div class="registerHospital">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> TODO: Hier wird der Patient im Krankenhaus angemeldet</h1>
    <MissionReport/>
    <patHospital/>
  </div>
</template>

<script>
// @ is an alias to /src
import MissionReport from '@/components/MissionReport.vue'
import patHospital from '@/components/patHospital.vue'

export default {
  name: 'missionOverview',
  components: {
    MissionReport,
    patHospital
  }
}
</script>