<template lang="html">
  <div class="content">

    <dishes-container
      @editDish="editDish"
    />

    <div class="dash-cont">
      <span class="dash"/>
    </div>
    <utilities-container
      :request_utilities="{filters: true, add_button: true}"
      :add_button_text="'ADD DISH'"
      :alerts="[]"
      :hints="[]"
      @callAddButton="$emit('createDish')"
    />
  </div>
</template>

<script>
import DishesContainer from "@/components/dashboard/settings_pannel/content_blocks/dishes/DishesContainer.vue"
import UtilitiesContainer from "@/components/dashboard/settings_pannel/content_blocks/utilities/UtilitiesContainer.vue"
export default {
  components:{
    DishesContainer,
    UtilitiesContainer,
  },
  methods:{
    editDish(){
      console.log("gavno")
      console.log()
      this.$emit('editDish', 'EDIT_RESTAURANT')
    }
  }
}
</script>

<style lang="css" scoped>
</style>
