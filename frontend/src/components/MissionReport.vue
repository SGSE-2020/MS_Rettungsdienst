<template>
  <div class="MissionReport">
    <table id="customers">
      <tr>
        <td>
          <label>EinsatzID:</label>
        </td>
        <td>
          <label>{{aktMission._id}}</label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>PatientenID:</label>
        </td>
        <td>
          <label v-if="aktMission.patientenID != null">{{aktMission.patientenID}}</label>
          <button v-if="aktMission.patientenID == null" @click="$router.push('patientInfos')">Krankenakte abfragen</button>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Einsatzort:</label>
        </td>
        <td>
          <label>{{aktMission.adresse}}</label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Einsatzbegin:</label>
        </td>
        <td>
          <label>{{aktMission.einsatzbegin}}</label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Einsatzende:</label>
        </td>
        <td>
          <label>{{aktMission.einsatzende}}</label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Sanitäter:</label>
        </td>
        <td>
          <label>{{aktMission.sanitateter}}</label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Symptome:</label>
        </td>
        <td>
          <label>
            <textarea id="text" v-model="aktMission.symptome" placeholder="add multiple lines"></textarea>
          </label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Medikamente:</label>
        </td>
        <td>
          <textarea id="text" v-model="aktMission.medikamente" placeholder="add multiple lines"></textarea>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Vorläufige Diagnose:</label>
        </td>
        <td>
          <textarea id="text" v-model="aktMission.diagnose" placeholder="add multiple lines"></textarea>
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {}
};
</script>

<style scoped>
#customers tr:nth-child(even) {
  background-color: #f2f2f2;
}

#customers tr:hover {
  background-color: #ddd;
}

#customers td {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: green;
  color: white;
  width: 50%;
}

#text {
  width: 95%;
  resize: none;
  margin-left: 10pt;
}
</style>