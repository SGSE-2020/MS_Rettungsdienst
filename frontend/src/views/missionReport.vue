<template>
  <div class="missionReport">
    <h1> Einsatzbericht</h1>
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