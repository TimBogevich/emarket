<template>
  <div>
    <v-row class="justify-center ma-3">
      <v-flex xs12 md8>
        <v-img height="400" max-height="400" src="https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/style%2Fabout.jpg?alt=media">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <h3>
          {{$t("about.aboutUs")}}
        </h3>
        <p>
          {{$t("about.about")}}
        </p>

        <h3>
          {{$t("about.ourBenefits")}}
        </h3>
        <v-row class="justify-center mt-5">

          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-face-agent
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              {{$t("about.personalService")}}
            </v-row>
            <v-row class="justify-center">
              {{$t("about.alwaysOn")}}
            </v-row>
          </v-flex>

          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-clock-fast
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              {{$t("about.fast")}}
            </v-row>
            <v-row class="justify-center">
              {{$t("about.fourDays")}}
            </v-row>
          </v-flex>

          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-shield-check
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              {{$t("about.garanty")}}
            </v-row>
            <v-row class="justify-center">
              {{$t("about.garanty2")}}
            </v-row>
          </v-flex>


          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-storefront
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              {{$t("about.goods")}}
            </v-row>
            <v-row class="justify-center">
              {{$t("about.goods")}}
            </v-row>
          </v-flex>


        </v-row>
      </v-flex>
    </v-row>
  </div>

</template>


<script>
  import {get, sync} from 'vuex-pathify'

  export default {

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
