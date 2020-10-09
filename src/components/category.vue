<template>
  <div>
    <v-card
    class="ma-4 py-0"
    max-height="150"
    v-for="(item, index) in itemsCategory" :key="index"
    >
    <v-row class="align-top py-0">
      <v-col cols=1 class="ma-5">
        <v-img max-width="100" :src="item.image"></v-img>
      </v-col>
      <v-col cols=8 >
        <v-card-title primary-title>
          {{item.productName}}
        </v-card-title>
        <v-card-text>
          {{item.desc}}
          <br>
          <a :href="item.image" target="_blank">Ссылка на medpex</a>
        </v-card-text>
      </v-col>
      <v-col cols=2 class="ma-5">
        <v-row class="mb-2 align-center justify-end">
          <h3>
            {{item.productPrice}}
          </h3>
        </v-row>
        <v-row class="mb-2 align-center justify-end">
          <v-flex xs3 mr-2>
            <v-select
              :items="selectCount"
              v-on:input="item.selectCountSelected = $event"
              :value="item.selectCountSelected || 1"
            ></v-select>
          </v-flex>
          <v-flex xs8>
            <v-btn @click="toCart(item)" block color="success">В корзину</v-btn>
          </v-flex>
        </v-row>
      </v-col>
    </v-row>
    </v-card>


    <v-row class="justify-center">
      <v-flex xs1>
        <v-btn @click="loadMore()" block>
          Больше
        </v-btn>
      </v-flex>
    </v-row>

  </div>
</template>

<script>
import {get,sync} from 'vuex-pathify'
export default {
  data() {
    return {
      selectCount : [
        {text : 1, value : 1},
        {text : 2, value : 2},
        {text : 3, value : 3},
        {text : 4, value : 4},
        {text : 5, value : 5},
        {text : 10, value : 10},
        {text : 15, value : 15},
        {text : 20, value : 20},
        {text : 25, value : 25},
      ],
    }
  },
  computed: {
    items: get("general/items"),
    itemsCategory() {
      let itemsCategory = this.items.find(i => i.category === this.router.category)
      return itemsCategory ? itemsCategory.items : []
    },
    cart: sync("general/cart"),
    categoryPage: sync("general/categoryPage"),
    router() {
      return this.$route.params
    }
  },

  watch: {
    router(newRouter,oldRouter) {
      this.loadCategories()
    }
  },

  methods: {
    loadCategories() {
      this.$store.dispatch("general/loadItem", this.router)
    },
    loadMore() {
      this.$store.dispatch("general/loadMore", this.router)
    },
    toCart(item) {
      let obj = Object.assign({}, item)
      this.cart = this.cart.concat([obj])
    }
  },

  mounted() {
    this.loadCategories()
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
