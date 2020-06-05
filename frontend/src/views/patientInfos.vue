<template>
  <div class="patientInfos">
    <img alt="Vue logo" src="../assets/logo.png">
    <PatientInfo/>
  </div>
</template>

<script>
// @ is an alias to /src
import PatientInfo from '@/components/infoPatient.vue'

export default {
  name: 'patientInfos',
  components: {
    PatientInfo
  }
}
</script>