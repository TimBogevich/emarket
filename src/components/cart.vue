<template>
  <v-row class="justify-center mx-0">
    <v-flex xs12 md8>
        <div v-if="cartLength">
          <div v-if="showCard">
            <v-credit-card :direction="cardDirection" @change="creditInfoChanged" :trans="translations"/>
            <v-row class="justify-center">
              <v-flex md8 class="justify-center mb-5">
                <p style="word-wrap: break-word;" class="text-center">
                  {{$t("countries.orderWillBeDeliverd")}}: {{$t("countries." + user.country)}}, {{$t("cart.city")}} {{user.city}}, {{$t("cart.address")}}: {{user.address}}, {{$t("cart.to")}}: {{user.name}} {{user.lastName}}

                </p>

              </v-flex>

            </v-row>
          </div>
          <v-row v-if="!showCard" class="justify-center mb-5">
            <v-btn @click="toBuy()" color="success">
              {{$t("cart.byFor")}} {{cartTotalPrice.toFixed(2)}} €
            </v-btn>
          </v-row>
          <v-row v-if="showCard" class="justify-center mb-5">
            <v-btn @click="makeOrder()" color="error">
              Купить за {{cartTotalPrice.toFixed(2)}} €
            </v-btn>
          </v-row>
          
        <v-card
        height="100"
        >
          <v-row
            align="center"
            no-gutters
            style="height: 100%;"

          >
            <v-flex>
              <v-row class="justify-center">
                <v-icon x-large>
                  mdi-face-agent
                </v-icon>
              </v-row>
              <v-row class="justify-center">
                {{$t("cart.service")}}
              </v-row>
              <v-row class="justify-center">
                <strong>
                  50 €
                </strong>
              </v-row>
            </v-flex>
            <v-flex>
              <v-row class="justify-center">
                <v-icon x-large>
                  mdi-truck-fast
                </v-icon>
              </v-row>
              <v-row class="justify-center">
                {{$t("cart.DHLDelivery")}}
              </v-row>
              <v-row class="justify-center">
                <strong>
                  37.99 €
                </strong>
              </v-row>
            </v-flex>
          </v-row>
        </v-card>

          <item 
          mode = "cart"
          v-for="(item, index) in cart" :key="index" 
          :itemsCategory = "item"
          :ind = "index" />
        </div>


    <v-row v-else class="justify-center" >
      <v-flex xs11 md8>
        <v-row class="justify-center">
          <v-img height="330" max-width="350" :src="require('../assets/no_orders.svg')"> 
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-row>
        <v-row class="justify-center">
          <strong class="text--disabled">
            {{$t("cart.emptyCart")}}
          </strong>
        </v-row>
      </v-flex>
    </v-row>
    
    </v-flex>
  </v-row>

</template>


<script>
  import {get, sync} from 'vuex-pathify'
  import item from './item'
  import VCreditCard from 'v-credit-card';
  import 'v-credit-card/dist/VCreditCard.css';

  export default {
    components : {item, VCreditCard},
    data() {
      return {
        showCard : false,
        cardData : {},
        cardValid : false,
        translations : {
          name: {
              label: 'Имя владельца',
              placeholder: 'например IVANOV IVAN'
          },
          card: {
              label: 'Номер карты',
              placeholder: 'Номер карты'
          },
          expiration: {
              label: 'дата'
          },
          security: {
              label: 'Код безопасности',
              placeholder: 'CVV'
          }
        }
      }
    },
    computed: {
      cart: sync("general/cart"),
      cartLength: get("general/cartLength"),
      cartTotalPrice: get("general/cartTotalPrice"),
      userDatIsValid: get("general/userDatIsValid"),
      user: get("general/user"),
      displaySize() {
        return this.$vuetify.breakpoint.name
      },
      cardDirection() {
        return ["sm", "xs"].includes(this.$vuetify.breakpoint.name) ? "column" : "row"
      }
    },
    methods: {
      creditInfoChanged(values) {
        this.cardValid = Boolean(values.cardNumber) && Boolean(values.expiration) && Boolean(values.name) &&  Boolean(values.security)
        this.cardData = values
      },
      async toBuy() {
        if(!this.user) {
          let response = await this.$areYouSure(this.$t("cart.dialogLogin"))
          if(response) {
            this.$router.push("/account")
          }
          return
        }
        if(!this.userDatIsValid) {
          let response = await this.$areYouSure(this.$t("cart.dialogInsufficient"))
          if(response) {
            this.$router.push("/account")
          } else {
            return
          }
        } else {
          let response = await this.$dialogCardPayment("")
          if(response) {
            this.makeOrder()
          }
        }
      },
      async makeOrder() {
        await this.$store.dispatch("general/makeOrder")
        this.$router.push("/orders")
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
