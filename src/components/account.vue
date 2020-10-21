<template>
  <div>
  <v-form>
  <v-row class="justify-center mx-0">
      <v-flex xs12 md8>
        <v-row 
        class="justify-center"
        v-if="user"
        >
          <v-flex xs12 md5 ma-5>
              <v-text-field
                name="name"
                v-model="user.name"
                :label="$t('account.name')"
                id="name"
              ></v-text-field>

              <v-text-field
                name="lastname"
                type="text"
                v-model="user.lastName"
                :label="$t('account.lastName')"
                id="lastname"
              ></v-text-field>

              <v-select
                :items="countries"
                v-model="user.country"
                :label="$t('account.chooseCountry')"
                id="country"
                name="country"
              ></v-select>

              <v-text-field
                name="telephone"
                type="text"
                v-model="user.telephone"
                :label="$t('account.telephone')"
                id="telephone"
              ></v-text-field>

              <v-text-field
                name="email"
                type="text"
                v-model="user.email"
                label="email"
                id="email"
              ></v-text-field>
          </v-flex>
          <v-flex xs12 md6 ma-5>
            <v-text-field
              name="zip"
              v-model="user.zip"
              :label="$t('account.zip')"
              id="zip"
            ></v-text-field>

            <v-text-field
              name="city"
              v-model="user.city"
              :label="$t('account.city')"
              id="city"
            ></v-text-field>

            <v-textarea
              name="input-7-1"
              v-model="user.address"
              :label="$t('account.address')"
              :hint="$t('account.address')"
            ></v-textarea>
          </v-flex>
        </v-row>
        
      </v-flex>

    </v-row>
    </v-form>
  </div>
</template>


<script>
  import firebase from 'firebase'
  import {get, sync} from 'vuex-pathify'

  export default {
    computed: {
      user: sync("general/user"),
      countries: get("general/countries"),
    },
    watch: {
      user: {
        handler: function(val, oldVal) {
          if(val) {
            this.$store.dispatch("general/saveUser")
            this.$store.commit("general/SET_USER", val)
          }
        },
        deep: true
      }
    },

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
