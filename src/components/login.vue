<template>
  <div>
    <v-dialog
      v-model="dialog"
      overlay-opacity
      max-width="400"
    >
      <v-card class="pa-5" height="400">
          <v-row class="ma-5">
            <v-btn block dark color="#e06555"  @click="googleLogin()">
              <v-icon left>
                mdi-google
              </v-icon>
              Войти через Google
            </v-btn>
          </v-row>
          <v-row class="ma-5">
            <v-btn block dark color="#3B5998" @click="facebookLogin()">
              <v-icon left>
                mdi-facebook
              </v-icon>
              Войти через Facebook
            </v-btn>
          </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
  import firebase from 'firebase'
  export default {
    data() {
      return {
        dialog : true
      }
    },
    methods: {
      async googleLogin() {
        let response = await firebase.auth().signInWithPopup(this.$googleAuthProvider)
        this.dialog = false
      },
      async facebookLogin() {
        let response = await firebase.auth().signInWithPopup(this.$facebookAuthProvider)
        this.dialog = false
      },
    },
  }
</script>