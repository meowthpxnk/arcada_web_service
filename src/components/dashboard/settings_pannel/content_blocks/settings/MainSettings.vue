<template lang="html">
  <div class="settings-block admin-box">
    <div class="title">
      <span>Main settings</span>
    </div>
    <div class="setting-content">
      <div class="util">
        <div class="util-title">
          Restaurant name
        </div>
        <div class="util-content">
          <input
            type="text"
            placeholder="Restaurant name"
            v-model="title"
            class="util-box"
          />
        </div>
      </div>
      <div class="util">
        <div class="util-title">
          Opening hours
        </div>
        <div class="util-content opening-hours">
          <input type="text" maxlength="5" v-model="start_work" placeholder="HH:MM">
          <input type="text" maxlength="5" v-model="end_work" placeholder="HH:MM">
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
    this.start_work = parseTime(active_restaurant.start_work)
    this.end_work = parseTime(active_restaurant.end_work)
    this.title = active_restaurant.title

    this.start_work_old = parseTime(active_restaurant.start_work)
    this.end_work_old = parseTime(active_restaurant.end_work)
    this.title_old = active_restaurant.title
  },
  data(){
    return{
      start_work: '',
      end_work: '',
      title: '',

      start_work_old: '',
      end_work_old: '',
      title_old: '',
      submitting_status: false,
    }
  },
  computed:{
    isChanged(){
      return((this.start_work_old !== this.start_work)|(this.end_work_old !== this.end_work)|(this.title_old !== this.title))
    }
  },
  methods: {
    async submitClick(){
      if (this.submitting_status === false){
        const restaurant = {
          start_work: parseTimeFromString(this.start_work),
          end_work: parseTimeFromString(this.end_work),
          title: this.title,
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
      this.title = restaurant.title
      this.start_work = parseTime(restaurant.start_work)
      this.end_work = parseTime(restaurant.end_work)

      this.title_old = restaurant.title
      this.start_work_old = parseTime(restaurant.start_work)
      this.end_work_old = parseTime(restaurant.end_work)
    }

  }
}
</script>

<style lang="css" scoped>
</style>
