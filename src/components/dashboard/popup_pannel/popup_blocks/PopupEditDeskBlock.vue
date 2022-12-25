<template lang="html">
  <div class="title">
    {{number}}
  </div>
  <div class="utilities">
    <ul>
      <li>
        <div class="title">
          <span>Desk number *</span>
        </div>
        <div class="content">
          {{number}}
        </div>
      </li>

      <li>
        <div class="delete-button">
          <button class="util-box" @click="deleteClicked">Delete desk</button>
        </div>
      </li>
    </ul>
    <div class="bg-test" :class="{'active' : submitting_status}">
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    </div>
  </div>
</template>

<script>
const api_url = require('@/settings.js').api_url
import {categories} from '@/methods/static'
export default {
  mounted(){
    const active_desk = this.$store.getters.getActiveDesk
    console.log("active_desk")
    console.log(active_desk)
    this.number = active_desk.number
    this.key = active_desk.key

  },
  emits: ["closePopup"],

  data(){
    return{
      number: 0,
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
        try{
          await this.$store.dispatch('fetchDashboardDeleteDesk', this.key)
          this.$emit('closePopup')
        } catch(e){
          console.error(e)
        }
        this.submitting_status = false
      }
    },
  },
}
</script>

<style lang="css" scoped>
</style>
