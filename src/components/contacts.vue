<template>
  <div>
    <v-row class="justify-center">
      <v-flex xs11 md4>
        <basic-vue-chat title="Чат с поддержкой" :initial-feed="feed" />
      </v-flex>
    </v-row>
  </div>
</template>

<script>

import BasicVueChat from 'basic-vue-chat'
  export default {
    components : {BasicVueChat},
    data() {
      return {
        feed : [
          {
            id: 1,
            author: 'Поддержка',
            contents: 'Здравствуйте, если у вас есть вопросы, пожалуйста пишите, ответим максимально быстро',
            date: this.$moment().format('HH:mm')
          },
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>