<template>
  <div class="closeMission">
    <button @click="closeMission()">Einsatz beenden</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {
    closeMission() {
    }
  }
};
</script>