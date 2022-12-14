<template lang="html">
  <div class="settings-block admin-box">
    <div class="title">
      <span>Customisation</span>
    </div>
    <div class="setting-content">
      <div class="util">
        <div class="util-title">
          Restaurant logo
        </div>
        <div class="util-content rest-logo">
          <div class="logo">
            <img :src="restLogo" alt="" v-show="isExistedFilePng">
          </div>
          <label>
            <img src="@/assets/icons/admin-icons/upload.png" alt="">
            <input type="file" accept="image/png" @change="onFileSelected">
          </label>
          <button>
            <img src="@/assets/icons/admin-icons/trash.png" alt="">
          </button>
        </div>
      </div>
      <div class="util">
        <div class="util-title">
          Main color
        </div>
        <div class="util-content main-color">
          <div class="util-box">
            <div class="color"
              :style="{'background-color': getBackgroundColor}"
            />
            <div class="code">
              <input type="text" v-model="color">
            </div>
          </div>
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
    this.color = active_restaurant.color
    this.logo = active_restaurant.logo

    this.color_old = active_restaurant.color
    this.logo_old = active_restaurant.logo
  },
  data(){
    return{
      color: '',
      logo: '',

      color_old: '',
      logo_old: '',
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
      return((this.color_old !== this.color)|(this.selFile.file !== null))
    },
    getBackgroundColor(){
      if (isHexValidColor(this.color)){
        return this.color
      }
      return '#FFFFFF'
    },
    isExistedFilePng(){
      if ((this.selFile.url == null)&(this.logo)){
        return false
      }
      return true
    },
    restLogo(){
      if(this.selFile.url){
        return this.selFile.url
      }
      return server_url + this.logo
    }
  },
  methods: {
    async submitClick(){
      if (this.submitting_status === false){
        const restaurant = {
          color: this.color,
          // logo: parseTimeFromString(this.end_work),
          id: this.$store.getters.getDashboardActiveRestaurant.id
        }
        const file = this.getFile
        const dump = {restaurant: restaurant, file: file}

        const data = await this.$store.dispatch('postDashboardEditRestaurant', dump)
        // console.log()

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
      console.log(file)
      // console.log(this.selFile)
    },
    setZeroSettings(restaurant){
      this.color = restaurant.color
      this.logo = restaurant.logo

      this.color_old = restaurant.color
      this.logo_old = restaurant.logo
    }

  }
}
</script>

<style lang="css" scoped>
</style>
