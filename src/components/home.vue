<template>
  <div>
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
      ></v-carousel-item>
    </v-carousel>

    <v-slide-group
      class="pa-4"
      center-active
      show-arrows
    >
      <v-slide-item
        v-for="n in 15"
        :key="n"
        v-slot:default="{ active, toggle }"
      >
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="200"
          width="200"
          @click="toggle"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>


<script>
  export default {
    data: () => ({
      model: 0,
      carouselItems : [
        {src : "https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/banners%2Ffemibion.jpg?alt=media"},
        {src : "https://firebasestorage.googleapis.com/v0/b/apotheke-171c2.appspot.com/o/banners%2Fpr_f5p3b-femibion.jpg?alt=media"},
      ]
    }),
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
