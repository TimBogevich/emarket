<template>
  <div>

    <item 
    mode = "category"
    v-for="(item, index) in itemsCategory" :key="index" 
    :itemsCategory = "item" />

    <mugen-scroll :handler="loadMore" :should-handle="Boolean(itemsCategory.length > 0)"></mugen-scroll>
  </div>
</template>

<script>
import {get,sync} from 'vuex-pathify'
import item from './item'
import MugenScroll from 'vue-mugen-scroll'

export default {
  components : {item, MugenScroll},
  data() {
    return {
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
  },

  mounted() {
    this.loadCategories()
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
