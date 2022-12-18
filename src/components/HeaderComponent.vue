<template lang="html">
  <header>
    <restaurant-slider
      :class="{'acitve' : is_slider_active}"
    />

    <div class="info">
      <div class="logo">
        <span>{{restaurant.title}}</span>
        <img :src="server_url + restaurant.logo" alt="">
      </div>
      <!-- <h1>RAKETA.CAFE</h1> -->
      <button v-if="hasSliderItems" :class="{'active': is_slider_active}" @click="changeSliderActivity">
        <img src="@/assets/icons/restaurant-icons/arrow.png" alt="">
      </button>
    </div>
  </header>
</template>

<script>
const api_url = require('@/settings.js').api_url
import RestaurantSlider from "@/components/slider/RestaurantSlider.vue"
export default {
  components:{
    RestaurantSlider,
  },
  methods:{
    changeSliderActivity(){
      this.$store.commit('changeSliderActivity')

    }
  },
  computed: {
    is_slider_active(){
      return this.$store.getters.isSliderActive
    },
    restaurant(){
      return this.$store.getters.getRestaurant
    },
    hasSliderItems(){
      return this.$store.getters.getBanners.length > 0
    }
  },
  props:{
    title: String,
    logo: String,
  },
  data(){
    return{
      server_url: api_url
    }
  }
}
</script>

<style lang="css" scoped>
</style>
