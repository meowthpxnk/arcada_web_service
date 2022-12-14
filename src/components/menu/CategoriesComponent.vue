<template lang="html">
  <!-- aa -->
  <div class="categories">
    <nav>
      <ul>
        <li v-for="category in categories" :key="category.id" @click="changeActiveCategory(category.id)">
          <category-item
            :category="category"
            :active_category_id="active_category_id"
          />
        </li>
      </ul>
    </nav>
  </div>

</template>

<script>
import CategoryItem from "@/components/menu/CategoryItem.vue"
export default {
  props:{
    categories: Array,
    active_category_id: Number,
  },
  created(){
  },
  methods:{
    changeActiveCategory(category_id){
      this.$emit('changeActiveCategory', category_id)
      this.$store.commit('disableSlider')

    },
  },
  components:{
    CategoryItem,
  }
}
</script>

<style lang="css" scoped>
</style>
