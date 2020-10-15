<template>
  <div>
    <v-row>

      <v-carousel 
      show-arrows-on-hover
      height = "300"
      hide-delimiter-background

      cycle>
        <v-carousel-item
          v-for="(item,i) in carouselItems"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
        </v-carousel-item>
      </v-carousel>
    </v-row>

    <v-row class="ma-5 justify-center">
      <v-flex xs4 md2>
        <span color="red">
          Самые популярные
        </span>
      </v-flex>
    </v-row>

    <v-row class="my-4 justify-center">
      <v-flex xs12 md9>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide
           v-for="item in 12" :key="item">
            <v-sheet
              color="white"
              width="150"
            >
                <v-img max-width="130" src="https://images.medpex.de/medias/95554/oRXufsnaEOCBBmxQHoP0sa-30.jpg">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <h4 class="mx-3 text-left">Zirkulin </h4>
                <v-rating
                  value="4"
                  background-color="purple lighten-3"
                  color="purple"
                  readonly
                  small
                ></v-rating>
                <h5 class="text-decoration-line-through text-right">25 €</h5>
                <h3 class="red--text text-right">15 €</h3>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            </v-sheet>
          </swiper-slide>
        </swiper>
        
      </v-flex>
    </v-row>


  </div>
</template>


<script>
  import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
  import 'swiper/swiper-bundle.css'

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    data: () => ({
      model: 0,
      carouselItems : [
        {src : "https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/banners%2Ffemibion.jpg?alt=media"},
        {src : "https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/banners%2Fpr_f5p3b-femibion.jpg?alt=media"},
      ],
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          1024: {
            slidesPerView: 6,
            spaceBetween: 10
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 3,
            spaceBetween: 5
          }
        }
      },
    }),
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
