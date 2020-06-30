<template>
    <div class="mission">
        <div class="always">
            <label id="infosCaption"> Datum: </label> <label id="infos"> {{krankenakte.datum}}</label>
            <br/>
            <label id="infosCaption"> Symptome: </label> <label id="infos"> {{krankenakte.symptome}}</label>
            <br>
            <label id="infosCaption"> Anamnese: </label> <label id="infos"> {{krankenakte.anamnese}}</label>
            <br/>
            <label id="infosCaption"> Diagnose: </label> <label id="infos"> {{krankenakte.diagnose}}</label>
            <br/>
            <label id="infosCaption"> Medikation: </label> <label id="infos"> {{krankenakte.medikation}}</label>
            <br/>
            <label id="infosCaption"> Diagnose: </label> <label id="infos"> {{krankenakte.diagnose}}</label>
            <br/>
            <label id="infosCaption"> Psychisch Krank: </label> <label id="infos"> {{krankenakte.psychischkrank}}</label>
            <br/>
            <label id="infosCaption"> Sonstiges: </label> <label id="infos"> {{krankenakte.sonstiges}}</label>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        krankenakte: Object
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