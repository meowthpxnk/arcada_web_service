<template lang="html">
  <div class="modal-quest" @click.self="declineModal">
    <div class="container-modal-info">
      <div class="quest">
        <span>Спасибо что заказали в нашем ресторане! Заказ будет доставлен в ближайшее время!</span>
      </div>
      <div class="quest" v-if="showText">
        <span>Вы так же можете заказать еду в других наших ресторанах</span>
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
      this.$store.commit('disableModalOrderConfirmed');
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
