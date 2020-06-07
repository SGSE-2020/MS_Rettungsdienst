<template>
  <div class="createMission">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> TODO: Hier wird ein Einsatz erstellt</h1>
    <CreateMission/>
    <IndulgeParamedic/>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateMission from '@/components/createMission.vue'
import IndulgeParamedic from '@/components/indulgeParamedic.vue'

export default {
  name: 'createMission',
  components: {
    CreateMission,
    IndulgeParamedic
  }
}
</script>