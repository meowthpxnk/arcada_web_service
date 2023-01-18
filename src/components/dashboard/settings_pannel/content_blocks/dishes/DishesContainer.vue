<template lang="html">
  <div class="main dish-adm">
    <ul>
      <li v-for="dish in dishes" :key="dish.id" @click="editDish(dish.id)">
        <dish-box :dish = "dish"/>
      </li>
    </ul>
  </div>
</template>

<script>
import DishBox from "@/components/dashboard/settings_pannel/content_blocks/dishes/DishBox.vue"

export default {
  components:{
    DishBox
  },
  computed:{
    dishes(){
      let dishes = this.$store.getters.getDashboardDishes
      const categories = this.$store.getters.getDashboardCategories
      const filters = this.$store.getters.getDashboardDishesFilters
      console.log(dishes)
      console.log(categories)
      console.log(filters)
      if (filters.category_id) {
        dishes = dishes.filter(item => item.category_id === filters.category_id)
      }
      console.log(dishes)
      if (filters.text) {
        dishes = dishes.filter(item => item.title.toLowerCase().indexOf(filters.text.toLowerCase()) === 0)
      }
      console.log(dishes)
      return dishes
    },
  },
  methods:{
    editDish(id){
      this.$emit('editDish')
      this.$store.commit('setActiveDish', id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
