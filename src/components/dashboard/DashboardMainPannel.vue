<template lang="html">
  <div class="main-panel">
    <div class="panel-logo">
      <span>InLife Admin</span>
    </div>
    <div class="restaurants-container">
      <div class="cont-list">
        <nav>
          <ul>
            <restaurant-main-pannel
              v-for="restaurant in restaurants" :key="restaurant.id"
              :title="restaurant.title"
              :is_online="restaurant.is_online"
              :logo="restaurant.logo"
              :color="restaurant.color"
              :is_active="restaurant.is_active"
              @click="setActiveRestaurant(restaurant.id)"
              @changeTurnOfRestaurant="changeTurnOfRestaurant(restaurant.id)"
            />
          </ul>
        </nav>
        <button class="restaraunt-container-element add-restaurant-button" @click="createRestaurant">
          <span class="ico">
            <img src="@/assets/icons/admin-icons/plus.png" alt="">
            <!-- <span></span> -->
          </span>
          <span>ADD RESTAURANT</span>
        </button>
      </div>
    </div>
  </div>

</template>

<script>
import RestaurantMainPannel from "@/components/dashboard/main_pannel/RestaurantMainPannel.vue"
export default {
  props:{
    restaurants: Array,
  },
  components:{
    RestaurantMainPannel
  },
  methods:{
    setActiveRestaurant(id){
      this.$emit('setActiveRestaurantNull')
      this.$emit('setActiveRestaurant', id)
    },
    changeTurnOfRestaurant(id){
      this.$emit('changeTurnOfRestaurant', id)
    },
    createRestaurant(){
      this.$emit('createRestaurant')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
