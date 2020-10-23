<template>
  <div>
    <v-dialog
      v-model="dialog"
      overlay-opacity
      max-width="400"
    >
      <v-card v-if="view === 'login'" class="pa-5">
          <v-row class="my-2">
            <v-btn block dark color="#e06555"  @click="googleLogin()">
              <v-icon left>
                mdi-google
              </v-icon>
              {{$t("login.loginWithGoogle")}}
            </v-btn>
          </v-row>
          <v-row class="my-2">
            <v-btn block dark color="#3B5998" @click="facebookLogin()">
              <v-icon left>
                mdi-facebook
              </v-icon>
              {{$t("login.loginWithFacebook")}}
            </v-btn>
          </v-row>
          <v-divider></v-divider>
          <v-form>
          <v-row class="mx-5">
            <v-text-field
              :label="$t('login.email')"
              name="login"
              v-model="login"
              prepend-icon="mdi-account"
              type="text"
            ></v-text-field>
          </v-row>

          <v-row class="mx-5">
            <v-text-field
              id="password"
              :label="$t('login.password')"
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="() => (showPassword = !showPassword)"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              prepend-icon="mdi-lock"
            ></v-text-field>
            <a class="caption" @click="view = 'restore'">{{$t('login.forgot')}}</a>
          </v-row>

          <v-row class="ma-5 justify-center">
            <v-btn @click="emailLogin()" color="primary">
              {{$t("login.login")}}
            </v-btn>
          </v-row>
          </v-form>

          <v-divider></v-divider>

          <v-row class="ma-5 justify-center">
            <v-btn @click="view = 'registration'" color="success">
              {{$t("login.registration")}}
            </v-btn>
          </v-row>

      </v-card>

      <v-card v-if="view === 'registration'" class="pa-5">
        <v-row class="mx-5">
          <v-btn @click="view = 'login'" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-row>
        <v-row justify="center">
          <p class="text-center red--text">
            {{message}}
          </p>
        </v-row>
        <v-form ref="regForm">
        <v-row class="mx-5">
          <v-text-field
            :label="$t('login.email')"
            name="login"
            v-model="login"
            prepend-icon="mdi-account"
            type="text"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-row>

        <v-row class="mx-5">
          <v-text-field
            id="password"
            :label="$t('login.password')"
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="() => (showPassword = !showPassword)"
            :type="showPassword ? 'text' : 'password'"
            name="password"
            prepend-icon="mdi-lock"
            :rules="[rules.required, rules.min]"
          ></v-text-field>
        </v-row>

        <v-row class="ma-5 justify-center">
          <v-btn @click="emailRegistration()" color="primary">
            {{$t("login.registration")}}
          </v-btn>
        </v-row>
        </v-form>
      </v-card>

      <v-card v-if="view === 'restore'" class="pa-5">
        <v-row class="mx-5">
          <v-btn @click="view = 'login'" icon>
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>
        </v-row>
        <v-row justify="center">
          <p class="text-center red--text">
            {{message}}
          </p>
        </v-row>
        <v-form ref="regForm">
        <v-row class="mx-5">
          <v-text-field
            :label="$t('login.email')"
            name="login"
            v-model="login"
            prepend-icon="mdi-account"
            type="text"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
        </v-row>
        <v-row class="ma-5 justify-center">
            <v-btn @click="emailResetPassword()" color="primary">
              {{$t("login.restore")}}
            </v-btn>
        </v-row>
        </v-form>
      </v-card>

    </v-dialog>
  </div>
</template>


<script>
  import firebase from 'firebase'
  export default {
    data() {
      return {
        showPassword : true,
        message : null,
        view : "login",
        dialog : true,
        login : "",
        password : "",
        rules: {
          required: v => !!v || this.$t('general.required'),
          min: v => v.length >= 8 || this.$t('general.min8chars'),
          email: v => v.match(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)  || this.$t('general.invalidEmail'),
        },
      }
    },
    methods: {
      async googleLogin() {
        let response = await firebase.auth().signInWithRedirect(this.$googleAuthProvider)
        this.dialog = false
      },
      async facebookLogin() {
        let response = await firebase.auth().signInWithRedirect(this.$facebookAuthProvider)
        this.dialog = false
      },
      async emailLogin() {
        let response = await firebase.auth().signInWithEmailAndPassword(this.login, this.password)
        this.dialog = false
      },
      async emailResetPassword() {
        try {
          let response = await firebase.auth().sendPasswordResetEmail(this.login)
          this.view = "login"
        } catch (error) {
          this.message = this.$t("login.cantRestorePassword")
        }
      },
      async emailRegistration() {
        if(!this.$refs.regForm.validate()) {
          return
        }
        try {
          let response = await firebase.auth().createUserWithEmailAndPassword(this.login, this.password)
          this.dialog = false
          this.view = "login"
        }
        catch(error) {
          this.message = this.$t("login.registrationFailed") 
        }
        
      }
    },
  }
</script>