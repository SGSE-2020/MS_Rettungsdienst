<template>
  <div class="MissionReport">
    <button @click="setMisID({'value':'7463363537'})" />
    <hr />
    <table id="customers">
      <tr>
        <td>
          <label>EinsatzID:</label>
        </td>
        <td>
          <label>{{aktMission.einsatzID}}</label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>PatientenID:</label>
        </td>
        <td>
          <label>{{aktMission.patientenID}}</label>
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
            <textarea v-model="aktMission.symptome" placeholder="add multiple lines"></textarea>
          </label>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Medikamente:</label>
        </td>
        <td>
          <textarea v-model="aktMission.medikamente" placeholder="add multiple lines"></textarea>
        </td>
        <td></td>
      </tr>
      <tr>
        <td>
          <label>Vorläufige Diagnose:</label>
        </td>
        <td>
          <textarea v-model="aktMission.diagnose" placeholder="add multiple lines"></textarea>
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
  methods: {
    setMisID(payload) {
      this.$store.dispatch("setMissID", payload.value);
    },
  }
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
  background-color: #4caf50;
  color: white;
  width: 50%;
}
</style>