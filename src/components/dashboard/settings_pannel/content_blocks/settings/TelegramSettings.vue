<template lang="html">
  <div class="settings-block admin-box">
    <div class="title">
      <span>Telegram admin</span>
    </div>
    <div class="setting-content">
      <div class="util">
        <div class="util-title">
          Telegram admin id
        </div>
        <div class="util-content">
          <input class="util-box" type="text" v-model="tg_admin_id" placeholder="HH:MM">
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

    this.tg_admin_id = this.$store.getters.getTelegramAdmin
    this.tg_admin_id_old = this.$store.getters.getTelegramAdmin
  },
  data(){
    return{
      tg_admin_id: '',
      tg_admin_id_old: '',

      submitting_status: false,
    }
  },
  computed:{
    isChanged(){
      return(this.tg_admin_id_old !== this.tg_admin_id)
    }
  },
  methods: {
    // async submitClick(){
    //   if (this.submitting_status === false){
    //     const restaurant = {
    //       tg_admin_id: this.tg_admin_id,
    //       id: this.$store.getters.getDashboardActiveRestaurant.id
    //     }
    //     const dump = {restaurant: restaurant}
    //
    //     const data = await this.$store.dispatch('fetchChangeTelegramAdmin', dump)
    //     console.log(data)
    //     fetchChangeTelegramAdmin(ctx, telegram_admin_id)
    //
    //     if (data.result === 'SUCCES'){
    //       this.setZeroSettings(data.data.restaurant.restaurant)
    //     }
    //
    //     this.submitting_status = false
    //   }
    // },
    async submitClick(){
      console.log(123)
      if (this.submitting_status === false){
        this.submitting_status = true
        try {
          await this.$store.dispatch("fetchChangeTelegramAdmin", this.tg_admin_id)
          this.tg_admin_id_old = await this.tg_admin_id
        } catch(e){
          console.error(e)
        }
        this.submitting_status = false
      }
    },
    // setZeroSettings(restaurant){
    //   this.title = restaurant.title
    //   this.start_work = parseTime(restaurant.start_work)
    //   this.end_work = parseTime(restaurant.end_work)
    //
    //   this.title_old = restaurant.title
    //   this.start_work_old = parseTime(restaurant.start_work)
    //   this.end_work_old = parseTime(restaurant.end_work)
    // }

  }
}
</script>

<style lang="css" scoped>
</style>
