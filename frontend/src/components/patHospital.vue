<template>
  <div class="patHospital">
    <button class="btn-create" @click="toHospital()">Patient an Krankenhaus übergeben</button>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {
    toHospital() {
    }
  }
};
</script>