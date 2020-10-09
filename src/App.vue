<template>
  <v-app id="inspire">
    <v-app-bar
      app
      clipped-left
      color="red darken-4"
      dark
      scroll-target="#scrolling-techniques-6"
    >
      <v-row class="align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer" class="hidden-md-and-up"></v-app-bar-nav-icon>
        <v-flex xs2>
          <v-btn to="/" text class="ma-3">
            <v-icon>mdi-plus-thick</v-icon>
            <h3 class="hidden-xs-only">
              Немецкая аптека
            </h3>
          </v-btn>
        </v-flex>
        <v-flex xs6 pt-5  class="align-center hidden-md-and-down">
          <v-text-field
            dense
            filled
            rounded
            label="Имя лекарства или PZN"
            outlined
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn
        to="/account" 
        text>
          <span class="hidden-md-and-down">
            Аккаунт
          </span> 
          <v-icon>mdi-account</v-icon>
        </v-btn>

        <v-badge
        bordered
        :value="cartLength"
        color="error"
        class="mr-5"
        :content="cartLength"
        overlap>
          <v-btn
          to="/cart" 
          text>
            <span class="hidden-md-and-down">
              Корзина
            </span> 
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </v-row>
    </v-app-bar>

    <v-progress-linear
      v-if="globalLoader"
      indeterminate
      absolute
      color="white"
      height="10"
    ></v-progress-linear>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >

      <v-list>
        <v-list-item
          v-for="(text, index) in categories"
          :key="index"
          link
        >
          <v-list-item-content @click="openCategory(text)">
            <v-list-item-title>{{ $t(`general.${text.name}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list>
        <v-list-item link v-for="item in bookmarks" :key="item.name" :to="item.url">
          <v-list-item-content >
            <v-list-item-title>{{item.name}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>


    <v-main>
      <v-container
        class="py-8 px-6"
        fluid
      >
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import {get} from 'vuex-pathify'

  export default {
    data: () => ({
      bookmarks: [
        {
          name : "О магазине",
          url : "/about"
        },
        {
          name : "Доставка",
          url : "/delivery"
        },
      ],
      drawer: null,
    }),
    computed: {
      categories : get("general/categories"),
      globalLoader : get("general/globalLoader"),
      cartLength : get("general/cartLength"),

    },
    methods: {
      openCategory(value) {
        if(this.$route.path !== "/") {
          this.$router.replace("/" )
        }
        this.$router.replace("/categiory/" + value.name )
      }
    },
    mounted() {
      this.$store.dispatch("general/loadCategories")
    },
  }
</script>