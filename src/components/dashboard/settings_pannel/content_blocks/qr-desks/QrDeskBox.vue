<template lang="html">
  <div class="desk admin-box">

    <div class="title">
      <div class="text">
        Desk number {{desk.number}}
      </div>
      <div class="edit-button">
        <button>
          <img src="@/assets/icons/admin-icons/edit.png" alt="">
        </button>
      </div>
    </div>
    <div class="link">
      <div class="text">
        <span>{{link}}</span><span class="key">{{desk.key}}</span>
      </div>
      <div class="copy-button">
        <button @click.stop="copyText">
          <img src="@/assets/icons/admin-icons/copy.png" alt="">
        </button>
      </div>
    </div>
  </div>

</template>

<script>
const api_url = require('@/settings.js').api_url
import {parsePrice} from "@/methods/additional.js"
export default {
  props:{
    desk: Object,
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
      const path = api_url + this.dish.photo
      console.log(path)
      return path
    },
    link(){
      return location.origin + "/redirectQR/"
    },
  },
  methods:{
    copyText(){
      navigator.clipboard.writeText(this.link + this.desk.key)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
