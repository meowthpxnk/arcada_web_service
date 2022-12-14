<template lang="html">
  <!-- <div class="modal-quest" @click.self="declineModal">
    <div class="container-modal-info"> -->
      <!-- {{another_restaurants_dump}} -->
      <!-- <div class="quest">
        <span>
          Are you sure you want to go to the <b>https://inlife.com/restaurants/{{link}}</b>?
        </span>
      </div>
      <div class="buttons">
        <button class="decline" @click="declineModal">
          <span>decline</span>
        </button>
        <button class="accept" @click="acceptModal">
          <span>accept</span>
        </button>
      </div> -->

    <!-- </div>
  </div> -->
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
// import { useRoute } from 'vue-router'
import ActiveRestaurantItem from "@/components/mixins/active-restaurants/ActiveRestaurantItem.vue"
// import { fetchWorldTimeForRestaurant } from "@/methods/time.js"
import { checkTime, getUTCTime } from "@/methods/time.js"
export default {
  async mounted(){
    // console.log(this.$store.getters.getAnotherRestaurants)
    const utcTime = await getUTCTime()
    console.log(123)
    let restaurants;

    if (this.code === "ANOTHER"){
      restaurants = this.$store.getters.getAnotherRestaurants
      console.log(restaurants)

    } else if(this.code === "FROM_ORDER") {
      restaurants = this.$store.getters.getOrderRestaurantsList
      console.log(restaurants)
    } else {
      restaurants = this.$store.getters.getRestaurantsList
      console.log(restaurants)
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


    // console.log("another_restaurants")
    //
    // // this.$store.dispatch("fetchAnotherRestaurants")
    // const another_restaurants = this.$store.getters.getAnotherRestaurants
    //
    // for (const restaurant of another_restaurants){
    //   restaurant.isOpened = await fetchWorldTimeForRestaurant({start_work: restaurant.start_work, end_work: restaurant.end_work})
    // }
    // console.log(another_restaurants)

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
      // this.$router.push({name:"restaurant", params: {link: this.link}})
      window.open("/restaurants/" + this.link)
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
  },
  computed:{
    // another_restaurants(){
    //
    //   //
    //   if (this.code === "ANOTHER"){
    //     return this.$store.getters.getAnotherRestaurants
    //   }
    //   // console.log(this.$store.getters.getAnotherRestaurants)
    //   return []
    // },
    // parseRestaurantsList(){
    //   console.log(this.another_restaurants_dump)
    //   const sort_list = this.another_restaurants_dump
    //   sort_list.sort(function(x, y) {return (x.isOpened === y.isOpened)? 0 : x? -1 : 1;});
    //   return sort_list
    // },
  },
  // watch:{
  //   another_restaurants: {
  //     async handler(newValue, oldValue){
  //       console.log(oldValue)
  //       console.log(newValue)
  //
  //       const another_restaurants = this.$store.getters.getAnotherRestaurants
  //
  //       for (const restaurant of another_restaurants){
  //         restaurant.isOpened = await fetchWorldTimeForRestaurant({start_work: restaurant.start_work, end_work: restaurant.end_work})
  //       }
  //       // console.log(another_restaurants)
  //
  //       // const
  //       this.another_restaurants_dump = another_restaurants
  //
  //       if(another_restaurants.filter(item => item.isOpened === true).length === 0){
  //         this.$emit("setOfflineAllRestaurants")
  //       }
  //
  //     }
  //     // console.log(1)
  //   }
  // },
  props:{
    code: String,
  },
}
</script>

<style lang="css" scoped>
</style>
