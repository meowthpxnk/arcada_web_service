<template lang="html">
  <div class="dish admin-box">
    <div class="main-info">
      <div class="photo">
        <img v-if="dish.photo != null" :src="photo" alt="">
      </div>
      <div class="text">
        <div class="title">
          {{parsedTitle}}
        </div>
        <div class="price">
          <span>{{price}}₽</span>
        </div>
      </div>
    </div>
    <div class="add-info">
      <button class="edit-button">
        <img src="@/assets/icons/admin-icons/edit.png" alt="">
      </button>
    </div>
  </div>

</template>

<script>
const settings = require('@/settings.js')
const server_url = settings.proxy.url
// console.log(settings)
import {parsePrice} from "@/methods/additional.js"
export default {
  props:{
    dish: Object,
  },
  computed:{
    parsedTitle(){
      if (this.dish.title.length>26){
        return this.dish.title.substr(0,26) + '...'
      }
      return this.dish.title
    },
    price(){
      return parsePrice(this.dish.price)
    },
    photo(){
      console.log(this.dish.photo)
      const path = server_url + this.dish.photo
      console.log(path)
      return path
    },
  }
}
</script>

<style lang="css" scoped>
</style>
