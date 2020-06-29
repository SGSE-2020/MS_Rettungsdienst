<template>
  <div class="missionReport">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> TODO: Hier wird der Einsatzbericht geschrieben</h1>
    <MissionReport/>
    <closeMission/>
    <registerHospital/>
    <deadPerson/>
  </div>
</template>

<script>
// @ is an alias to /src
import MissionReport from '@/components/MissionReport.vue'
import closeMission from '@/components/closeMission.vue'
import registerHospital from '@/components/registerHospital.vue'
import deadPerson from '@/components/personDead.vue'

export default {
  name: 'missionOverview',
  components: {
    MissionReport,
    closeMission,
    registerHospital,
    deadPerson
  }
}
</script>