<template>
  <div>
    <v-dialog
      :value="true"
      persistent
      overlay-opacity
    >
      <v-card>
        <div id="checkout-container"></div>
        <p>Тестовая форма</p>
        <p>Номера карты:</p>
        <p>4444555566661111 Успех</p>
        <p>4444111166665555 Отклонена</p>
        <v-card-actions>
          <v-btn @click="$close(false)" color="red" dark>Отмена</v-btn>
        </v-card-actions>
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
    title: "my_title",
    fullScreen: true,
    button: true,
    locales: ["en"],
    email: false,
    tooltip: true,
    fee: true
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
    ru: {
      card_number: "Card number",
      my_title: "Order description",
      my_order_desc: "Test order",
      pay: "Pay now"
    }
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