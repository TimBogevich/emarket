<template>
  <div>
      <v-row class="justify-center mx-0">
      <v-flex xs12 md8>
        <filters :key="reloadKey" />
        <item 
        mode = "category"
        v-for="(item, index) in itemsCategory" :key="index" 
        :itemsCategory = "item" />
      </v-flex>
    </v-row>

    <mugen-scroll :handler="loadMore" :should-handle="Boolean(itemsCategory.length > 0)"></mugen-scroll>


      <v-pagination
        class="float_page"
        v-model="page"
        :length="4"
        prev-icon="mdi-menu-left"
        next-icon="mdi-menu-right"
      ></v-pagination>
  </div>
</template>

<script>
import {get,sync} from 'vuex-pathify'
import item from './item'
import MugenScroll from 'vue-mugen-scroll'
import filters from './filters'

export default {
  components : {item, MugenScroll, filters},
  data() {
    return {
      page: 1,
      reloadKey : -1,
    }
  },
  computed: {
    items: get("general/items"),
    itemsCategory() {
      let itemsCategory = this.items.find(i => i.category === this.router.category)
      return itemsCategory ? itemsCategory.items : []
    },
    router() {
      return this.$route.params
    }
  },

  watch: {
    router(newRouter,oldRouter) {
      this.loadItems()
      this.reloadKey -= 1;
    },
  },

  methods: {
    loadItems() {
      this.$store.dispatch("general/loadItem", this.router)
    },
    loadMore() {
      this.$store.dispatch("general/loadMore", this.router)
    },
    comparator(a, b) {
      debugger
      return a.text == b.text;
    },
  },

  mounted() {
    this.loadItems()
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .float_page {
    position: fixed; 
    bottom: 0;
    width: 80%;
  }

</style>
