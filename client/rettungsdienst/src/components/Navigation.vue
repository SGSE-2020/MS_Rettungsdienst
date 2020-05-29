<template>
    <div class="navigation">
        <div type="button" class="missionReportNav">
            <button id="misRepNav" @click="$router.push('missionReport')" class="NavBut" >
              <img src="../assets/missionReportLogo.png">
            </button>
            <button id="misRepNav" @click="$router.push('registerHospital')" class="NavBut" >
              <img src="../assets/hospitalLogo.jpg">
            </button>
            <button id="misRepNav" @click="$router.push('showWay')" class="NavBut" >
              <img src="../assets/wayLogo.png">
            </button>
            <button id="patInfoNav" @click="$router.push('patientInfos')" class="NavBut" >
              <img src="../assets/patientinfosLogo.png">
            </button>
            <button id="misRepNav" @click="$router.push('about')" class="NavBut" >
              <img src="../assets/writingReport.png">
            </button>
        </div>
  </div>
</template>

<style scoped>
  .NavBut {
    background-color: black;
    width: 20%;
    height: 300px;
  }
</style>