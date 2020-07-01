<template>
  <div class="registerHospital">
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