<template lang="html">
  <dashboard-pannel-container/>
  <modal-preloader-screen
    :isShownPreloader="preloader"
  />
</template>

<script>
import DashboardPannelContainer from "@/components/dashboard/DashboardPannelContainer.vue"
import ModalPreloaderScreen from "@/components/client-popups/ModalPreloaderScreen.vue"

export default {
  data(){
    return{
      preloader: true,
    }
  },
  async mounted(){
    document.title = "Dashboard";

    const API_KEY = localStorage.getItem('dashboard-API_KEY')

    if(API_KEY){
      const result = await this.$store.dispatch("fetchApiKey", API_KEY)
      console.log(result)
      if(!(result)){
        document.location.href = "/dashboard/autorisate"
      }
    } else {
      document.location.href = "/dashboard/autorisate"
    }
    console.log(this.$store.getters.getApiKey)
    await this.$store.dispatch('fetchDashboardRestaurants')
    this.preloader = await false
  },
  components:{
    DashboardPannelContainer,
    ModalPreloaderScreen
  },
}
</script>

<style lang="css" scoped>

</style>
