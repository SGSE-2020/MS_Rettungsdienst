<template>
  <form>
    <label>userid</label>
    <input type="text" placeholder="userid" v-model="id" />
    <br />
    <label>role</label>
    <select name="top5" size="1" v-model="role">
      <option value="1.0">Leitstelle</option>
      <option value="2.0">Sanitäter</option>
    </select>
    <button @click="create()">anlegen</button>
  </form>
</template>

<script>
export default {
    data(){
        return{
        id: null,
        role: null,
        }
    },
    methods: {
    create(){
        console.log(this.id);
        var user= {
            id: this.id,
            role: this.role,
            status: 1.0
        }
        console.log(user)
        this.$socket.client.emit('createUser', user)
      }
    }
};
</script>