<template lang="html">
  <div class="item" @click="acitvateItem">
    <img :src="server_url + item.banner" alt="">
  </div>
</template>

<script>
const settings = require('@/settings.js')
// const server_url = settings.proxy.url
export default {
  data(){
    return{
      server_url: settings.proxy.url
    }
  },
  props:{
    item: Object,
  },
  methods:{
    acitvateItem(){

      if (this.item.link !== null){
        this.$emit("clickPrev")
      } else {
        this.$store.commit('disableSlider')
      }
    }
  }
}
</script>

<style lang="css" scoped>
</style>
