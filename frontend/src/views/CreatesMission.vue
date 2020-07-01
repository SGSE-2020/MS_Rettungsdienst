<template>
  <div class="createMission">
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