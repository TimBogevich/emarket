<template>
  <div>
    <v-row>
      <swiper ref="test" class="swiper" :options="headSwiperOption">
        <swiper-slide v-for="(item, index) in carouselItems" :key="index">
            <v-img 
            gradient="to right, rgba(255, 255, 255,.33), rgba(25,32,72,1)"
            max-height="400" :src="item.src"></v-img>

              <h1 class="subtitle white--text" >Демо аптека</h1>
            <img class="apotheke_logo" src="https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/style%2F2000px-Deutsche_Apotheke_Logo.svg.png?alt=media">
        </swiper-slide>
      </swiper>
    </v-row>

    <v-row class="ma-5 justify-center">
      <v-flex xs6 md2>
        <h4>
          Самые популярные
        </h4>
      </v-flex>
    </v-row>

    <v-row class="justify-center">
      <v-flex xs10 md9>
        <swiper class="swiper" :options="swiperOption">
          <swiper-slide
           v-for="(item, index) in popular" :key="index">
            <v-sheet
              width="120"
              
              color="white"
            >
                <v-img max-width="130" :src="item.image">
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center">
                      <v-progress-circular indeterminate color="black lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
                <router-link :to="`/details/${item.pzn}`">
                  <h4 class="mx-3 text-left">
                    {{item.productName}}  
                  </h4>
                </router-link>
                <v-rating
                  :value="4"
                  background-color="purple lighten-3"
                  color="purple"
                  readonly
                  x-small
                ></v-rating>
                <h5 class="text-decoration-line-through text-right">
                  {{(item.productPrice * 1.3).toFixed(2)}} €
                </h5>
                <h3 class="red--text text-right">
                  {{item.productPrice}} €
                </h3>
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
  import { Swiper, SwiperSlide, Autoplay, Pagination  } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'
  import {get,sync} from 'vuex-pathify'

  export default {
    components: {
      Swiper,
      SwiperSlide
    },
    computed: {
      popular : get("general/popular")
    },
    data: () => ({
      model: 0,
      carouselItems : [
        {src : "https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/banners%2Ffemibion.jpg?alt=media"},
        {src : "https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/banners%2Fpr_f5p3b-femibion.jpg?alt=media"},
        {src : "https://pana.com.ph/wp-content/uploads/Bayer_Omnibus_Products_090116.jpg"},
        {src : "https://www.genengnews.com/wp-content/uploads/2018/11/Vitrakvi-bottles-Bayer-Loxo-Oncology.jpeg"},
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
            slidesPerView: 2,
            spaceBetween: 10
          }
        }
      },
      headSwiperOption: {
        spaceBetween: 0,
        loop: true,
        slidesPerView: 1,
        centeredSlides: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      }
    }),
    mounted() {
      this.$store.dispatch("general/loadPopular")
    },
    methods: {
      goToItem() {
        console.log("test")
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

  .swiper {
    width: 100%;

    .swiper-slide {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      background-color: white;
    }

    .subtitle {
      position: absolute;
      top: 1vw;
      right: 3vw;
    }
    .subtext1 {
      position: absolute;
      top: 6vw;
      right: 5vw;
      color: white;
      font-size: 2vw;
    }
    .subtext2 {
      position: absolute;
      top: 10vw;
      right: 5vw;
      color: white;
      font-size: 2vw;
    }
    .apotheke_logo {
      position: absolute;
      bottom: 2pc;
      right:4pc;
      width: 100px;
    }

  }
</style>
