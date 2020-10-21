<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity
      max-width="400"
    >
      <v-card>
        <v-card-title primary-title>
          {{$t("dialogAreYouSure.areYouSure")}}
        </v-card-title>
        <v-card-text>
          {{content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$close(false)" color="primary" dark>
            {{$t("dialogAreYouSure.no")}}
          </v-btn>
          <v-btn @click="$close(true)" color="grey darken-1" dark>
            {{$t("dialogAreYouSure.yes")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>


<script>
export default {
  data() {
    return {
      dialog : true
    }
  },
}
</script>