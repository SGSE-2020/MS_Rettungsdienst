<template>
  <div class="registerHospital">
    <button class="btn-create" @click="register(aktMission)">Weitergabe an Krankenhaus</button>
  </div>
</template>

<script>
import { mapState } from "vuex";


export default {
  name: "test",
  computed: mapState(["aktMission"]),
  methods: {
    register(payload){
        this.$socket.client.emit('registerHospital', payload)
        this.$store.dispatch('emitEndMission', payload)
      }
    },
    sockets: {
        registeredHospital: function(data){
            if (data) {
                console.log(data);
                alert("Übergabe an Hospital erfolgreich");
            }
            else {
                alert("Übergabe nicht erfolgreich");
            }
        }
    }
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