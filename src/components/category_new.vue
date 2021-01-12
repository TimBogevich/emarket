<template>
  <div>
    <v-row class="justify-center mx-0" v-scroll="onScroll">

      <v-flex v-if="items.hits" xs12 md8>
        <virtual-list
          ref="virtList"
          :keeps="20"
          class="list"
          :page-mode="true"
          :data-key="'_id'"
          :data-sources="itemsCategory"
          :data-component="ItemNew"
          :estimate-size="162"
          item-class="mb-2"
        />
      </v-flex>

      <v-flex v-else xs12 md8>
        <v-skeleton-loader
          type="card"
          class="mb-2"
          v-for="n in 12" :key="n"
          height="162"
        ></v-skeleton-loader>
      </v-flex>
      

    </v-row>

    <v-menu
      absolute
      :close-on-content-click="false"
      offset-y
      style="max-width: 600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
        
          v-show="itemsCategory.length"
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

    <v-pagination
      v-if="itemsCategory.length"
      class="float_pagination"
      :total-visible="7"
      :value="currentPage"
      @input="gotoPage"
      :length="pages"
    ></v-pagination>
  </div>
</template>

<script>
import {get,sync} from 'vuex-pathify'
import item from './item'
import VirtualList from "vue-virtual-scroll-list";
import filters from './filters'
import ItemNew from './item_new'

export default {
  components : {item, VirtualList, filters},
  data() {
    return {
      itemsPerPage : 20,
      percentage : 0,
      offsetTop: 0,
      ItemNew: ItemNew,
      page: 1,
      reloadKey : -1,
    }
  },
  computed: {
    items: get("general/items"),
    filtersSelected: get("general/filtersSelected"),
    itemsCategory() {
      return this.items.hits ? this.items.hits : []
    },
    router() {
      return this.$route.params
    },
    loader() {
      return this.$store.getters["vuexActionTracker/hasRunningActions"](['general/loadMore'])
    },
    enableAutoload() {
      return this.items.curPage < this.items.nbPages
    },
    offset() {
      return this.$refs.virtList.$data.range	
    },
    pages() {
      return Math.ceil(this.items.cnt / this.itemsPerPage)
    },
    currentPage() {
      return Math.ceil(this.percentage *  this.pages) || 1
    },
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
    },
    onScroll (e) {
      let percentage = e.target.documentElement["scrollTop"] / e.target.documentElement["scrollHeight"]
      this.percentage = percentage
    },
    gotoPage(page) {
      let scroll = this.itemsPerPage * (page - 1)
      this.$refs.virtList.scrollToIndex(scroll)
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
  .float_pagination {
    position: fixed; 
    left: 50%;
    bottom: 10px;
    width: 10em;
  }

  #filter {
    overflow-y: auto;
    overflow-x: hidden;
  }


</style>
