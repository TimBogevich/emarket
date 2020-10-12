<template>
  <div>
    <item 
    v-if="item"
    mode = "category"
    :itemsCategory = "item" />
  </div>
</template>

<script>
  import item from './item'


  export default {
    components : {item},
    data() {
      return {
        item : null
      }
    },
    computed: {
      pzn() {
        return this.$route.params.pzn
      }
    },
    methods: {
      async load() {
        let snapshot = await this.$firebase.firestore().collection('items').where('pzn','==', this.pzn).limit(1).get()
        let a = snapshot.docs.map(i => i.data())
        this.item = a[0]
      }
    },
    watch: {
      async pzn(val, oldVal) {
        this.load()
      }
    },
    async mounted() {
      this.load()
    },
  }
</script>

<style lang="scss" scoped>

</style>