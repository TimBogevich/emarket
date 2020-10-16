<template>
  <v-app id="inspire">
    <appBar />

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list v-if="!user">
        <v-list-item link @click="loginDialog()">
          <v-list-item-content>
            <v-list-item-title>
              <v-icon>
                mdi-account
              </v-icon>
              Войти
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-list v-if="user">

      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Аккаунт</v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item link to="/account">
          <v-list-item-content >
            <v-list-item-title>
              <v-icon>
                mdi-account
              </v-icon>
              Мои данные
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

        <v-list-item link to="/liked">
          <v-list-item-content >
            <v-list-item-title>
              <v-icon>
                mdi-heart
              </v-icon>
              Избраное
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

      </v-list-group>

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
      <v-progress-linear
      v-if="globalLoader"
      indeterminate
      absolute
      color="red"
      height="6"
      ></v-progress-linear>
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
      likedItems: get("general/likedItems"),
      orders: get("general/orders"),
    },
    methods: {
      logOut() {
        this.$store.dispatch("general/logOut")
      },
      login(){
        let store = this.$store
        firebase.auth().onAuthStateChanged(async (user) => {
          if (user) {
            store.dispatch("general/retrieveUser", user)
            store.dispatch("general/retrieveCard", user.uid)
            store.dispatch("general/loadOrders", user.uid)
            store.dispatch("general/loadLiked", user.uid)
          } else {
            let logout = await firebase.auth().signOut()
            this.user = null
          }
        });
      },
      async loginDialog() {
        console.log("test")
        let response = await this.$dialogLogin("Необходимо авторизоваться")
      }
    },
    mounted() {
      //this.$store.dispatch("general/loadCategories")
      this.login()
    },
  }
</script>