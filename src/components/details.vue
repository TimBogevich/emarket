<template>
  <div>
    <v-row v-if="item" class="mt-4 justify-center">
      <v-flex xs11 md2 class="mx-4">
        <ProductZoomer
        v-if="item.images.length > 0"
        :key="zoomerKey"
        :base-images="zoomer" 
        :base-zoomer-options="zoomerOptions"
        />
      </v-flex>
      <v-flex xs11 md4 class="mx-4">
        <h3 >
          {{item.productName}}
        </h3>
        <p>
          {{item.description}}
        </p>
        <v-row class="align-center">
          <v-flex xs2 class="mx-3">
            <v-text-field
              name="amount"
              :label="$t('item.amount')"
              id="amount"
              v-model.number="item.selectCountSelected"
              type="number"
            ></v-text-field>
          </v-flex>
          <v-flex xs1 class="mx-2">
            <v-btn :color="isLiked(item.pzn) ? 'red' : null" small class="ma-2" icon @click="likeItem(item)">
              <v-icon>
                mdi-heart
              </v-icon>
            </v-btn>
          </v-flex>
          <v-btn @click="toCart(item)" color="success">
            {{$t("item.toCart")}}
          </v-btn>
        </v-row>
      </v-flex>
    </v-row>

  </div>
</template>

<script>
  import item from './item'
  import axios from "axios"
  import jsdom from "jsdom"
  import {get,sync} from 'vuex-pathify'

  export default {
    components : {item},
    data() {
      return {
        zoomerKey : 1,
        item : null,
        description : "",
        images : [],
        zoomerOptions : {
          zoomFactor: 3,
          pane: "container-round",
          hoverDelay: 300,
          namespace: "zoomer-top",
          move_by_click: false,
          scroll_items: 5,
          choosed_thumb_border_color: "#dd2c00",
          scroller_position: "bottom",
          zoomer_pane_position: "left"
        }
      }
    },
    computed: {
      likedItems: get("general/likedItems"),
      pzn() {
        return this.$route.params.pzn
      },
      zoomer() {
        let obj = {
            thumbs : [],
            normal_size : [
              {
                'id': 1,
                'url': ""
              },
            ],
          }
        if(this.item.images.length == 0) {
          return obj
        } else {
          let images = this.item.images.map((i, k) => {
            return {
              id: k+1,
              url: i
            }
          })
          obj.thumbs = images
          obj.normal_size = images
          return obj
        }
      }
    },
    methods: {
      toCart(item) {
        let obj = Object.assign({}, item)
        this.$store.dispatch("general/toCart", obj)
      },
      isLiked(pzn) {
        return this.likedItems.find(i => i.pzn == pzn)
      },
      async load(pzn) {
        let item = await this.$store.dispatch("general/loadDetails")
        this.item = item
      },
      likeItem(item) {
        this.$store.dispatch("general/likeItem", item)
      },
    },
    watch: {
      async pzn(val, oldVal) {
        await this.load(this.pzn)
      }
    },
    async mounted() {
      await this.load(this.pzn)
      this.zoomerKey += 1
    },
  }
</script>

<style lang="scss" scoped>

</style>