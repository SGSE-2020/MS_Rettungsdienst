<template>
  <div class="createMission">
    <div class="createMission">
      <table id="customers">
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
          <label>
              <textarea v-model="aktMission.adresse" placeholder="add multiple lines"></textarea>
            </label>
        </td>
        <td></td>
      </tr>
      <tr>
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
      </table>
    </div>
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
  background-color: #4caf50;
  color: white;
  width: 50%;
}
</style>