<template>
  <div>
    <h1>Login</h1>
    <b-input type="email" placeholder="E-Mail" v-model="email" />
    <b-input type="password" placeholder="Password" v-model="password" />
    <input type="button" @click="login" value="Login" />
    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>

</script>