<template>
  <div>
    <v-row class="justify-center ma-3">
      <v-flex xs12 md8>
        <v-img height="400" max-height="400" src="https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/style%2Fabout.jpg?alt=media">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <h3>О нас</h3>
        <p>
          {{about}}
        </p>

        <h3>Наши преимущества</h3>
        <v-row class="justify-center mt-5">

          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-face-agent
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              Персональный сервис
            </v-row>
            <v-row class="justify-center">
              Всегда на связи
            </v-row>
          </v-flex>

          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-clock-fast
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              Быстрая обработка заказов
            </v-row>
            <v-row class="justify-center">
              Доставка от 4х дней
            </v-row>
          </v-flex>

          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-shield-check
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              Гарантия качества товаров
            </v-row>
            <v-row class="justify-center">
              Лекарства без подделок
            </v-row>
          </v-flex>


          <v-flex xs12 md6 lg3 class="my-5">
            <v-row class="justify-center">
              <v-icon x-large>
                mdi-storefront
              </v-icon>
            </v-row>
            <v-row class="justify-center">
              Более 1000 товаров
            </v-row>
            <v-row class="justify-center">
              10 производителей
            </v-row>
          </v-flex>


        </v-row>
      </v-flex>
    </v-row>
  </div>

</template>


<script>
  import {get, sync} from 'vuex-pathify'

  export default {
    data() {
      return {
        about : `Немецкая аптека — ведущий дистрибьютор немецких лекарств и медицинских материалов с комплексным подходом к обслуживанию. 
        Мы предлагаем полный комплекс услуг от подбора лекарств до доставки крупных партий лекарств из Германии в страны СНГ. 
        В нашем онлайн-гипермаркете представлен широкий выбор лекарст, витаминов, биологически активных добавок, кремов, гелей и сопутствующих товаров.`
      }
    },
    computed: {

    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
