<template lang="html">
  <div class="admin-panel-container">
    <dashboard-main-pannel
      :restaurants = "restaurants"
      @setActiveRestaurant = "setActiveRestaurant"
      @changeTurnOfRestaurant="changeTurnOfRestaurant"
      @createRestaurant = "$emit('openPopUp', 'CREATE_RESTAURANT')"
    />

    <dashboard-settings-pannel
      @createDish = "$emit('openPopUp', 'CREATE_DISH')"
      @createCategory = "$emit('openPopUp', 'CREATE_CATEGORY')"
      @editDish = "$emit('openPopUp', 'EDIT_DISH')"
      @editCategory = "$emit('openPopUp', 'EDIT_CATEGORY')"
      @createDesk = "$emit('openPopUp', 'CREATE_DESK')"
      @editDesk = "$emit('openPopUp', 'EDIT_DESK')"
    />

  </div>
</template>

<script>
import DashboardMainPannel from "@/components/dashboard/DashboardMainPannel.vue"
import DashboardSettingsPannel from "@/components/dashboard/DashboardSettingsPannel.vue"
export default {
  methods:{
    async setActiveRestaurant(id){
      this.$store.dispatch("setActiveRestaurant", id)
    },
    async changeTurnOfRestaurant(id){
      this.$store.dispatch("postChangeTurnOfRestaurant", id)
    },
    editDish(){
      console.log("gavnoaaa")
      // console.log(id)
      console.log("id")
      this.$emit('openPopUp', 'EDIT_DISH')
    }
  },
  computed: {
    restaurants(){
      return this.$store.getters.getDashboardRestaurants
    }
  },
  components:{
    DashboardMainPannel,
    DashboardSettingsPannel,
  }
}
</script>

<style lang="css" scoped>
</style>
