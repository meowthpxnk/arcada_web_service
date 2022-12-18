<template lang="html">
  <div
    class="restaurant"
    :class="{'closed' : isOpened === false}"
    :style="{'background-color': returnColor}"
    @click="goToRestaurant"
  >
    <div class="main">
      <div class="logo">
        <img :src="server_url + logo" alt="">
      </div>
      <div class="title">
        <span>{{title}}</span>
      </div>
    </div>
    <div class="info">
      <div class="time">
        <span>{{parseStartWork}} - {{parseEndWork}}</span>
      </div>
      <div class="status">
        <span v-if="isOpened">Открыто</span>
        <span v-else>Закрыто</span>
      </div>
    </div>
  </div>
</template>

<script>
const api_url = require('@/settings.js').api_url
import {parseTime} from "@/methods/additional.js"

// import
export default {
  data(){
    return{
      server_url: api_url
    }
  },
  computed:{
    parseEndWork(){
      return parseTime(this.end_work)
    },
    parseStartWork(){
      return parseTime(this.start_work)
    },
    returnColor(){
      if (this.isOpened){
        return this.color
      }
      return 'var(--color-bg-dark)'
    },
  },
  props:{
    title: String,
    link:String,
    id: Number,
    logo: String,
    color: String,
    start_work: Number,
    end_work: Number,
    isOpened: Boolean,
  },
  methods:{
    goToRestaurant(){
      console.log(this.link)
      this.$store.commit('showSliderItem', this.link)
      this.$emit('goToRestaurant', this.link)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
