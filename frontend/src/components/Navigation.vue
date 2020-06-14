<template>
    <div class="navigation">
        <div type="button" class="missionReportNav">
            <button id="misRepNav" @click="$router.push('missionReport')" class="NavBut" v-if="user.role==0">
              <img src="../assets/missionReportLogo.png">
            </button>
            <button id="misRepNav" @click="$router.push('registerHospital')" class="NavBut" v-if="user.role==0">
              <img src="../assets/hospitalLogo.jpg">
            </button>
            <button id="misRepNav" @click="$router.push('showWay')" class="NavBut" v-if="user.role==0">
              <img src="../assets/wayLogo.png">
            </button>
            <button id="patInfoNav" @click="$router.push('patientInfos')" class="NavBut" v-if="user.role==0">
              <img src="../assets/patientinfosLogo.png">
            </button>
            <button id="misRepNav" @click="$router.push('missionOverview')" class="NavBut" >
              <img src="../assets/writingReport.png">
            </button>
            <button id="misRepNav" @click="$router.push('createMission')" class="NavBut" >
              <img src="../assets/writingReport.png">
            </button>
        </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test",
  computed: mapState(["user"]),
};
</script>

<style scoped>
  .NavBut {
    background-color: black;
    width: 20%;
    height: 300px;
  }
</style>