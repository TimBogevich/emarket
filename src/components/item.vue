<template>
  <div>
    <v-card
    color="#FEFEFE" 
    class="my-2"
    >

      <!-- MOBILE -->
      <v-row class="mx-4" v-if="isMobile">
        <v-row>
          <router-link class="link" :to="{name : 'details', params : {pzn : itemsCategory.pzn} }">
            <v-card-title class="subtitle-1 font-weight-bold">
              {{itemsCategory.productName}}
            </v-card-title>
          </router-link>
        </v-row>
        <v-row>
          <v-flex class="ml-3" xs2>
            <v-img max-width="100" :src="itemsCategory.image"></v-img>

          <VueResponsiveText class="text-right mt-2 px-2 font-weight-bold">
            {{itemsCategory.productPrice}} €
          </VueResponsiveText>
          </v-flex>
          <v-flex xs9>
            <v-card-text class="ml-2 mr-0 pr-0 mt-0 pt-0 caption">
              {{itemsCategory.desc}}
              <br v-if="mode==='category'">
            </v-card-text>
          </v-flex>
        </v-row>
        <v-row class="align-start">
          <v-flex class="ml-3" xs3>
            <v-select
            class="mx-3 pa-0 my-0"
              :items="selectCount"
              v-on:input="itemsCategory.selectCountSelected = $event"
              :value="itemsCategory.selectCountSelected || 1"
            ></v-select>
          </v-flex>

          <v-flex xs1>
            <v-btn :color="isLiked(itemsCategory.pzn) ? 'red' : null" small icon @click="likeItem(itemsCategory)">
              <v-icon>
                mdi-heart
              </v-icon>
            </v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs6>
            <v-btn small class="mx-2 px-5" v-if="mode==='category'" @click="toCart(itemsCategory)" color="success">{{$t("item.toCart")}}</v-btn>
            <v-btn small class="mx-2 px-5" v-if="mode==='cart'" @click="deleteFromCart(ind, itemsCategory)" text>{{$t("item.toCart")}}</v-btn>
          </v-flex>



        </v-row>

      </v-row>

      <!-- Desktop -->
      <v-row v-else class="align-top my-2 mx-10">
        <v-flex xs2 md1 class="mt-3">
          <v-img max-width="100" :src="itemsCategory.image"></v-img>
        </v-flex>
        <v-flex xs10 md8>
          <router-link class="link" :to="{name : 'details', params : {pzn : itemsCategory.pzn} }">
            <v-card-title primary-title>
              {{itemsCategory.productName}}
            </v-card-title>
          </router-link>
          <v-card-text >
            {{itemsCategory.desc}}
            <br v-if="mode==='category'">
            <a v-if="mode==='category'" :href="'https://www.medpex.de' + itemsCategory.medpexLink" target="_blank">{{$t("item.linkToMedpex")}}</a>
          </v-card-text>
        </v-flex>
        <v-flex xs12 md3 >
          <v-row class="justify-end">
            <v-card-title primary-title class="font-weight-bold">
                {{itemsCategory.productPrice}} €
            </v-card-title>
          </v-row>
          <v-row v-if="itemsCategory.selectCountSelected > 1" class="justify-end mr-3">
            <span class="caption">
              {{(itemsCategory.productPrice * itemsCategory.selectCountSelected).toFixed(2)}} €
            </span>
          </v-row>
          <v-row class="justify-end align-center">
            <v-flex xs1 class="mx-2">
              <v-btn :color="isLiked(itemsCategory.pzn) ? 'red' : null" small class="ma-2" icon @click="likeItem(itemsCategory)">
                <v-icon>
                  mdi-heart
                </v-icon>
              </v-btn>
            </v-flex>

            <v-flex xs3 class="mx-3">
              <v-text-field
              v-if="itemsCategory.selectCountSelected > 20"
              v-on:input="changeAmount($event)"
              :value="itemsCategory.selectCountSelected"
              ></v-text-field>
              <v-select
              v-else
              class="ma-2"
                :items="selectCount"
                v-on:input="changeAmount($event)"
                :value="itemsCategory.selectCountSelected || 1"
              ></v-select>

            </v-flex>


            <v-flex flex-direction: row xs7 class="justify-end">
              <v-btn small class="ma-2" v-if="mode==='category'" @click="toCart(itemsCategory)" color="success">{{$t("item.toCart")}}</v-btn>
              <v-btn small v-if="mode==='cart'" @click="deleteFromCart(ind, itemsCategory)" color="accent">{{$t("item.delete")}}</v-btn>
            </v-flex>

          </v-row>
        </v-flex>
      </v-row>
    </v-card>
  </div>
</template>


<script>
import {get,sync} from 'vuex-pathify'
import VueResponsiveText from 'vue-responsive-text'

export default {
  components: {
    VueResponsiveText
  },
  props : ["itemsCategory", "mode", "ind"],
  data() {
    return {
      selectCount : [
        {text : 1, value : 1},
        {text : 2, value : 2},
        {text : 3, value : 3},
        {text : 4, value : 4},
        {text : 5, value : 5},
        {text : 6, value : 6},
        {text : 7, value : 7},
        {text : 8, value : 8},
        {text : 9, value : 9},
        {text : 10, value : 10},
        {text : 11, value : 11},
        {text : 12, value : 12},
        {text : 13, value : 13},
        {text : 14, value : 14},
        {text : 15, value : 15},
        {text : 20, value : 20},
        {text : "20+", value : 21},
      ],
    }
  },
  computed: {
    cart: sync("general/cart"),
    isMobile() {
      return ["xs", "sm"].includes(this.$vuetify.breakpoint.name)
    },
    likedItems: get("general/likedItems")
  },
  methods: {
    changeAmount(v) {
      this.itemsCategory.selectCountSelected = v
      this.itemsCategory = Object.assign({}, this.itemsCategory)
    },
    toCart(item) {
      let obj = Object.assign({}, item)
      this.$store.dispatch("general/toCart", obj)
    },
    likeItem(item) {
      this.$store.dispatch("general/likeItem", item)
    },
    isLiked(pzn) {
      return this.likedItems.find(i => i.pzn == pzn)
    },
    async deleteFromCart(index, item) {
      this.$store.dispatch("general/deleteFromCart", {index, item})
    }
  },
}
</script>

<style>
  .link {
    text-decoration: none;
    color: #4d5481 !important;
  }
</style>