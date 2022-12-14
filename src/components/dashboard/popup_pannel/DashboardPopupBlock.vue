<template lang="html">
  <div class="pop-up-win" v-show="popup.is_shown" @mousedown.self="$emit('closePopup')">
    <div class="windors">
      <div class="win-box admin-box">
        <popup-create-category-block
          v-if="popup.id === 'CREATE_CATEGORY'"
          @closePopup="$emit('closePopup')"
        />
        <popup-edit-category-block
          v-if="popup.id === 'EDIT_CATEGORY'"
          :title="'Салаты'"
          @closePopup="$emit('closePopup')"
        />
        <popup-create-dish-block
          v-if="popup.id === 'CREATE_DISH'"
          @closePopup="$emit('closePopup')"
        />
        <popup-edit-dish-block
          v-if="popup.id === 'EDIT_DISH'"
          :title="'Гамбургер РАКЕТА'"
          @closePopup="$emit('closePopup')"
        />
        <popup-create-restaurant-block
          v-if="popup.id === 'CREATE_RESTAURANT'"
          @closePopup="closePopup"
        />
      </div>
    </div>
  </div>
</template>

<script>
import PopupCreateCategoryBlock from "@/components/dashboard/popup_pannel/popup_blocks/PopupCreateCategoryBlock.vue"
import PopupEditCategoryBlock from "@/components/dashboard/popup_pannel/popup_blocks/PopupEditCategoryBlock.vue"
import PopupCreateDishBlock from "@/components/dashboard/popup_pannel/popup_blocks/PopupCreateDishBlock.vue"
import PopupEditDishBlock from "@/components/dashboard/popup_pannel/popup_blocks/PopupEditDishBlock.vue"
import PopupCreateRestaurantBlock from "@/components/dashboard/popup_pannel/popup_blocks/PopupCreateRestaurantBlock.vue"
export default {
  props: {
    popup: Object,
  },
  components: {
    PopupCreateCategoryBlock,
    PopupCreateDishBlock,
    PopupCreateRestaurantBlock,
    PopupEditDishBlock,
    PopupEditCategoryBlock,
  },
  methods:{
    closePopup(){
      this.$emit('closePopup')
    }
  },
}
</script>

<style lang="css" scoped>
</style>
