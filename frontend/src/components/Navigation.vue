<template>
  <div class="navigation">
    <div type="button" class="missionReportNav">
      <div id="buttonnav">
          <img src="../assets/missionReportLogo.png" @click="$router.push('missionReport')" v-if="aktUser.role == '2.0'"/>

      </div>
      <div id="buttonnav">
          <img src="../assets/hospitalLogo.jpg" @click="$router.push('missionReport')" v-if="aktUser.role == '2.0'"/>
      </div>
      <!-- <div id="buttonnav">
          <img src="../assets/wayLogo.png" @click="$router.push('showWay')" v-if="aktUser.role == '2.0'"/>
      </div> -->
      <div id="buttonnav">
          <img src="../assets/patientinfosLogo.png" @click="$router.push('patientInfos')" v-if="aktUser.role == '2.0'"/>
      </div>
      <div id="buttonnav">
          <img src="../assets/writingReport.png" @click="$router.push('missionOverview')"/>
      </div>
      <div id="buttonnav">
          <img src="../assets/writingReport.png" @click="$router.push('createMission')" v-if="aktUser.role == '1.0'"/>
      </div>
      <div id="buttonnav">
          <img src="../assets/writingReport.png" @click="$router.push('admin')"/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test",
  computed: mapState(["aktUser"])
};
</script>

<style scoped>
.NavBut {
  width: 20%;
  height: 300px;
}
</style>