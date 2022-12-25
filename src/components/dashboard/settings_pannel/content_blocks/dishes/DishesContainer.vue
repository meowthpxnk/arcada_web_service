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
      return this.$store.getters.getDashboardDishes
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
