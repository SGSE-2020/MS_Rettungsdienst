<template>
    <div class="mission">
        <div class="always">
            <label id="infosCaption"> Einsatzstart: </label> <label id="infos"> {{mission.einsatzbegin}}</label>
            <br v-if="mission.einsatzende"/>
            <label id="infosCaption" v-if="mission.einsatzende != undefined"> Einsatzende: </label> <label id="infos"> {{mission.einsatzende}}</label>
            <br/>
            <label id="infosCaption"> Einsatzort: </label> <label id="infos"> {{mission.adresse}}</label>
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
    background-color: green;
    margin-bottom: 10%;
    margin-left: 20%;
    margin-right: 20%;
    border-color: hotpink;
    border: 5px;
}
#infosCaption {
    color: honeydew;
    margin-right: 20%;
}

#infos {
    color: honeydew;

}
</style>