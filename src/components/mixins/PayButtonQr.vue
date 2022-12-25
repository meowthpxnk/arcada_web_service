<template lang="html">
  <div class="pay-buttons-container">
    <div class="menu-button-mixin-wrap">
      <div class="menu-button menu-button-mixin">
        <button @click="backToMenu">НАзад</button>
      </div>
    </div>
    <div v-show="cartPrice>0" class="button-mixin-wrap">
      <div class="pay-button button-mixin">
        <button @click="payButton">ЗАКАЗАТЬ {{calculatePrice}}Р</button>
      </div>
    </div>
  </div>
</template>

<script>
import { goToOrder, goToPay } from '@/methods/navigation.js'
import { fetchWorldTimeForRestaurant } from '@/methods/time.js'

import { validateOrderInfo } from "@/methods/order.js"
export default {
  props:{
    cartPrice: Number,
  },
  computed: {
    free_del_price(){
      const free_del_price = this.$store.getters.getRestaurant.free_delivery_price

      if (free_del_price){
        return free_del_price
      } else {
        return 0
      }
      // console.log()
    },
    delivery_fee(){
      return this.$store.getters.getDeliveryFee
    },
    calcPercents(){
      const price = this.cartPrice/this.free_del_price*100
      if (price>100){
        return 100
      } else if (price<0){
        return 0
      } else {
        return price
      }
    },
    calculateWithDelPrice(){
      const price = this.free_del_price - this.cartPrice
      if (price < 0){
        return null
      }

      const rubles = (price/100)
      var pennies = (price%100)
      // console.log(cops)
      let dump = ""
      if(pennies == 0){
        dump += rubles.toString() + '.' +"00"
      } else if(pennies<10){
        dump += (rubles-(pennies/100)).toString() + '.' + "0" + pennies.toString()
      } else {
        dump += (rubles-(pennies/100)).toString() + '.' + pennies.toString()
      }
      return dump

    },
    calculatePrice(){
      let checkPrice = this.cartPrice;

      const rubles = (checkPrice/100)
      var pennies = (checkPrice%100)
      // console.log(cops)
      let dump = ""
      if(pennies == 0){
        dump += rubles.toString() + '.' +"00"
      } else if(pennies<10){
        dump += (rubles-(pennies/100)).toString() + '.' + "0" + pennies.toString()
      } else {
        dump += (rubles-(pennies/100)).toString() + '.' + pennies.toString()
      }
      return dump
    },
  },

  methods: {
    async payButton(){
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

        try {
          const result = await this.$store.dispatch("fetchQRSendOrder")
          this.$emit("backToMenu")
          this.$store.commit('disableSlider')
        } catch(e){
          this.$store.commit("enableErrorQRModalSendMessage")
          console.error(e)
        }
      } else {
        this.$store.commit("enableModalClosedRestaurant")
      }


      this.$store.commit("disablePreloaderAnswer")
    },
    backToMenu(){
      this.$emit("backToMenu")
    }
  },
  emits:["backToMenu"],
}
</script>

<style lang="css" scoped>
</style>
