<template lang="html">
  <div class="modal-quest" @click.self="declineModal">
    <div class="container-modal-info">
      <div class="quest">
        <span>
          Хотите перейти на <b>https://{{location}}/{{link}}</b>?
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
import { goToRestaurant } from '@/methods/navigation.js'

export default {
  methods:{
    declineModal(){
      this.$store.commit('declineModal');
    },
    async acceptModal(){
      goToRestaurant(this.link)
    },
  },
  computed:{
    location(){
      return location.host
    },
    link(){
      return this.$store.getters.getSliderLink
    }
  }
}
</script>

<style lang="css" scoped>
</style>
