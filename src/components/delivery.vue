<template>
  <div>
    <v-row class="justify-center ma-3">
      <v-flex xs12 md8>
        <v-select
          :items="countries"
          v-model="selected"
          :label="$t('delivery.chooseCountriy')"
        ></v-select>

        <p> {{$t("delivery.row1")}} <a target="_blank" href="https://www.dhl.de/en/privatkunden/pakete-versenden/weltweit-versenden/preise-international.html">на сайте DHL</a> </p>
        <p>{{$t("delivery.row2")}}</p>
        <p>{{$t("delivery.row3")}}  </p>
          <li>{{$t("delivery.row4")}}</li>
          <li>{{$t("delivery.row5")}}</li>
          <li>{{$t("delivery.row6")}}</li>
          <li>{{$t("delivery.row7")}} </li>

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
      countries: get("general/countries"),
      selectedCountry() {
        return this.countries.find(i => i.value === this.selected)
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
