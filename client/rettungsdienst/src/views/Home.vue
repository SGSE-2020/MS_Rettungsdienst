<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <MissionOverview/>
    <Navigation/>
  </div>
</template>

<script>
// @ is an alias to /src
import MissionOverview from '@/components/MissionOverview.vue'
import Navigation from '@/components/Navigation.vue'

export default {
  name: 'missionOverview',
  components: {
    MissionOverview,
    Navigation
  }
}
</script>
