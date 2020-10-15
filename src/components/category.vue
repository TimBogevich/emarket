<template>
  <div>
      <v-row class="justify-center mx-0">
      <v-flex xs12 md8>
        <filters v-if="showFilters" :key="reloadKey" />
        <item 
        mode = "category"
        v-for="(item, index) in itemsCategory" :key="index" 
        :itemsCategory = "item" />
      </v-flex>
    </v-row>

    <mugen-scroll :handler="loadMore" :should-handle="Boolean(itemsCategory.length > 0)"></mugen-scroll>



      <v-btn
        class="float_filter"
        color="primary"
        fab
        @click="showFilters = !showFilters"
        large
        dark
        bottom
      >
        <v-icon>mdi-filter</v-icon>
      </v-btn>

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
      showFilters : false,
      page: 1,
      reloadKey : -1,
    }
  },
  computed: {
    items: get("general/items"),
    itemsCategory() {
      return this.items.items ? this.items.items : []
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
  .float_filter {
    position: fixed; 
    bottom: 10px;
  }

</style>
