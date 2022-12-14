<template lang="html">
  <div class="modal-quest" @click.self="declineModal">
    <div class="container-modal-info">
      <!-- <div class="closed-info" :style="{'background-color': getRestaurant.color}">
        <div class="title">
          <span>
            Ресторан закрыт
          </span>
        </div>
        <div class="time">
          Откроется в {{parseOpenTime}}
        </div>
      </div> -->
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
// import { useRoute } from 'vue-router'
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
      // this.$router.push({name:"restaurant", params: {link: this.link}})
      goToRestaurant(this.link)
      // window.open("/restaurants/" + this.link)
      // this.$store.dispatch("")
      //
      // this.$store.commit('declineModal');
      //
      //
      //
      // const data = await this.$store.dispatch('fetchMenuItems', this.link)
      // await this.$store.dispatch('fetchCartItems', this.link)
      // await this.$emit("setZeroCats", data)
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
      // console.log(this.getRestaurant)
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
