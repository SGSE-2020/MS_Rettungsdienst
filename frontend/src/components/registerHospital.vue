<template>
  <div class="registerHospital">
    <button @click="register(aktMission)">Weitergabe an Krankenhaus</button>
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
      }
    },
    sockets: {
        registeredHospital: function(data){
            if (data) {
                alert("Übergabe an Hospital erfolgreich");
            }
            else {
                alert("Übergabe nicht erfolgreich");
            }
        }
    }
};
</script>