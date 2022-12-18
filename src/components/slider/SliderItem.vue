<template lang="html">
  <div class="item" @click="acitvateItem">
    <img :src="server_url + item.banner" alt="">
  </div>
</template>

<script>
const api_url = require('@/settings.js').api_url
export default {
  data(){
    return{
      server_url: api_url
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
