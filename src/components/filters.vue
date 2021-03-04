<template>
  <div>
    <h5>
      {{$t("filter.packType")}}
    </h5>
    <v-checkbox 
      v-for="(item, index) in filters" :key="index"
      v-model="filtersSelected"
      :value="item" 
      @click="$vuetify.goTo(1)"
      :value-comparator="comparator"
      color="red"
      hide-details
    >
      <template v-slot:label>
        {{$t(`filter.${item.text}`)}} ({{item.count}})
      </template>
    </v-checkbox>
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
      },
      filtersSelectedLength() {
        return this.filtersSelected.length
      }
    },
    methods: {
      comparator(a, b) {
        return a?.text == b?.text
      },
    },
    watch: {
      filtersSelectedLength: {
        handler: function(val, oldVal) {
          this.$store.dispatch("general/loadItem", this.router)
        },
        deep: true
      }
    },
    mounted() {
      this.$store.dispatch("general/loadFilters", this.router)
    },
  }
</script>

<style lang="scss" scoped>
</style>