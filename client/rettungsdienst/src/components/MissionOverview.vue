<template>
  <div class="MissionOverview">
    <h1>Test</h1>
    <button @click="setMisID({'value':'267'})"/>
  </div>
</template>

<script>
import {mapState} from "vuex"
//import {mapActions} from "vuex"

export default {
  name: 'test',
  computed: mapState(["aktMission"]),
  methods: {
    setMisID(payload){
      this.$store.dispatch('setMissID', payload.value)
    }
  }
}
</script>