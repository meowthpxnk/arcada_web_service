<template lang="html">
  <div class="content">
    <qr-desks-container
      @editDesk = "$emit('editDesk')"
    />

    <div class="dash-cont">
      <span class="dash"/>
    </div>

    <utilities-container-qr
      :request_utilities="{add_button: true}"
      :add_button_text="'ADD TABLE'"
      :alerts="[]"
      :hints="[]"
      @callAddButton="$emit('createDesk')"
    />
  </div>
</template>

<script>
import QrDesksContainer from"@/components/dashboard/settings_pannel/content_blocks/qr-desks/QrDesksContainer.vue"
import UtilitiesContainerQr from "@/components/dashboard/settings_pannel/content_blocks/utilities/UtilitiesContainerQr.vue"

export default {
  components:{
    QrDesksContainer,
    UtilitiesContainerQr
  },
}
</script>

<style lang="css" scoped>
</style>
