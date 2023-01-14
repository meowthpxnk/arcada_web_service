<template lang="html">
  <div class="modal-quest" @click.self="declineModal">
    <div class="container-modal-info order">
      <div class="closed-info order">
        <div class="title">
          <span>
            Ресторан закрыт
          </span>
        </div>
        <div class="time">
          Откроется в {{parseOpenTime}}
        </div>
      </div>
      <button @click="$emit('disbleModalRestaurantClosed')">
        OK
      </button>
    </div>
  </div>
</template>

<script>
import { parseTime } from "@/methods/additional.js"

export default {
  data(){
    return{
    }
  },
  async mounted(){


  },
  props: {
    start_work: Number,
  },
  methods:{
    setOfflineAllRestaurants(){
      this.isAllRestaurantsClosed = true
      this.showText = true
    },
    setOnlineRestaurants(){
      this.showText = true
    }
  },
  computed:{
    parseOpenTime(){
      return parseTime(this.start_work)
    }
  },
}
</script>

<style lang="css" scoped>
</style>
