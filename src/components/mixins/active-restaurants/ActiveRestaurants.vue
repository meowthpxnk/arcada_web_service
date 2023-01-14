<template lang="html">
  <div class="another-restaurants-list">
    <ul>
      <li v-for="(restaurant, idx) in restaurants_dump" :key="restaurant.link" :class="{'first': (idx===0)}">
        <active-restaurant-item
          :title="restaurant.title"
          :link="restaurant.link"
          :id="restaurant.id"
          :logo="restaurant.logo"
          :color="restaurant.color"
          :start_work="restaurant.start_work"
          :end_work="restaurant.end_work"
          :isOpened="restaurant.isOpened"
          @goToRestaurant="goToRestaurant"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import ActiveRestaurantItem from "@/components/mixins/active-restaurants/ActiveRestaurantItem.vue"
import { checkTime, getUTCTime } from "@/methods/time.js"
export default {
  async mounted(){
    const utcTime = await getUTCTime()
    console.log(123)
    let restaurants;
    console.log("restaurantsrestaurantsrestaurants")

    if (this.code === "ANOTHER"){
      restaurants = await this.$store.getters.getAnotherRestaurants

    } else if(this.code === "FROM_ORDER") {
      const delay = ms => new Promise(res => setTimeout(res, ms));
      while(!(window.ymaps)){
        await delay(100);
      }
      await delay(500);
      await this.$store.dispatch("fetchGetOrder", this.$route.params.id)
      restaurants = await this.$store.getters.getOrderRestaurantsList
    } else {
      restaurants = await this.$store.getters.getRestaurantsList
    }
    if (!(restaurants.length)){
      this.$emit("notRestaurants")
    }
    for (const restaurant of restaurants){
      const restaurant_time = {
        start_work: restaurant.start_work,
        end_work: restaurant.end_work,
      }
      const isOpened = checkTime(utcTime, restaurant_time)
      restaurant.isOpened = isOpened
    }

    this.restaurants_dump = restaurants.sort((a, b) => Number(b.isOpened) - Number(a.isOpened))

    if(restaurants.length > 0){
      if(restaurants.filter(item => item.isOpened === true).length === 0){
        this.$emit("setOfflineAllRestaurants")
      } else {
        this.$emit("setOnlineRestaurants")
      }
    } else {
      this.$emit("emptyRestaurantsList")
    }
  },



  data(){
    return{
      restaurants_dump: [],
    }
  },
  components:{
    ActiveRestaurantItem
  },
  methods:{
    goToRestaurant(link){
      this.$emit("goToRestaurant", link)
    },
    declineModal(){
      this.$store.commit('declineModal');
    },
    async acceptModal(){
      window.open("/" + this.link)
    },
  },
  props:{
    code: String,
  },
}
</script>

<style lang="css" scoped>
</style>
