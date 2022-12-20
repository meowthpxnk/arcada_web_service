<template lang="html">

  <div class="home-view">
    <div class="home-view-container">
      <div class="title" v-if="showInfo">
        <span>{{show_text}}</span>
      </div>
      <active-restaurants
        v-if="showRestaurants"
        :code="'ALL'"
        @setOfflineAllRestaurants="setOfflineAllRestaurants"
        @setOnlineRestaurants="setOnlineRestaurants"
        @emptyRestaurantsList="emptyRestaurantsList"
        @goToRestaurant="goToRestaurant"
      />
    </div>
  </div>
</template>

<script>
import ActiveRestaurants  from '@/components/mixins/active-restaurants/ActiveRestaurants.vue'
export default{
  async mounted(){

    document.title = document.title + " Restaurants";
    console.log(document)
    await this.$store.dispatch("fetchRestaurants")
    this.showRestaurants = true
  },
  components:{
    ActiveRestaurants,
  },
  data(){
    return{
      showInfo: false,
      show_text: '',
      showRestaurants: false,
    }
  },
  methods:{
    goToRestaurant(link){
      window.location.href="/restaurants/" + link
    },
    setOfflineAllRestaurants(){
      console.log(1)
      this.showInfo = true
      this.show_text = 'К сожалению все наши рестораны на данный момент закрыты.'
    },
    setOnlineRestaurants(){
      console.log(2)
      this.showInfo = true
      this.show_text = 'Добро пожаловать! Выберите ресторан в котором хотите заказать еду.'
    },
    emptyRestaurantsList(){
      console.log(3)
      this.showInfo = true
      this.show_text = "Пока, к сожалению, мы не открыли ни одного ресторана. Но скоро мы это исправим."
    }
  },
  computed:{
    isShownSliderItem(){
      return this.$store.getters.isShownSliderItem
    }
  },
}
</script>

<style lang="css" scoped>

</style>
