<template>
  <nav id="restaurants_nav" class="header level">
    <div class="level-right">
      <div v-if="!user">
        <form>
          <input type="email" placeholder="E-Mail" v-model="email" />
          <input type="password" placeholder="Passwort" v-model="password" />
          <input type="submit" @click.prevent="loginUser()" value="Login">
        </form>
      </div>
      <div v-if="user">
        <p class="welcome-message column">Willkommen, {{aktUser.name}}</p>
        <button class="button-column button-green-bg" @click.prevent="logoutUser()">Logout</button>
      </div>
    </div>
  </nav>
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
      username: null
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user != null) {
        this.user = user;
        this.$store.dispatch('setUserMail', user.email);
        this.$store.dispatch('setUserName', user.displayName);
      } else {
        this.user = null;
        this.$store.dispatch('setUserMail', null);
        this.$store.dispatch('setUserName', null);
      }
    });
  },
  methods: {
    loginUser() {
      
      var email = this.email;
      var password = this.password;
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
            function(user) {
                console.log(user);
              this.user = user.user;
              this.email = this.user.email;
              this.username = this.user.displayName;
              firebase
                .auth()
                .currentUser.getIdToken(true)
                .then(function(idToken) {
                  //Token zu Bürgerbüro senden -> Uid zurückbekommen -> Dann User validiert
                  console.log(idToken);
                  alert("Token ist:" + idToken);
                })
                .then(function(idToken) {
                    console.log("idToken:" + idToken);
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
    }
  },
  computed: mapState(["aktUser"])
};
</script>
