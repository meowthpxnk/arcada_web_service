<template lang="html">
  <div class="settings">
    <ul>
      <li>
        <add-button
          :text="add_button_text"
          v-if="request_utilities.add_button === true"
          @click="callAddButton"
        />
      </li>
      <li>
        <filters-utility
          v-if="request_utilities.filters === true"
        />
      </li>
      <li>
        <alerts-utility
          v-if="alerts.length !== 0"
        />
      </li>
      <li>
        <hints-utility
          v-if="hints.length !== 0"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import AddButton from "@/components/dashboard/settings_pannel/content_blocks/utilities/elements/AddButton.vue"
import AlertsUtility from "@/components/dashboard/settings_pannel/content_blocks/utilities/elements/AlertsUtility.vue"
import HintsUtility from "@/components/dashboard/settings_pannel/content_blocks/utilities/elements/HintsUtility.vue"
import FiltersUtility from "@/components/dashboard/settings_pannel/content_blocks/utilities/elements/FiltersUtility.vue"
export default {
  components:{
    AddButton,
    AlertsUtility,
    HintsUtility,
    FiltersUtility,
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
