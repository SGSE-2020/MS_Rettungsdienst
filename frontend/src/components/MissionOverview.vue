<template>
    <div class="MissionOverview">
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "MissionOverview",
  computed: mapState(["missions"]),
  methods: {
    
  }
}
</script>