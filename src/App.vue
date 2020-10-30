<template>
  <v-app id="inspire">
    <appBar />

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense v-if="!user">
        <v-list-item link @click="loginDialog()">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>
                mdi-account
              </v-icon>
              {{$t("login.login")}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-if="user">

      <v-list-group
        dense
        :value="false"
        prepend-icon="mdi-account-circle"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content dense>
            <v-list-item-title>
              {{$t("navDraw.account")}}
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item dense link to="/account">
          <v-list-item-content >
            <v-list-item-title>
              <v-icon>
                mdi-account
              </v-icon>
              {{$t("navDraw.myData")}}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item dense link to="/orders">
          <v-list-item-content >
            <v-list-item-title>
              <v-icon>
                mdi-truck-fast
              </v-icon>
              {{$t("navDraw.myOrders")}}
              <v-avatar
              color="grey"
              size="20"
              >
              <span class="white--text headline text-caption">
                {{orders.length}}
              </span>
              </v-avatar>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item dense link to="/liked">
          <v-list-item-content >
            <v-list-item-title>
              <v-icon>
                mdi-heart
              </v-icon>
              {{$t("navDraw.favorites")}}
              <v-avatar
              color="grey"
              size="20"
              >
              <span class="white--text headline text-caption">
                {{likedItems.length}}
              </span>
              </v-avatar>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item dense v-show="user" link @click="logOut()">
          <v-list-item-content >
            <v-list-item-title>
              <v-icon>mdi-exit-run</v-icon>
              {{$t("navDraw.exit")}}
            </v-list-item-title>
            
          </v-list-item-content>
        </v-list-item>

      </v-list-group>

      </v-list>

        <v-divider></v-divider>
      <v-list>

        <v-list-item
          v-for="(cat, index) in categories"
          :key="index"
          @click="$vuetify.goTo(1)"
          :to="`/categiory/${cat.text}`"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ $t(`general.${cat.text}`) }}
              <span class="text--disabled text-caption">
                {{cat.count}}
              </span>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <template v-slot:append >
        <v-list
         dense>


          <v-list-item link to="/contacts">
            <v-list-item-content >
              <v-list-item-title>
                {{$t("navDraw.contact")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/about">
            <v-list-item-content >
              <v-list-item-title>
                {{$t("navDraw.about")}}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item link to="/delivery">
            <v-list-item-content >
              <v-list-item-title>
                {{$t("navDraw.delivery")}}
              </v-list-item-title>

            </v-list-item-content>
          </v-list-item>
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item link v-bind="attrs" v-on="on">
                <v-list-item-content >
                  <v-list-item-title>
                    <flag :iso="selectedLang.flag" /> 
                    <span class="ml-1">{{selectedLang.name}}</span>
                  </v-list-item-title>

                </v-list-item-content>
              </v-list-item>
            </template>
            <v-list>
              <v-list-item v-for="(item, index) in langs" :key="index" @click="setLocale(item.code)">
                <v-list-item-title>
                  <flag :iso="item.flag" /> {{item.name}}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-list>
      </template>

    </v-navigation-drawer>

    <v-main>

      <v-container
        :class="$route.path === '/' ? 'ma-0 pa-0' : null"
        fluid
      >
        <router-view/>
      </v-container>
    </v-main>

    <dialogs-wrapper name="areYouSure"></dialogs-wrapper>
    <dialogs-wrapper name="login"></dialogs-wrapper>
    <dialogs-wrapper name="cardPayment"></dialogs-wrapper>


  </v-app>
</template>

<script>
import {get,sync} from 'vuex-pathify'
import firebase from 'firebase'

import appBar from "./components/appBar"

  export default {
    components : {appBar},
    data: () => ({
      langs: [
        {code :"en", name : "English", flag : "gb"},
        {code :"de", name : "Deutsch", flag : "de"},
        {code :"ru", name : "Русский", flag : "ru"},
      ],
    }),
    computed: {
      categories : get("general/categories"),
      locale: sync("general/locale"),
      user: sync("general/user"),
      drawer: sync("general/drawer"),
      filtersSelected: sync("general/filtersSelected"),
      likedItems: get("general/likedItems"),
      orders: get("general/orders"),
      loaderIsVisible() {
        return this.$store.getters["vuexActionTracker/hasRunningActions"]
      },
      selectedLang() {
        return this.langs.find(i => i.code === this.$i18n.locale)
      }
    },
    methods: {
      setLocale(locale) {
        this.$i18n.locale = locale;
        this.locale = locale;
      },
      logOut() {
        this.$store.dispatch("general/logOut")
      },
      login(){
        let store = this.$store
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            store.dispatch("general/retrieveUser", user.uid)
            store.dispatch("general/retrieveCard", user.uid)
            store.dispatch("general/loadOrders", user.uid)
            store.dispatch("general/loadLiked", user.uid)
            store.dispatch("general/loadMessages", user.uid)
          } else {
            let logout = await firebase.auth().signOut()
            this.user = null
          }
        });
      },
      async loginDialog() {
        let response = await this.$dialogLogin("Необходимо авторизоваться")
      }
    },
    mounted() {
      let locale =
        this.locale || navigator.language.substring(0, 2).toLowerCase();
      this.$i18n.locale = this.langs.map(i => i.code).includes(locale) ? locale : "en";
      this.$store.dispatch("general/loadCategories")
      this.login()
    },
  }
</script>

<style >

</style>