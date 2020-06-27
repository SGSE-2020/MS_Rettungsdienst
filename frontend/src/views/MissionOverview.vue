<template>
  <div class="registerHospital">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1> TODO: Hier wird eine Übersicht über alle vergangenen Einsätze angezeigt</h1>
    <MissionOverview/>
    <div class="missionList">
      <missionInfo v-for="mission in allMissions" :mission="mission" :key="mission._id"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MissionOverview from '@/components/MissionOverview.vue'
import missionInfo from '@/components/missionInfo.vue'

export default {
  name: 'missionOverview',
  data: function() {
    return {
      allMissions: [],
    };
  },
  created: function(){
    this.$socket.client.emit('GetAll');
  },
  sockets: {
    getAll: function(data){
      console.log(data)
      this.allMissions = data;
    }
  },
  components: {
    MissionOverview,
    missionInfo
  }
}
</script>