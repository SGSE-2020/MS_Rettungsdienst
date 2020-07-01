<template>
  <div class="closeMission">
    <button class="btn-create" @click="closedMission(aktMission)">Einsatz beenden</button>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {
    closedMission(payload){
        this.$store.dispatch('emitEndMission', payload)
      }
    }
};
</script>