<template>
  <div class="PatintInfo">
    <label>PatientenID</label>
    <input v-model="aktPatient.userid" placeholder="PatientenID" />
    <button @click="getPatInfo" class="getPatInfo">Patientendaten abfragen</button>
    <div>
      <table id="customers">
        <tr>
          <td>
            <p>Datum</p>
          </td>
          <td>
            <p>{{aktPatient.datum}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Anamnese:</p>
          </td>
          <td>
            <p>{{aktPatient.anamnese}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Symptome:</p>
          </td>
          <td>
            <p>{{aktPatient.symptome}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Diagnose:</p>
          </td>
          <td>
            <p>{{aktPatient.diagnose}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Medikation:</p>
          </td>
          <td>
            <p>{{aktPatient.medikation}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Psychisch Krank:</p>
          </td>
          <td>
            <p>{{aktPatient.psychischkrank}}</p>
          </td>
        </tr>
        <tr>
          <td>
            <p>Sonstiges:</p>
          </td>
          <td>
            <p>{{aktPatient.sonstiges}}</p>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "patInfo",
  computed: mapState(["aktPatient"]),
  methods: {
    getPatInfo(payload){
        this.$store.dispatch('emitGetPatientInfo', payload)
      }
    }
};
</script>


<style scoped>

#customers td {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #009900;
  color: white;
}
</style>