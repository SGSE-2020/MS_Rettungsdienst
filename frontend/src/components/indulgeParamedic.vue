<template>
  <div class="IndulgePramedic">
    <div id="paramedicList" v-for="para in allSanis" :key="para">
      <input type="radio" v-model="indPara" name="indPara" :value="para.userid" />
      <label>{{para.userid}}</label>
    </div>
    <div class="startMission">
      <button @click="createMission(indPara)">Einsatz erstellen</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "test",
  data: function() {
    return {
      allSanis: [],
    };
  },
  computed: mapState(["paramedics", "aktMission"]),
  methods: {
    createMission(sanitater) {
      this.$store.dispatch("emitCreateMission", sanitater);
    }
  },
  mounted: function(){
    console.log("Created");
    this.$socket.client.emit('getAllSanis');
  },
  sockets: {
    AllFreeSanis: function(data){
      console.log(data)
      this.allSanis = data;
    }
  },
};
</script>