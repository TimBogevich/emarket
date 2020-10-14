<template>
  <div>
    <v-card
    color="#FEFEFE" 
    class="my-2"
    >
      <v-row class="mx-4" v-if="isMobile">
        <v-row>
          <p>
            {{itemsCategory.productName}}
          </p>
        </v-row>
        <v-row>
          <v-flex class="ml-3" xs2>
            <v-img max-width="100" :src="itemsCategory.image"></v-img>
            <h6>
              {{itemsCategory.productPrice}} €
            </h6>
          </v-flex>
          <v-flex xs9>
            <v-card-text class="ml-1 mr-1 mt-0 pt-0">
              {{itemsCategory.desc}}
              <br v-if="mode==='category'">
              <a v-if="mode==='category'" :href="'https://www.medpex.de' + itemsCategory.medpexLink" target="_blank">Ссылка на medpex</a>
            </v-card-text>
          </v-flex>
        </v-row>
        <v-row class="align-start mx-3">
          <v-flex xs3>
            <v-select
            class="mx-3 pa-0 my-0"
              :items="selectCount"
              v-on:input="itemsCategory.selectCountSelected = $event"
              :value="itemsCategory.selectCountSelected || 1"
            ></v-select>
          </v-flex>
          <v-flex>
            <v-btn small class="ma-0 pa-0" v-if="mode==='category'" @click="toCart(itemsCategory)" block color="success">В корзину</v-btn>
            <v-btn small class="ma-0 pa-0" v-if="mode==='cart'" @click="deleteFromCart(ind, itemsCategory)" block text>Удалить</v-btn>
          </v-flex>

        </v-row>

      </v-row>


      <v-row v-else class="align-top my-2 mx-10">
        <v-flex xs2 md1 class="mt-3">
          <v-img max-width="100" :src="itemsCategory.image"></v-img>
        </v-flex>
        <v-flex xs10 md9>
          <v-card-title primary-title>
            {{itemsCategory.productName}}
          </v-card-title>
          <v-card-text >
            {{itemsCategory.desc}}
            <br v-if="mode==='category'">
            <a v-if="mode==='category'" :href="'https://www.medpex.de' + itemsCategory.medpexLink" target="_blank">Ссылка на medpex</a>
          </v-card-text>
        </v-flex>
        <v-flex xs12 md2 >
          <v-row class="mb-2 align-center justify-end">
            <h3>
              {{itemsCategory.productPrice}} €
            </h3>
          </v-row>
          <v-row class="mb-2 align-center justify-end">
            <v-flex xs3 mr-2>
              <v-select
                :items="selectCount"
                v-on:input="itemsCategory.selectCountSelected = $event"
                :value="itemsCategory.selectCountSelected || 1"
              ></v-select>
            </v-flex>
            <v-flex xs8>
              <v-btn small v-if="mode==='category'" @click="toCart(itemsCategory)" color="success">В корзину</v-btn>
              <v-btn small v-if="mode==='cart'" @click="deleteFromCart(ind, itemsCategory)" text>Удалить</v-btn>
            </v-flex>
          </v-row>
        </v-flex>
      </v-row>
    </v-card>
  </div>
</template>


<script>
import {get,sync} from 'vuex-pathify'
export default {
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
        {text : 25, value : 25},
      ],
    }
  },
  computed: {
    cart: sync("general/cart"),
    isMobile() {
      return ["xs", "sm"].includes(this.$vuetify.breakpoint.name)
    }
  },
  methods: {
    toCart(item) {
      let obj = Object.assign({}, item)
      this.$store.dispatch("general/toCart", obj)
    },
    async deleteFromCart(index, item) {
      this.$store.dispatch("general/deleteFromCart", {index, item})
      // let response = await this.$areYouSure(`Будет удалена позиция ${item.productName}`)
      // if(response) {
      //   this.$store.dispatch("general/deleteFromCart", index)
      // }
    }
  },
}
</script>