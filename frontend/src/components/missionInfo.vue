<template>
    <div class="mission">
        <div class="always">
            <label id="infosCaption" v-if="mission.einsatzende != undefined"> Einsatzstart: </label> <label id="infos" v-if="mission.einsatzende != undefined"> {{mission.einsatzbegin}}</label>
            <br id="zwischen" v-if="mission.einsatzende"/>
            <label id="infosCaption" v-if="mission.einsatzende != undefined"> Einsatzende: </label> <label id="infos" v-if="mission.einsatzende != undefined"> {{mission.einsatzende}}</label>
            <br v-if="mission.einsatzende != undefined" />
            <label id="infosCaption" v-if="mission.einsatzende != undefined"> Einsatzort: </label> <label v-if="mission.einsatzende != undefined" id="infos"> {{mission.adresse}}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        mission: Object
    }
}
</script>

<style scoped>
.always {
    background-color: #009900;
    margin-bottom: 10pt;
}
#infosCaption {
    color: honeydew;
    margin-right: 20%;
    float: left;
    margin-left: 15pt;
}
#infos {
    color: honeydew;
    margin-left: 5pt;
}
</style>