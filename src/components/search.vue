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
      label="Имя лекарства или PZN"
      solo-inverted
    >
      <template v-slot:item="{ item }">
        <router-link :to="`/details/${item.pzn}`">
          <v-row class="mx-3" >
            <v-list-item-avatar>
                <img :src="item.image">
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.productName"></v-list-item-title>
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
const algoliasearch = require("algoliasearch");
const client = algoliasearch("WXZBTON7QZ", "0538989e5ef2c0ce383f06e4c1183f04");
const index = client.initIndex("apotheke");

export default {
  data() {
    return {
      items : [],
      loading : false,
      search : null,
      textSTring : "",
      algoliaPreferences : {
        "getRankingInfo": true,
        "analytics": false,
        "enableABTest": false,
        "hitsPerPage": 10,
        "attributesToRetrieve": "*",
        "attributesToSnippet": "*:20",
        "snippetEllipsisText": "…",
        "responseFields": "*",
        "page": 0,
        "facets": [
          "*"
        ]
      }
    }
  },
  watch: {
    async search(val,oldVal) {
      this.loading = true
      let result = await index.search(val, this.algoliaPreferences)
      this.items =  result.hits.map(i=> {
        i.text = i.productName
        return i
      })
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