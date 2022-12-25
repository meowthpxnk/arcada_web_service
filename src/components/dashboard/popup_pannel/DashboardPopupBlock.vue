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
          @closePopup="$emit('closePopup')"
        />
        <popup-create-dish-block
          v-if="popup.id === 'CREATE_DISH'"
          @closePopup="$emit('closePopup')"
        />
        <popup-edit-dish-block
          v-if="popup.id === 'EDIT_DISH'"
          @closePopup="$emit('closePopup')"
        />
        <popup-create-restaurant-block
          v-if="popup.id === 'CREATE_RESTAURANT'"
          @closePopup="closePopup"
        />
        <popup-edit-desk-block
          v-if="popup.id === 'EDIT_DESK'"
          @closePopup="closePopup"
        />
        <popup-create-desk-block
          v-if="popup.id === 'CREATE_DESK'"
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
import PopupEditDeskBlock from "@/components/dashboard/popup_pannel/popup_blocks/PopupEditDeskBlock.vue"
import PopupCreateDeskBlock from "@/components/dashboard/popup_pannel/popup_blocks/PopupCreateDeskBlock.vue"
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
    PopupCreateDeskBlock,
    PopupEditDeskBlock,
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
