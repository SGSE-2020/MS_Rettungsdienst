<template>
  <div class="registerHospital">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> TODO: Hier wird eine Übersicht über alle vergangenen Einsätze angezeigt</h1>
    <MissionOverview/>
  </div>
</template>

<script>
// @ is an alias to /src
import MissionOverview from '@/components/MissionOverview.vue'

export default {
  name: 'missionOverview',
  components: {
    MissionOverview,
  }
}
</script>