<template lang="html">
  <div class="dishes" :class="{'cart-active': cartPrice}">
    <nav>
      <div class="dishes-container">
        <ul>
          <li v-for="dish in filter" :key="dish.id">
            <menu-item
              :dish="dish"
              :cart="cart"
              @addItemToCart="addItemToCart"
              @minusCartItem="minusCartItem"
              @plusCartItem="plusCartItem"
              @setActiveDish="setActiveDish"

            />
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import MenuItem from "@/components/menu/MenuItem.vue"
export default {
  props:{
    dishes: Array,
    cart: Array,
    cartPrice: Boolean,
  },
  computed:{
    filter(){
      const dishes = this.dishes
      const key = 'title'; // ключ, по которому будем сортировать
      const sorted = dishes.sort((frst, sec) => frst[key] > sec[key] ? 1 : -1);
      return sorted
    }
  },
  components:{
    MenuItem
  },
  methods:{
    setActiveDish(dish_id){
      this.$emit("setActiveDish", dish_id)
      this.$store.commit('disableSlider')

    },
    addItemToCart(dish_id){
      this.$emit("addItemToCart", dish_id)
      this.$store.commit('disableSlider')

    },
    plusCartItem(dish_id){
      this.$emit("plusCartItem", dish_id)
      this.$store.commit('disableSlider')

    },
    minusCartItem(dish_id){
      this.$emit("minusCartItem", dish_id)
      this.$store.commit('disableSlider')

    }
  },
  emits: [
    'addItemToCart', "minusCartItem", "plusCartItem", "setActiveDish"
  ],

}
</script>

<style lang="css" scoped>
</style>
