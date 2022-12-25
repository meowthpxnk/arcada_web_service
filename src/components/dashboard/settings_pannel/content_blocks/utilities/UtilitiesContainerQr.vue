<template lang="html">
  <div class="settings">
    <ul>
      <li class="admin-box qr-util-tg utils">
        <qr-desk-tg-channel-util/>
      </li>
      <li class="admin-box qr-util-enable utils">
        <qr-switcher-util/>
      </li>
      <li>
        <add-button
          :text="add_button_text"
          v-if="request_utilities.add_button === true"
          @click="callAddButton"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import AddButton from "@/components/dashboard/settings_pannel/content_blocks/utilities/elements/AddButton.vue"
import QrDeskTgChannelUtil from "@/components/dashboard/settings_pannel/content_blocks/qr-desks/QrDeskTgChannelUtil.vue"
import QrSwitcherUtil from "@/components/dashboard/settings_pannel/content_blocks/qr-desks/QrSwitcherUtil.vue"
export default {
  components:{
    AddButton,
    QrDeskTgChannelUtil,
    QrSwitcherUtil,
  },
  props:{
    request_utilities: Object,
    alerts: Array,
    hints: Array,
    add_button_text: String,
  },
  methods:{
    callAddButton(){
      this.$emit('callAddButton')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
