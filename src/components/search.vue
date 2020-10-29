<template>
    <v-autocomplete
      v-model="textSTring"
      :items="items"
      :search-input.sync="search"
      :loading="loading"
      dense
      flat
      hide-no-data
      hide-details
      disable-lookup
      item-text="text"
      no-filter
      :label="$t('search.medicineName')"
      solo-inverted
    >
      <template v-slot:item="{ item }">
        <router-link :to="{name : 'details', params : {pzn : item.pzn} }">
          <v-row class="mx-3" >
            <v-list-item-avatar>
                <img :src="item.image">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.text"></v-list-item-title>
            </v-list-item-content>
          </v-row>
        </router-link>
      </template>
      <template v-if="search" v-slot:append>
        <v-btn icon @click="search = null">
          <v-icon>
            mdi-close-circle
          </v-icon>
        </v-btn>
      </template>
    </v-autocomplete>
</template>


<script>

export default {
  data() {
    return {
      items : [],
      loading : false,
      search : null,
      textSTring : "",
    }
  },
  watch: {
    async search(val,oldVal) {
      this.loading = true
      // let result = await this.$algolia.search(val, this.algoliaPreferences)
      // this.items =  result.hits.map(i=> {
      //   i.text = i.productName
      //   return i
      // })

      if(val) {
        let result = await this.$mdbf.full_text(val) || []
        this.items =  result.map(i=> {
          i.text = [i.productName, i.pzn].join(" ")
          return i
        })
      }
      else {
        this.items = []
      }


      this.loading = false
    },
  },
  methods: {
    openItem(item) {
      this.$router.push({path : "/details", query: { pzn: '123' }})
    }
  },
}
</script>