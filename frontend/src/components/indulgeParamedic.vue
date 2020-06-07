<template>
  <div class="IndulgePramedic">
    <div id="paramedicList" v-for="para in paramedics.all" :key="para">
      <input type="radio" v-model="indPara" name="indPara" :value="para" />
      <label>{{para}}</label>
    </div>
    <div class="startMission">
      <button @click="createMission(indPara)">Einsatz erstellen</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test",
  computed: mapState(["paramedics", "aktMission"]),
  methods: {
      createMission(sanitater){
        console.log(sanitater)
        this.$store.dispatch('emitCreateMission', sanitater)
      }
  }
};
</script>