<template lang="html">
  <div class="content">

    <categories-container
      @editCategory = "$emit('editCategory')"
    />

    <div class="dash-cont">
      <span class="dash"/>
    </div>
    <utilities-container
      :request_utilities="{add_button: true}"
      :add_button_text="'ADD CATEGORY'"
      :alerts="[]"
      :hints="[]"
      @callAddButton="$emit('createCategory')"
    />
    <!-- <div class="settings">
      <ul>
        <li v-for="i in 10" :key="i">
          <div class="utils add-button admin-box">
            <div class="title-cont">
              <div class="title">
                <span>ADD CATEGORY</span>
              </div>
              <div class="ico">
                <img src="@/assets/icons/admin-icons/plus.png" alt="">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="utils alert admin-box">
            <div class="title-cont">
              <div class="title">
                <span>ALERTS</span>
              </div>
              <div class="ico">
                <img src="@/assets/icons/admin-icons/alert.png" alt="">
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="utils hint admin-box">
            <div class="title-cont">
              <div class="title">
                <span>HINTS</span>
              </div>
              <div class="ico">
                <img src="@/assets/icons/admin-icons/hint.png" alt="">
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import CategoriesContainer from"@/components/dashboard/settings_pannel/content_blocks/categories/CategoriesContainer.vue"
import UtilitiesContainer from "@/components/dashboard/settings_pannel/content_blocks/utilities/UtilitiesContainer.vue"

export default {
  components:{
    CategoriesContainer,
    UtilitiesContainer
  },
}
</script>

<style lang="css" scoped>
</style>
