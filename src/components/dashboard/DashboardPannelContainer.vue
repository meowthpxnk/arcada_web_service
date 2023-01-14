<template lang="html">
  <dashboard-pannel-block
    @openPopUp="openPopUp"
  />
  <dashboard-popup-block :popup="popup" @closePopup="closePopup"/>
  <error-popup v-if="isDashboardErrorEnabled"/>
  <!-- <a class="test-svg" src="@/assets/icons/admin-icons/alert.png" alt=""></svg> -->
</template>

<script>
import DashboardPopupBlock from "@/components/dashboard/popup_pannel/DashboardPopupBlock.vue"
import DashboardPannelBlock from "@/components/dashboard/DashboardPannelBlock.vue"
import ErrorPopup from "@/components/dashboard/ErrorPopup.vue"
import {parseAddress} from "@/methods/address.js"
// import {isHexValidColor} from "@/methods/additional.js"
export default {
  components:{
    DashboardPopupBlock,
    DashboardPannelBlock,
    ErrorPopup,
  },
  data(){
    return{
      popup: {is_shown: false, id: null},
    }
  },
  methods:{
    async openPopUp(id){
      this.popup.is_shown = true
      this.popup.id = id

      console.log("getting address")
      const path = "Усадебная 22, Комсомольск-на-Амуре"
      console.log(path)
      const address = await parseAddress(path)
      console.log("getted address")
      console.log(address.coords)

    },
    closePopup(){
      this.popup.is_shown = false
      this.popup.id = null
    },
  },
  computed:{
    isDashboardErrorEnabled(){
      return this.$store.getters.getIsDashboardErrorEnabled
    }
  }
}
</script>

<style lang="css" scoped>
</style>
