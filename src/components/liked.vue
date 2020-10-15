<template>
  <div>
    <v-row class="justify-center mx-0">
      <v-flex xs12 md8>
        <item
          mode="category"
          v-for="(item, index) in likedItems"
          :key="index"
          :itemsCategory="item"
        />
      </v-flex>
    </v-row>
  </div>
</template>

<script>
import {get,sync} from 'vuex-pathify'
import item from './item'
export default {
  components : {item},
  data() {
    return {
      
    }
  },
  computed: {
    likedItems: get("general/likedItems")
  },
};
</script>

<style lang="scss" scoped>
</style>