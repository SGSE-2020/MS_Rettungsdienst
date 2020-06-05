<template>
  <div class="missionReport">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> TODO: Hier wird der Einsatzbericht geschrieben</h1>
    <MissionReport/>
    <closeMission/>
  </div>
</template>

<script>
// @ is an alias to /src
import MissionReport from '@/components/MissionReport.vue'
import closeMission from '@/components/closeMission.vue'

export default {
  name: 'missionOverview',
  components: {
    MissionReport,
    closeMission
  }
}
</script>