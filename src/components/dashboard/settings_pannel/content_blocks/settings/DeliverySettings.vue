<template lang="html">
  <div class="settings-block admin-box">
    <div class="title">
      <span>Delivery settings</span>
    </div>
    <div class="setting-content">
      <div class="util">
        <div class="util-title">
          Delivery fee
        </div>
        <div class="util-content">
          <input
            type="number"
            placeholder="Restaurant name"
            v-model="delivery_fee"
            class="util-box"
          />
        </div>
      </div>
      <div class="util">
        <div class="util-title">
          Free delivery price
        </div>
        <div class="util-content">
          <input
            type="number"
            placeholder="Restaurant name"
            v-model="free_delivery_price"
            class="util-box"
          />
        </div>
      </div>
      <div v-if="isChanged" class="submit-button" @click="submitClick">
        <button class="util-box">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import {parseTime, parseTimeFromString} from "@/methods/additional.js"
export default {
  mounted(){
    const active_restaurant = this.$store.getters.getDashboardActiveRestaurant
    this.free_delivery_price = active_restaurant.free_delivery_price/100
    this.delivery_fee = active_restaurant.delivery_fee/100

    this.free_delivery_price_old = active_restaurant.free_delivery_price/100
    this.delivery_fee_old = active_restaurant.delivery_fee/100
  },
  data(){
    return{
      free_delivery_price: 0,
      delivery_fee: 0,

      free_delivery_price_old: 0,
      delivery_fee_old: 0,

      submitting_status: false,
    }
  },
  computed:{
    isChanged(){
      return((this.delivery_fee_old !== this.delivery_fee)|(this.free_delivery_price_old !== this.free_delivery_price))
    }
  },
  methods: {
    async submitClick(){
      if (this.submitting_status === false){
        const restaurant = {
          free_delivery_price: this.free_delivery_price*100,
          delivery_fee: this.delivery_fee*100,
          id: this.$store.getters.getDashboardActiveRestaurant.id
        }
        const dump = {restaurant: restaurant}

        const data = await this.$store.dispatch('postDashboardEditRestaurant', dump)
        console.log(data)

        if (data.result === 'SUCCES'){
          this.setZeroSettings(data.data.restaurant.restaurant)
        }

        this.submitting_status = false

      }
    },
    setZeroSettings(restaurant){
      this.free_delivery_price = restaurant.free_delivery_price/100
      this.delivery_fee = restaurant.delivery_fee/100

      this.free_delivery_price_old = restaurant.free_delivery_price/100
      this.delivery_fee_old = restaurant.delivery_fee/100
    }

  }
}
</script>

<style lang="css" scoped>
</style>
