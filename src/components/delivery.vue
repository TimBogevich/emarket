<template>
  <div>
    <v-row class="justify-center ma-3">
      <v-flex xs12 md8>
        <v-select
          :items="coutries"
          v-model="selected"
          label="Выберите страну"
        ></v-select>

        <p>Доставка осуществляется через DHL, смотрите подробности <a target="_blank" href="https://www.dhl.de/en/privatkunden/pakete-versenden/weltweit-versenden/preise-international.html">на сайте DHL</a> </p>
        <p>Дополнительно взымается сервисный сбор 50 EUR</p>
        <p>Что входит в сервисный сбор:  </p>
          <li>Покупка товаров в аптеке</li>
          <li>Упаковка и комбинирование посылок</li>
          <li>Заполнение декларации</li>
          <li>Отправка по месту назначения </li>

        <v-img 
        class="mt-5"
        :src="image">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </v-flex>
    </v-row>
    


  </div>

</template>


<script>
  import {get, sync} from 'vuex-pathify'

  export default {
    data() {
      return {
        selected : "russia"
      }
    },
    computed: {
      coutries: sync("general/coutries"),
      selectedCountry() {
        return this.coutries.find(i => i.value === this.selected)
      },
      image() {
        return "https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/" + this.selectedCountry.iso + ".png?alt=media"
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
