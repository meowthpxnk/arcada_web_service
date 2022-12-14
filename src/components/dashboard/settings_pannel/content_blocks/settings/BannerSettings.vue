<template lang="html">
  <div class="settings-block admin-box">
    <div class="title">
      <span>Banner</span>
    </div>
    <div class="setting-content">
      <div class="util">
        <div class="util-title">
          Restaurant banner
        </div>
        <div class="util-content rest-banner">
          <div class="banner">
            <img v-if="restBanner" :src="restBanner" alt="" v-show="isExistedFilePng">

            <div v-else class="banner-empty">
              <span>Banner empty</span>
            </div>
          </div>
          <label>
            <img src="@/assets/icons/admin-icons/upload.png" alt="">
            <input type="file" accept="image/png" @change="onFileSelected">
          </label>
          <button @click="deleteClick">
            <img src="@/assets/icons/admin-icons/trash.png" alt="">
          </button>
        </div>
      </div>
      <div v-if="isChanged" class="submit-button" @click="submitClick">
        <button class="util-box">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
const settings = require('@/settings.js')
const server_url = settings.proxy.url
import {isHexValidColor} from "@/methods/additional.js"
export default {
  mounted(){
    const active_restaurant = this.$store.getters.getDashboardActiveRestaurant

    this.banner = active_restaurant.banner

    this.banner_old = active_restaurant.banner
  },
  data(){
    return{
      banner: '',

      banner_old: '',

      selFile: {url: null, file: null},
      submitting_status: false,
    }
  },
  computed:{
    getFile(){
      if (this.selFile.file){
        return this.selFile.file
      } else {
        console.log(this.selFile.file)
        return null
      }
    },
    isChanged(){
      console.log(this.selFile)
      return((this.color_old !== this.color)|(this.selFile.file !== null))
    },
    getBackgroundColor(){
      if (isHexValidColor(this.color)){
        return this.color
      }
      return '#FFFFFF'
    },
    isExistedFilePng(){
      if ((this.selFile.url == null)&(this.banner)){
        return false
      }
      return true
    },
    restBanner(){
      if(this.selFile.url){
        return this.selFile.url
      }
      console.log(this.banner)
      if (this.banner){
        return server_url + this.banner
      }
      return null
    }
  },
  methods: {
    async submitClick(){
      if (this.submitting_status === false){
        const file = this.getFile
        const restaurant = {
          id: this.$store.getters.getDashboardActiveRestaurant.id
        }
        const dump = {file: file, restaurant: restaurant}

        const data = await this.$store.dispatch('postDashboardSetBannerRestaurant', dump)

        console.log(data)

        if (data.result === 'SUCCES'){
          this.setZeroSettings(data.data.restaurant.restaurant)
        }

        this.submitting_status = false

      }
    },
    async deleteClick(){
      if (this.submitting_status === false){
        const restaurant = {
          id: this.$store.getters.getDashboardActiveRestaurant.id
        }
        const dump = {restaurant: restaurant}

        const data = await this.$store.dispatch('postDashboardDeleteBannerRestaurant', dump)

        console.log(data)

        if (data.result === 'SUCCES'){
          this.setZeroSettings(data.data.restaurant.restaurant)
        }

        this.submitting_status = false

      }
    },
    onFileSelected(event){
      const file = event.target.files[0]
      this.selFile.url = URL.createObjectURL(file)
      this.selFile.file = file
    },
    setZeroSettings(restaurant){
      this.banner = restaurant.banner
      this.banner_old = restaurant.banner
      this.selFile.file = null
    }

  }
}
</script>

<style lang="css" scoped>
</style>
