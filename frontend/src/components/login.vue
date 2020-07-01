<template>
  <div class="header">
    <div class="level-left">
      <span class="left">
          <img class="header-logo" src="../assets/logo.jpg" alt="Smart City - Rettungsdienst Logo" @click="$router.push('/')"/>
      </span>
    </div>
    <div class="login">
      <div v-if="!user">
        <form class="right">
          <input type="email" placeholder="E-Mail" v-model="email" />
          <input type="password" placeholder="Passwort" v-model="password" />
          <input type="submit" @click.prevent="loginUser()" value="Login" />
        </form>
      </div>
      <div v-if="user">
        <p class="welcome-message column">Willkommen, {{aktUser.name}}</p>
        <button class="button-column button-green-bg" @click.prevent="logoutUser()">Logout</button>
      </div>
    </div>
    <div class="Überschrift">
      <h1> Rettungsdienst</h1>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: null,
      email: null,
      password: null,
      username: null,
      idToken: null,
      status: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.user = user;
        this.$store.dispatch("setUserMail", user.email);
        this.$store.dispatch("setUserName", user.displayName);
      } else {
        this.user = null;
        this.$store.dispatch("setUserMail", null);
        this.$store.dispatch("setUserName", null);
      }
    });
  },
  computed: mapState(["aktUser"]),
  methods: {
    loginUser() {
      //var email = "exampleuser@test.de";
      //var password = "sgse-ss2020";
      var email = this.email;
      var password = this.password;
      console.log(email);
      console.log(password);
      if (
        email != undefined &&
        email.length > 0 &&
        password != undefined &&
        password.length > 0
      ) {
        firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(
            user => {
              user = user.user;
              email = user.email;
              //this.username = user.displayName
              firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(idToken => {
                  //Token zu Bürgerbüro senden -> Uid zurückbekommen -> Dann User validiert
                  this.$store.dispatch("emitLogin", idToken);
                })
                .catch(function(error) {
                  console.log(error);
                });
            },
            function(error) {
              if (
                error.code == "auth/invalid-email" ||
                error.code == "auth/wrong-password" ||
                error.code == "auth/user-not-found"
              ) {
                alert("E-Mail oder Passwort falsch oder User existiert nicht");
              } else if (error.code == "auth/user-disabled") {
                alert("Dieser Nutzer ist deaktiviert");
              } else {
                alert(error);
              }
            }
          );
      } else {
        firebase
          .auth()
          .signOut()
          .then(
            function() {
              //Logout erfolgreich
            },
            function() {
              alert("Bitte Mail und Passwort eingeben");
            }
          );
      }
    },
    logoutUser() {
      firebase
        .auth()
        .signOut()
        .then(
          function() {
            //Logout erfolgreich
          },
          function() {
            alert("Logout fehlgeschlagen");
          }
        );
    },
    changeStatus(payload) {
      this.$store.dispatch("SetUserStatus", payload);
    }
  },
  sockets: {
    CompleteLogin: function(role, id, status) {
      console.log(role, id, status);
      this.$store.dispatch("setUserRole", role);
      this.$store.dispatch("setUserId", id);
      this.$store.dispatch("setUserStatus", status);
    }
  }
};
</script>

<style>
.header {
  background-color: #009900;
  height: 100pt;
  width: 100%;
}
.left {
  float: left;
}

.header-logo{
  width: 40%;
  height: auto;
  margin: 7pt;
}

.login{
  float:right;
  margin: 10pt;
}

.welcome-message{
  color: aliceblue;
}

.Überschrift{
  color: aliceblue;
  font-size: larger;
}
</style>

