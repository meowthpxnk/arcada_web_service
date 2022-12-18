<template lang="html">
  <div class="title">
    Creating restaurant
  </div>
  <div class="utilities">
    <ul>
      <li>
        <div class="title">
          <span>Category title *</span>
        </div>
        <div class="content">
          <input
            type="text"
            class="set-box"
            placeholder="Enter the category title"
            v-model="title"
          >
        </div>
      </li>
      <li>
        <div class="title">
          <span>Category icon *</span>
        </div>
        <div class="content icon-picker">
          <div class="icon">
            <img v-if="isActiveIcon" :src="isActiveIcon" alt="">
          </div>
          <div class="picker">
            <ul>
              <li v-for="icon in icons" :key="icon" :class="{'active' : active_icon}" @click="activateIcon(icon)">
                <img :src="server_url + 'images/dish-icons/' + icon" alt="">
              </li>
            </ul>
          </div>
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
const api_url = require('@/settings.js').api_url
import {categories} from '@/methods/static'
export default {
  emits: ["closePopup"],

  data(){
    return{
      title: '',
      icons: categories,
      active_icon: null,

      submitting_status: false,
      server_url: api_url.proxy.url
    }
  },
  methods:{
    async submitClicked(){
      if (this.submitting_status === false){
        this.submitting_status = true
        const category = {
          'title': this.title,
          'restaurant_id': this.restaurant_id,
          "logo": this.active_icon
        }
        const data = await this.$store.dispatch('postDashboardCreateCategory', category)
        if (data.result === 'SUCCES'){
          this.$emit('closePopup')
        }
        this.submitting_status = false
      }
    },
    activateIcon(icon){

      if (this.active_icon === icon) {
        this.active_icon = null
      } else {
        this.active_icon = icon
      }
    },
  },
  computed:{
    isActiveIcon(){
      if (this.active_icon === null){
        return null
      } else {
        return this.server_url + 'images/dish-icons/' + this.active_icon
      }
    },
    restaurant_id(){return this.$store.getters.getDashboardActiveRestaurant.id}
  }
}
</script>

<style lang="css" scoped>
</style>
