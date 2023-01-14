<template lang="html">
  <restaurant-settings-pannel
    v-if="active_restaurant"
  />

  <div v-else class="inactive-settings">
    <div class="text-box">
      <span>Select restaurant for continue set up.</span>
    </div>
  </div>
</template>

<script>
import RestaurantSettingsPannel from "@/components/dashboard/settings_pannel/RestaurantSettingsPannel.vue"
export default {
  components:{
    RestaurantSettingsPannel
  },


  computed:{
    active_restaurant(){
      return this.$store.getters.getDashboardActiveRestaurant
    }
  },
}
</script>

<style lang="css" scoped>
</style>
