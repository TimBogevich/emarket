<template>
  <v-row class="justify-center">

    <v-row v-if="orders.length == 0" class="justify-center" >
      <v-flex xs11 md8>
        <v-row class="justify-center">
          <v-img height="330"  max-width="350" :src="require('../assets/no_orders.svg')"> 
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-row>
        <v-row class="justify-center">
          <strong class="text--disabled">
            {{$t("orders.noOrders")}}
          </strong>
        </v-row>
      </v-flex>
    </v-row>

    <v-flex v-else class="" xs11 md8 v-for="(item, index) in orders" :key="index">
      <v-card color="#FEFEFE" class="my-5">
        <v-card-title primary-title>          
          {{$t("orders.orderNumber")}}: {{item.date}}
          <v-spacer></v-spacer>
          {{$t("orders.orderPrice")}}: {{item.price.toFixed(2)}} €
        </v-card-title>
        <v-card-subtitle>
          {{$t("orders.orderDate")}}: {{item.date | moment("DD.MM.YYYY HH:mm:ss")}} <br>
        </v-card-subtitle>
         
        <v-card-text>
          {{$t("orders.sentAddress")}}: {{item.city}}, {{item.address}}, {{item.zip}}
        </v-card-text>

        <v-flex class="mx-5 my-2">
          <v-stepper dense v-model="item.status">
            <v-stepper-header>
              <v-stepper-step :complete="item.status >= 1" step="1">
                {{$t("orders.stage1")}}
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="item.status >= 2" step="2">
                {{$t("orders.stage2")}}
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="item.status >= 3" step="3">
                {{$t("orders.stage3")}}
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="item.status >= 4" step="4">
                {{$t("orders.stage3")}}
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-flex>

        <v-flex class="px-5 pb-5">
          <v-card outlined  v-for="(doc, index) in item.docs" :key="index" class="my-1 pa-0">
            <router-link :to="`/details/${doc.pzn}`">
              <v-row class="px-5 align-center">
                <v-flex xs1>
                  <v-img max-height="30" max-width="30" :src="doc.image"></v-img>
                </v-flex>
                <v-flex class="mx-2" xs5>
                  <h6>{{doc.productName}}</h6>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex class="mr-5" xs2>
                      <h5 class="subtitle-2 text-end">
                        {{doc.productPrice}} €
                      </h5>
                </v-flex>
              </v-row>
            </router-link>
          </v-card>
        </v-flex>
      </v-card>

    </v-flex>


  </v-row>
</template>

<script>
  import {get, sync} from 'vuex-pathify'
  import VueResponsiveText from 'vue-responsive-text'

  export default {
    components: {
      VueResponsiveText
    },
    computed: {
      orders : get("general/orders")
    },
  }
</script>

<style lang="scss" scoped>
  
</style>