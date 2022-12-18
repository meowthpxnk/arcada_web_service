<template lang="html">
  <div class="dish-photo">
    <img :src="parseUrl" alt="">
  </div>
  <div class="dish-info">
    <div class="dish-title">
      <span>{{parseTitle}}</span>
    </div>
    <div class="dish-count">
      <div class="dish-counter">
        <span>{{dish.counter}} х</span>
      </div>
      <div class="dish-price">
        <span>{{dish.price}} ₽</span>
      </div>

    </div>
  </div>
</template>

<script>
const api_url = require('@/settings.js').api_url
export default {
  data(){
    return{
      server_url: api_url,
    }
  },
  props:{
    dish: Object,
  },
  computed:{
    parseTitle(){
      if (this.dish.title.length > 20){
        return this.dish.title.substr(0, 20) + "..."
      }
      return this.dish.title
    },
    parseUrl(){
      return this.server_url + this.dish.image
    }
  }
}
</script>

<style lang="css" scoped>
</style>
