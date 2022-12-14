<template lang="html">
  <div class="title">
    Creating restaurant
  </div>
  <div class="utilities">
    <ul>
      <li>
        <div class="title">
          <span>Restaurant title *</span>
        </div>
        <div class="content">
          <input
            type="text"
            class="set-box"
            placeholder="Enter restaurant title"
            v-model="title"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Restaurant link *</span>
        </div>
        <div class="content restaurant-link">
          <span>inlife.com</span><span>/</span>
          <input
            type="text"
            class=""
            placeholder="Enter restaurant link"
            v-model="link"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Restaurant logo</span>
        </div>
        <div class="content restaurant-logo">
          <div class="logo">
            <img :src="selFile.url" alt="" v-show="isExistedFilePng">
          </div>
          <label>
            <img src="@/assets/icons/admin-icons/upload.png" alt="">
            <input type="file" accept="image/png" @change="onFileSelected">
          </label>
          <button>
            <img src="@/assets/icons/admin-icons/trash.png" alt="">
          </button>
        </div>
      </li>
      <li>
        <div class="title">
          <span>Opening hours</span>
        </div>
        <div class="content opening-hours">
          <span>
            <input type="text" placeholder="HH:MM" maxlength="5" v-model="start_work">
          </span>
          <span>
            <input type="text" placeholder="HH:MM" maxlength="5" v-model="end_work">
          </span>
        </div>
      </li>
      <li>
        <div class="title">
          <span>Main color</span>
        </div>
        <div class="content color-picker">
          <div class="input">
            <div class="color"
             :style="{'background-color':getBackgroundColor}"
            />
            <input type="text" placeholder="#FFFFFF" v-model="color">
          </div>
        </div>
      </li>
      <li>
        <div class="title">
          <span>Delivery fee</span>
        </div>
        <div class="content">
          <input
            type="number"
            class="set-box"
            placeholder="Enter delivery fee"
            v-model="delivery_fee"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Price for free delivery</span>
        </div>
        <div class="content">
          <input
            type="number"
            class="set-box"
            placeholder="Enter price for free delivery"
            v-model="price_for_free_delivery"
          >
        </div>
      </li>
    </ul>
    <div class="bg-test" :class="{'active' : submitting_status}">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
  <div class="submit-button" @click="submitClicked">
    <button>
      Submit
    </button>
  </div>
</template>

<script>
import {isFileExtentionAllowed, isHexValidColor, parseTimeFromString} from "@/methods/additional.js"
export default {
  emits: ["closePopup"],

  data(){
    return{
      title: '',
      link: '',
      selFile: {url: null, file: null},
      color: '',
      start_work: '',
      end_work: '',
      price_for_free_delivery: 0,
      delivery_fee: 0,
      submitting_status: false,
    }
  },
  methods:{
    onFileSelected(event){
      const file = event.target.files[0]
      this.selFile.url = URL.createObjectURL(file)
      this.selFile.file = file
      console.log(file)
      // console.log(this.selFile)
    },
    async submitClicked(){
      if (this.submitting_status === false){
        this.submitting_status = true
        const restaurant = {
          title: this.title,
          color: this.parseColor,
          link: this.link,
          start_work: parseTimeFromString(this.start_work),
          end_work: parseTimeFromString(this.end_work),
          delivery_fee: this.delivery_fee*100,
          price_for_free_delivery: this.price_for_free_delivery*100,
        }
        const dump = {restaurant: restaurant, file: this.selFile.file}



        const data = await this.$store.dispatch('postDashboardCreateRestaurant', dump)
        console.log(data)
        if (data.result === 'SUCCES'){
          this.$emit('closePopup')
        }
        this.submitting_status = false
      }
    },
  },
  computed:{
    getBackgroundColor(){
      if (isHexValidColor(this.color)){
        return this.color
      }
      return '#FFFFFF'
    },
    isExistedFilePng(){
      if (this.selFile.url == null){
        return false
      }
      return isFileExtentionAllowed(this.selFile.file.name, 'png')
    },
    parseColor(){
      if (isHexValidColor(this.color)){
        return this.color
      }
      return null
    },
  }
}
</script>

<style lang="css" scoped>
</style>
