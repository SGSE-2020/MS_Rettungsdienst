<template>
  <div class="closeMission">
    <button @click="closeMission(aktMission)">Einsatz beenden</button>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {
    closeMission(mission) {
      this.$socket.emit('createNewMis', mission)
    },
    closedMission(){
      this.$options.sockets.mission_created = (data) => {
        this.$store.dispatch('setAktMiss', data)
      }
    }
  }
};
</script>