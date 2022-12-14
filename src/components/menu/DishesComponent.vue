<template lang="html">
  <!-- aa -->
  <div class="dishes" :class="{'cart-active': cartPrice}">
    <nav>
      <div class="dishes-container">
        <ul>
          <li v-for="dish in dishes" :key="dish.id">
            <!-- {{dish.title}}
            {{dish.price}} -->
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
  components:{
    MenuItem
  },
  methods:{
    setActiveDish(dish_id){
      this.$emit("setActiveDish", dish_id)
      this.$store.commit('disableSlider')
      
    },
    addItemToCart(dish_id){
      // this.$emit("addItemToCart", dish_id)
      this.$emit("addItemToCart", dish_id)
      this.$store.commit('disableSlider')

    },
    plusCartItem(dish_id){
      // this.$emit("addItemToCart", dish_id)
      this.$emit("plusCartItem", dish_id)
      this.$store.commit('disableSlider')

    },
    minusCartItem(dish_id){
      // this.$emit("addItemToCart", dish_id)
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
