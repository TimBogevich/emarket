<template>
  <v-row class="justify-center">
    <v-flex class="" xs12 md8 v-for="(item, index) in orders" :key="index">
      <v-card color="#FEFEFE" class="my-5">
        <v-card-title primary-title>
          Номер заказа: {{item.date}}
          <v-spacer></v-spacer>
          Стоимость: {{item.price.toFixed(2)}} €
        </v-card-title>
        <v-card-subtitle>
          Дата заказа: {{item.date | moment("DD.MM.YYYY HH:mm:ss")}} <br>
        </v-card-subtitle>
         
        <v-card-text>
          Отправлено по адресу:
        </v-card-text>

        <v-flex class="px-5 pb-2">
          <v-stepper dense v-model="item.status" alt-labels>
            <v-stepper-header>
              <v-stepper-step :complete="item.status >= 1" step="1">
                Заказ размещен
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="item.status >= 2" step="2">
                Доставляется на склад
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="item.status >= 3" step="3">
                Товар на складе
              </v-stepper-step>
              <v-divider></v-divider>

              <v-stepper-step :complete="item.status >= 4" step="4">
                Товар отправлен
              </v-stepper-step>
            </v-stepper-header>
          </v-stepper>
        </v-flex>

        <v-flex class="px-5 pb-5">
          <v-card outlined  v-for="(doc, index) in item.docs" :key="index" class="my-1 pa-0">
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
          </v-card>
        </v-flex>
      </v-card>

    </v-flex>


  </v-row>
</template>

<script>
  import {get, sync} from 'vuex-pathify'

  export default {
    computed: {
      orders : get("general/orders")
    },
  }
</script>

<style lang="scss" scoped>
  
</style>