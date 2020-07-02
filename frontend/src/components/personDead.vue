<template>
  <div class="deadPerson">
    <button class="btn-create" @click="dead(aktMission)">Person für tot erklären</button>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {
    dead(payload){
        this.$socket.client.emit('deadPatient', payload)
      }
    },
};
</script>

<style scoped>
.btn-create {
  background-color: #009900; 
  color: #ffffff; 
  border: none; 
  padding: 10px; 
  text-align: center; 
  font-size: 16px; 
  margin: 5pt;
}
</style>