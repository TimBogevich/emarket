<template>
  <v-app id="inspire">
    <appBar />
    <v-progress-linear
      v-if="globalLoader"
      indeterminate
      absolute
      color="white"
      height="10"
    ></v-progress-linear>

    <v-navigation-drawer
      disable-resize-watcher
      v-model="drawer"
      app
      clipped
    >
      <v-list >
        <v-list-item link to="/account">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>
                mdi-account
              </v-icon>
              Аккаунт
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link to="/orders">
          <v-list-item-content >
            <v-list-item-title>
              <v-icon>
                mdi-truck-fast
              </v-icon>
              Мои заказы
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

        <v-divider></v-divider>
      <v-list >

        <v-list-item
          v-for="(cat, index) in categories"
          :key="index"
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
        <v-list>
          <v-list-item link v-for="item in bookmarks" :key="item.name" :to="item.url">
            <v-list-item-content >
              <v-list-item-title>{{item.name}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-show="user" link @click="logOut()">
            <v-list-item-content >
              <v-list-item-title>
                <v-icon>mdi-exit-run</v-icon>
                Выход
              </v-list-item-title>
              
            </v-list-item-content>
          </v-list-item>
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

    <dialogs-wrapper></dialogs-wrapper>

  </v-app>
</template>

<script>
import {get,sync} from 'vuex-pathify'
import firebase from 'firebase'

import appBar from "./components/appBar"

  export default {
    components : {appBar},
    data: () => ({
      bookmarks: [
        {
          name : "Контакты",
          url : "/contacts"
        },
        {
          name : "О магазине",
          url : "/about"
        },
        {
          name : "Доставка",
          url : "/delivery"
        },
      ],
    }),
    computed: {
      categories : get("general/categories"),
      globalLoader : get("general/globalLoader"),
      user: sync("general/user"),
      drawer: sync("general/drawer"),
      filtersSelected: sync("general/filtersSelected"),
    },
    methods: {
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
          } else {
            let logout = await firebase.auth().signOut()
            this.user = null
          }
        });
      }
    },
    mounted() {
      this.$store.dispatch("general/loadCategories")
      this.login()
    },
  }
</script>