<template lang="html">
  <div class="main categories-adm">
    <ul>
      <li v-for="category in categories" :key="category.id" @click="editCategory(category.id)">
        <CategoryBox
          :category="category"
        />
      </li>
    </ul>
  </div>


</template>

<script>
import CategoryBox from "@/components/dashboard/settings_pannel/content_blocks/categories/CategoryBox.vue"

export default {
  computed:{
    categories(){
      return this.$store.getters.getDashboardCategories
    }
  },
  components:{
    CategoryBox
  },
  methods:{
    editCategory(id){
      this.$emit('editCategory')
      this.$store.commit('setActiveCategory', id)
    }
  },
}
</script>

<style lang="css" scoped>
</style>
