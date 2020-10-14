<template>
  <div>
    <v-card id="filter" height="150" class="pa-5">
        
        <v-checkbox 
          v-for="(item, index) in filters" :key="index"
          v-model="filtersSelected"
          :value="item" 
          :value-comparator="comparator"
          color="red"
          hide-details
        >
          <template v-slot:label>
            {{item.text}} ({{item.count}})
          </template>
        </v-checkbox>
    </v-card>
  </div>
</template>

<script>
  import {get,sync} from 'vuex-pathify'

  export default {
    computed: {
      filters: sync("general/filters"),
      filtersSelected: sync("general/filtersSelected"),
      router() {
        return this.$route.params
      }
    },
    methods: {
      comparator(a, b) {
        return a?.text == b?.text
      },
    },
    mounted() {
      this.$store.dispatch("general/loadFilters", this.router)
    },
  }
</script>

<style lang="scss" scoped>
  #filter {
    overflow: auto;
  }
</style>