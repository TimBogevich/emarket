<template>
  <div>
    <v-app-bar
      app
      clipped-left
      color="red darken-4"
      dark
    >
      <v-row class="align-center">
        <v-app-bar-nav-icon 
        v-if="!showSearch && isMobile"
        @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-flex v-if="!showSearch" xs2>
          <v-btn to="/" text class="ma-3">
            <v-icon>mdi-plus-thick</v-icon>
            <h3 class="hidden-md-and-down">
              {{$t("appBar.siteName")}}
            </h3>
          </v-btn>
        </v-flex>
        <v-flex xs9 sm8 md6 class="align-center" v-if="['lg', 'xl'].includes(this.$vuetify.breakpoint.name) || showSearch">
          <search />
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn
        class="hidden-lg-and-up"
        @click="showSearch = !showSearch"
        text>
          <v-icon v-if="!showSearch">mdi-magnify</v-icon>
          <v-icon v-else>mdi-close</v-icon>
        </v-btn>


        <v-badge
        v-if="['lg', 'xl'].includes(this.$vuetify.breakpoint.name) || !showSearch"
        bordered
        :value="cartLength"
        color="error"
        class="mr-5"
        :content="cartLength"
        overlap>
          <v-btn
          to="/cart" 
          text>
            <span 
            v-if="['lg', 'xl'].includes(this.$vuetify.breakpoint.name)"
            >
              {{$t("appBar.cart")}}
            </span> 
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </v-row>
    </v-app-bar>
  </div>
</template>

<script>
  import {get,sync} from 'vuex-pathify'
  import search from "./search"
  export default {
    components : {search},
    data() {
      return {
        showSearch : false,
      }
    },
    computed: {
      cartLength : get("general/cartLength"),
      user: sync("general/user"),
      drawer: sync("general/drawer"),
      isMobile() {
        return ["xs", "sm", "md"].includes(this.$vuetify.breakpoint.name)
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>