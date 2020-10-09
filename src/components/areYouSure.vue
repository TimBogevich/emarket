<template>
  <div>
    <v-dialog
      v-model="dialog"
      persistent
      overlay-opacity
      max-width="300"
    >
      <v-card>
        <v-card-title primary-title>{{$t('general.deleting')}}</v-card-title>
        <v-card-text>{{$t('general.deleting')}} 
          <strong>{{deleteItem}}.</strong>
          {{$t('general.areYouSure')}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="$close(false)" color="primary" dark>{{$t('general.cancel')}}</v-btn>
          <v-btn @click="$close(true)" color="grey darken-1" dark>{{$t('general.delete')}}</v-btn>
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