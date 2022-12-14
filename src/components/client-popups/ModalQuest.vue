<template lang="html">
  <div class="modal-quest" @click.self="declineModal">
    <div class="container-modal-info">
      <div class="quest">
        <span>
          Are you sure you want to go to the <b>https://inlife.com/restaurants/{{link}}</b>?
        </span>
      </div>
      <div class="buttons">
        <button class="decline" @click="declineModal">
          <span>decline</span>
        </button>
        <button class="accept" @click="acceptModal">
          <span>accept</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import { useRoute } from 'vue-router'

import { goToRestaurant } from '@/methods/navigation.js'

export default {
  methods:{
    declineModal(){
      this.$store.commit('declineModal');
    },
    async acceptModal(){
      // this.$router.push({name:"restaurant", params: {link: this.link}})
      goToRestaurant(this.link)
      // window.open("/restaurants/" + this.link)
      // this.$store.dispatch("")
      //
      // this.$store.commit('declineModal');
      //
      //
      //
      // const data = await this.$store.dispatch('fetchMenuItems', this.link)
      // await this.$store.dispatch('fetchCartItems', this.link)
      // await this.$emit("setZeroCats", data)
    },
  },
  computed:{
    link(){
      return this.$store.getters.getSliderLink
    }
  }
}
</script>

<style lang="css" scoped>
</style>
