<template lang="html">
  <div class="call-to-waiter-button">
    <button @click="callButton">
      <span v-if="waiting_time <=0">
        позвать официанта
      </span>
      <span v-else style="color: var(--color-bg-extra-light)">
        {{waiting_time_txt}}
      </span>
    </button>
  </div>
</template>

<script>
function parseSecondsToMinutes(seconds){
  const seconds_txt = seconds%60
  const minutes_txt = (seconds - seconds_txt) / 60
  let minutes_txt_dump, seconds_txt_dump
  if (seconds_txt < 10) {
    seconds_txt_dump = "0" + seconds_txt.toString()
  } else {
    seconds_txt_dump = seconds_txt.toString()
  }

  if (minutes_txt < 10) {
    minutes_txt_dump = "0" + minutes_txt.toString()
  } else {
    minutes_txt_dump = minutes_txt.toString()
  }
  return minutes_txt_dump + ":" + seconds_txt_dump
}

import { fetchWorldTimeForRestaurant } from '@/methods/time.js'

export default {
  methods: {
    async callButton(){
      if (this.waiting_time <= 0){
        this.$store.commit("enablePreloaderAnswer")
        const restaurant = this.$store.getters.getRestaurant
        const isRestaurantOnline = await fetchWorldTimeForRestaurant(restaurant)
        if (isRestaurantOnline){

          try{
            await this.$store.dispatch('fetchCheckPrivateKey', restaurant.link)
          } catch(e){
            this.$store.commit("enableErrorQRModalPrivateKey")
            throw new Error('NOT_ACTIVE_PRIVATE_KEY')
          }

          let result;
          try {
            result = await this.$store.dispatch("fetchQRCallTheWaiter")
          } catch(e){
            this.$store.commit("enableErrorQRModalSendMessage")
            throw new Error('ERROR_SEND_MESSAGE')
          }
          console.log(result)

          switch(result.status){
            case 'WAITING':
              this.$store.commit("enableQRPopupWaiterCall")
              console.log(result.waiting_time)
              break;

            case 'SUCCESS':
              this.$store.commit("enableQRPopupWaiterCall")

              console.log(result.delta)
              break
            default:
              this.$store.commit("enableErrorQRUnknown")
              throw new Error('BAD_ASWER')
          }

        } else {
          this.$store.commit("enableModalClosedRestaurant")
        }

        this.$store.commit("disablePreloaderAnswer")
      }
    },
  },
  computed:{
    waiting_time(){
      return this.$store.getters.getQRWaitingTime
    },
    waiting_time_txt(){
      return parseSecondsToMinutes(this.waiting_time)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
