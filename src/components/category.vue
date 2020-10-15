<template>
  <div>
      <v-row class="justify-center mx-0">
      <v-flex xs12 md8>
        <v-chip 
        close
        @click:close="filtersSeletedRemove(index)"  
        class="mr-3" 
        v-for="(item, index) in filtersSelected" :key="index">
          {{$t(`filter.${item.text}`)}}
        </v-chip>
      </v-flex>
      <v-flex xs12 md8>
        <item 
        mode = "category"
        v-for="(item, index) in itemsCategory" :key="index" 
        :itemsCategory = "item" />
      </v-flex>
    </v-row>

    <mugen-scroll :handler="loadMore" :should-handle="Boolean(itemsCategory.length > 0)"></mugen-scroll>


    <v-menu
      absolute
      :close-on-content-click="false"
      offset-y
      style="max-width: 600px"
    >
      <template v-slot:activator="{ on, attrs }">


        <v-btn
          class="float_filter"
          color="primary"
          fab
          v-bind="attrs"
          v-on="on"
          large
          dark
          bottom
        >
          <v-icon>mdi-filter</v-icon>
        </v-btn>
      </template>

      <v-card class="pa-3" id="filter" height="500" width="300">
        <filters :key="reloadKey" />
      </v-card>
    </v-menu>



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
    filtersSelected: get("general/filtersSelected"),
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
    filtersSeletedRemove(index) {
      this.$store.dispatch("general/filtersSeletedRemove", index)
    }
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

  #filter {
    overflow-y: auto;
    overflow-x: hidden;
  }

</style>
