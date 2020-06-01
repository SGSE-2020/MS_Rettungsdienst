<template>
  <div class="PatintInfo">
    <label>PatientenID</label>
    <input v-model="patID" placeholder="PatientenID" />
    <button @click="getPatInfo" class="getPatInfo" />
    <table>
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
            <p>{{aktPatient.psychisch}}</p>
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
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "patInfo",
  computed: mapState(["aktPatient"])
};
</script>