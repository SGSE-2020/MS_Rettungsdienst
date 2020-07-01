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