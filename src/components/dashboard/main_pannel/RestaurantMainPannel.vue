<template lang="html">
  <li class="restaraunt-container-element admin-box"
    :class="{'active': is_active}"
    :style="styleObject"
  >
    <div class="info">
      <div class="logo">
        <img :src="server_url + logo" alt="">
      </div>
      <span class="title">
        {{parseTitle}}
      </span>
    </div>
    <button @click.stop="changeTurnOfRestaurant" class="switcher" :class="[is_online ? 'active' : 'inactive']">
      <div class="circle"></div>
    </button>
  </li>
</template>

<script>
const api_url = require('@/settings.js').api_url
// const url = settings.proxy.url
import {capitalize} from "@/methods/additional.js"
export default {
  data(){
    return{
      server_url: api_url
    }
  },
  props: {
    title: String,
    is_online: Boolean,
    color: String,
    logo: String,
    is_active: Boolean,
  },
  mounted(){
    // console.log()
  },
  computed: {
    parseTitle(){
      return capitalize(this.title)
    },
    styleObject: function() {
      return {
        '--rest-main-color': this.color
      }
    }
  },
  methods:{
    changeTurnOfRestaurant(){
      // console
      console.log(3)
      this.$emit("changeTurnOfRestaurant")
    }
  }
}
</script>

<style lang="css" scoped>
</style>
