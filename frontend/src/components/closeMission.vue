<template>
  <div class="closeMission">
    <button @click="closedMission(aktMission)">Einsatz beenden</button>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {
    closedMission(payload){
        this.$store.dispatch('emitCreateMission', payload)
      }
    }
};
</script>