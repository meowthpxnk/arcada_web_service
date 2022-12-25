<template lang="html">
  <div class="title">
    Creating desk
  </div>
  <div class="utilities">
    <ul>
      <li>
        <div class="title">
          <span>Desk number *</span>
        </div>
        <div class="content">
          <input
            type="text"
            class="set-box"
            placeholder="Enter the desk number"
            v-model="number"
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
const api_url = require('@/settings.js').api_url
import {categories} from '@/methods/static'
export default {
  emits: ["closePopup"],

  data(){
    return{
      number: null,
      icons: categories,
      active_icon: null,

      submitting_status: false,
      server_url: api_url,
    }
  },
  methods:{
    async submitClicked(){
      if (this.submitting_status === false){
        this.submitting_status = true
        try {
          await this.$store.dispatch('fetchDashboardCreateDesk', this.number)
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
