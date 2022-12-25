<template lang="html">
  <div class="title">
    {{title}}
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
      <li>
        <div class="delete-button">
          <button class="util-box" @click="deleteClicked">Delete category</button>
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
  mounted(){
    const active_category = this.$store.getters.getActiveCategory
    this.title = active_category.title
    this.active_icon = active_category.logo
    this.id = active_category.id
    console.log(active_category)

  },
  emits: ["closePopup"],

  data(){
    return{
      title: '',
      icons: categories,
      active_icon: null,
      id: null,

      submitting_status: false,
      server_url: api_url
    }
  },
  methods:{
    async deleteClicked(){
      if (this.submitting_status === false){
        this.submitting_status = true
        const dump = {
          restaurant_id: this.restaurant_id,
          id: this.id
        }
        const data = await this.$store.dispatch('postDashboardDeleteCategory', dump)
        if (data.result === 'SUCCES'){
          this.$emit('closePopup')
        }
        this.submitting_status = false
      }
    },
    async submitClicked(){
      if (this.submitting_status === false){
        this.submitting_status = true
        const category = {
          title: this.title,
          restaurant_id: this.restaurant_id,
          logo: this.active_icon,
          id: this.id
        }
        const data = await this.$store.dispatch('postDashboardEditCategory', category)
        console.log(data)
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
