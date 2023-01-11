<template lang="html">
  <div class="content">
    <div class="main settings-adm">


      <main-settings/>
      <customisation-settings/>





      <delivery-settings/>
      <banner-settings/>
      <telegram-settings/>


      <div class="settings-block admin-box">
        <div class="title">
          <span>Info</span>
        </div>
        <div class="setting-content">
          <div class="util">
            <div class="util-title">
              Restaurant link
            </div>
            <div class="util-content rest-link">
              <div class="util-box link-box">
                <div class="text">
                  <span>{{getUrl}}</span>
                  <span>/</span>
                  <span class="rest-name">{{restaurant_info.link}}</span>
                </div>
                <button>
                  <img src="@/assets/icons/admin-icons/copy.png" alt="">
                </button>
              </div>
            </div>
          </div>
          <div class="delete-button">
            <button class="util-box" @click="deleteRestaurant">Delete restaurant</button>
          </div>
        </div>
      </div>


    </div>
  </div>
</template>

<script>
import { parseTime } from "@/methods/additional.js"
import MainSettings from "@/components/dashboard/settings_pannel/content_blocks/settings/MainSettings.vue"
import DeliverySettings from "@/components/dashboard/settings_pannel/content_blocks/settings/DeliverySettings.vue"
import CustomisationSettings from "@/components/dashboard/settings_pannel/content_blocks/settings/CustomisationSettings.vue"
import BannerSettings from "@/components/dashboard/settings_pannel/content_blocks/settings/BannerSettings.vue"
import TelegramSettings from "@/components/dashboard/settings_pannel/content_blocks/settings/TelegramSettings.vue"
export default {
  computed:{
    getUrl(){return location.origin + "/restaurants"},
    restaurant_info(){
      return this.$store.getters.getDashboardActiveRestaurant
    },
    start_work(){
      return parseTime(this.restaurant_info.start_work)
    },
    end_work(){
      return parseTime(this.restaurant_info.end_work)
    },
  },
  components:{
    MainSettings,
    CustomisationSettings,
    DeliverySettings,
    BannerSettings,
    TelegramSettings,
  },
  methods:{
    deleteRestaurant(){
      this.$store.dispatch("postDashboardDeleteRestaurant", this.$store.getters.getDashboardActiveRestaurant.id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
