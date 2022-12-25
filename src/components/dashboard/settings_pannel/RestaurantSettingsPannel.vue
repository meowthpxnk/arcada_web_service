<template lang="html">
  <!-- {{menuGetter}} -->
  <div class="settings-pannel">

    <SettingsPannelTabs
      @changeBlock="changeBlock"
      :block="block"
    />

    <menu-block v-if="block === 'MENU'"
      @createDish = "$emit('createDish')"
      @editDish = "editDish"
    />
    <categories-block v-if="block === 'CATEGORIES'"
      @editCategory = "$emit('editCategory')"
      @createCategory = "$emit('createCategory')"
    />
    <qr-menu-block v-if="block === 'QR_MENU'"
      @editDesk = "$emit('editDesk')"
      @createDesk = "$emit('createDesk')"
    />
    <settings-block v-if="block === 'SETTINGS'"/>

  </div>
</template>

<script>
import SettingsPannelTabs from "@/components/dashboard/settings_pannel/SettingsPannelTabs.vue"
import MenuBlock from "@/components/dashboard/settings_pannel/content_blocks/MenuBLock.vue"
import CategoriesBlock from "@/components/dashboard/settings_pannel/content_blocks/CategoriesBlock.vue"
import SettingsBlock from "@/components/dashboard/settings_pannel/content_blocks/SettingsBlock.vue"
import QrMenuBlock from "@/components/dashboard/settings_pannel/content_blocks/QrMenuBlock.vue"

export default {
  data(){
    return{
      block: 'MENU'
    }
  },
  methods:{
    changeBlock(block){
      this.block = block
    },
    editDish(){
      console.log("aaasda")
      this.$emit('editDish', 'EDIT_DISH')
    }
  },
  computed:{
    menuGetter(){
      return this.$store.getters.getDashboardMenu
    },
  },
  components:{
    SettingsPannelTabs,
    MenuBlock,
    CategoriesBlock,
    SettingsBlock,
    QrMenuBlock,
  },
}
</script>

<style lang="css" scoped>
</style>
