<template lang="html">
  <div class="modal-quest" @click.self="declineModal">
    <div class="container-modal-info">
      <div class="closed-info" :style="{'background-color': getRestaurant.color}">
        <div class="title">
          <span>
            Ресторан закрыт
          </span>
        </div>
        <div class="time">
          Откроется в {{parseOpenTime}}
        </div>
      </div>
      <div class="quest" v-if="showText">
        <span v-if="isAllRestaurantsClosed">К сожалению все наши рестораны на данный момент закрыты</span>
        <span v-else>Но вы можете заказать еду в других наших ресторанах!</span>
      </div>
      <active-restaurants
        :code="'ANOTHER'"
        @setOfflineAllRestaurants="setOfflineAllRestaurants"
        @setOnlineRestaurants="setOnlineRestaurants"
      />
    </div>
  </div>
</template>

<script>
import {parseTime} from "@/methods/additional.js"
import { goToRestaurant } from '@/methods/navigation.js'
import  ActiveRestaurants  from '@/components/mixins/active-restaurants/ActiveRestaurants.vue'

export default {
  data(){
    return{
      isAllRestaurantsClosed: false,
      showText: false,
    }
  },
  async mounted(){


  },
  methods:{
    declineModal(){
      this.$store.commit('disableModalClosedRestaurant');
    },
    async acceptModal(){
      goToRestaurant(this.link)
    },
    setOfflineAllRestaurants(){
      this.isAllRestaurantsClosed = true
      this.showText = true
    },
    setOnlineRestaurants(){
      this.showText = true
    }
  },
  computed:{
    link(){
      return this.$store.getters.getSliderLink
    },
    getRestaurant(){
      console.log(this.$store.getters.getRestaurant.color)
      return this.$store.getters.getRestaurant
    },
    parseOpenTime(){
      return parseTime(this.getRestaurant.start_work)
    }
  },
  components:{
    ActiveRestaurants
  },
}
</script>

<style lang="css" scoped>
</style>
