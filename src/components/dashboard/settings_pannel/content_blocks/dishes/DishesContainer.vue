<template lang="html">
  <div class="main dish-adm">
    <ul>
      <li v-for="dish in dishes" :key="dish.id" @click="editDish(dish.id)">
        <dish-box :dish = "dish"/>
      </li>
    </ul>
  </div>
  {{active_dish}}
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
    // active_dish(){
    //   return this.$store.getters.getActiveDish
    // }
  },
  methods:{
    editDish(id){
      console.log("aaa")
      this.$emit('editDish', 'EDIT_RESTAURANT')
      // console.log(id)
      //
      this.$store.commit('setActiveDish', id)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
