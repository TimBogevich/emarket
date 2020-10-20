<template>
  <div>
    <v-dialog
      :value="true"
      persistent
      overlay-opacity
    >
      <v-card class="pa-10">
        <div id="checkout-container"></div>
        <v-row class="justify-center">
            <span>Тестовая форма</span>
        </v-row>
        <v-row class="justify-center">
          <span>Номера карты:</span>
        </v-row>
        <v-row class="justify-center">
          <span>4444555566661111 Успех</span>
        </v-row>
        <v-row class="justify-center">
          <span>4444111166665555 Отклонена</span>
        </v-row>
        <v-row class="justify-center">
          <v-btn @click="$close(false)" color="red" dark>Отмена</v-btn>
        </v-row>

      </v-card>

    </v-dialog>
    
  </div>
</template>

<script>

var Options = {
  options: {
    methods: ["card"],
    cardIcons: ["mastercard", "visa", "diners-club", "american-express"],
    fields: false,
    title: "Заказ номер 234234234",
    fullScreen: false,
    button: true,
    email: false,
    tooltip: true,
    fee: false
  },
  params: {
    merchant_id: 1397120,
    required_rectoken: "y",
    currency: "EUR",
    amount: 50000,
    order_desc: "my_order_desc",
    lang: "ru"
  },
  messages: {
    en: {
      card_number: "Номер карты",
      my_title: "Назначение платежа",
      my_order_desc: "Тестовый платеж",
      pay: "Оплатить"
    },
  }
};
const resources = [
  {
    host: "https://pay.fondy.eu/latest/",
    jsLibrary: [
      "checkout.js"
    ],
    cssLibrary: [
      "checkout.css",
    ],
  },
];

  export default {
    methods: {
      closeTrue() {
        this.$close(true)
      },
      checkout() {
        let a = fondy('#checkout-container', Options)
        console.log(a)
        a.$on('success', model => {
          this.closeTrue()
        })
      }
    },
    async mounted() {
       let a = await this.$head.load(resources)
       this.checkout()
    }
}
</script>

<style lang="scss" scoped>

</style>