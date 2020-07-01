<template>
  <div class="createMission">
    <h1 class="Überschrift2"> Einsatz erstellen</h1>
    <CreateMission/>
    <h2> Verfügbare Sanitäter</h2>
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

<style>

</style>