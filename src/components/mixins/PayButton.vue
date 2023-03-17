<template lang="html">
  <div class="pay-buttons-container">
    <div class="menu-button-mixin-wrap">
      <div class="menu-button menu-button-mixin">
        <button @click="backToMenu">НАзад</button>
      </div>
    </div>
    <div v-show="cartPrice>0" class="button-mixin-wrap">
      <div class="pay-button button-mixin">
        <button @click="payButton">подтвердить {{calculatePrice}}Р</button>
      </div>
    </div>
  </div>
</template>

<script>
import { goToOrder, goToPay } from '@/methods/navigation.js'
import { fetchWorldTimeForRestaurant } from '@/methods/time.js'

import {validateOrderInfo} from "@/methods/order.js"
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

      if ((this.cartPrice < this.free_del_price)&&(this.$store.getters.isDelivery)){
        checkPrice += this.delivery_fee + this.$store.getters.getOrderTaxes
      }

      const rubles = (checkPrice/100)
      var pennies = (checkPrice%100)
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

      console.log("pay button clicked")

      const cart = this.$store.getters.cartGetCommand
      const is_delivery = this.$store.getters.isDelivery
      const user_data = this.$store.getters.getUserData
      const comment = this.$store.getters.getCartComment
      const restaurant = this.$store.getters.getRestaurant
      const delivery_time = this.$store.getters.getDeliveryTime


      const isRestaurantOnline = await fetchWorldTimeForRestaurant(restaurant)

      if (isRestaurantOnline){

        let delivery_type = "DELIVERY"

        if (!(is_delivery)){
          delivery_type = "PICKUP"
        }

        const info = {
          order: {
            cart: cart,
            comment: comment,
            delivery_type: delivery_type,
            link: restaurant.link,
            delivery_time: delivery_time,
          },
          user_data: user_data,
          restaurant: restaurant,
        }
        const result = await validateOrderInfo(info)
        console.log(result)
        if (result.errors.length === 0){
          this.$store.commit("clearCart")
          console.log(result.info)
          await goToOrder(result.info.order_id)
        } else {
          this.$store.commit("enableModalErrorOrder", result.errors)

        }
      } else {
        this.$store.commit("enableModalClosedRestaurant")
      }

      this.$store.commit("disablePreloaderAnswer")
    },
    backToMenu(){
      this.$emit("backToMenu")
      this.$store.commit('disableSlider')
    }
  },
  emits:["backToMenu"],
}
</script>

<style lang="css" scoped>
</style>
