<template>
    <div class="status">
        <label>aktUser.status</label>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: mapState(["aktUser"]),
}
</script>