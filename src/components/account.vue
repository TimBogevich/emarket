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
                label="Имя"
                id="name"
              ></v-text-field>

              <v-text-field
                name="lastname"
                type="text"
                v-model="user.lastName"
                label="Фамилия"
                id="lastname"
              ></v-text-field>

              <v-select
                :items="coutries"
                v-model="user.country"
                label="Выберите страну"
                id="country"
                name="country"
              ></v-select>

              <v-text-field
                name="telephone"
                type="text"
                v-model="user.telephone"
                label="Телефон"
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
              label="Индекс"
              id="zip"
            ></v-text-field>

            <v-text-field
              name="city"
              v-model="user.city"
              label="Город"
              id="city"
            ></v-text-field>

            <v-textarea
              name="input-7-1"
              label="Адрес"
              v-model="user.address"
              hint="Внимательно проверьте адрес"
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
      coutries: sync("general/coutries"),
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
