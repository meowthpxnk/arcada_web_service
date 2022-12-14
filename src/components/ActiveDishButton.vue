<template lang="html">
  <div class="pay-buttons-container">
    <div class="menu-button-mixin-wrap">
      <div class="menu-button menu-button-mixin">
        <button @click="backFromActiveDish">НАзад</button>
      </div>
    </div>
    <div v-if="getDish==null" class="button-mixin-wrap">
      <div class="pay-button button-mixin">
        <button @click="addItemToCart">Добавить</button>
      </div>
    </div>
    <div v-else class="button-mixin-wrap">
      <div class="pay-button button-mixin active-dish-button">
        <button @click="minusCartItem">-</button>
        <span>{{getDish.counter}}</span>
        <button @click="plusCartItem">+</button>
      </div>
    </div>
  </div>
  <!-- <progress-bar-free-del-price
    :calcPercents="calcPercents"
    :calculateWithDelPrice="calculateWithDelPrice"
  /> -->
</template>

<script>
export default {
  props:{
    cart: Array,
    dishes: Array,
    dish_id: Number,
  },
  computed:{
    getDish(){
      try{
        const a = this.cart.filter(dish => (dish.id) == this.dish_id)[0].counter
        console.log(a)
      } catch {
        return null
      }

      const obj = this.cart.filter(dish => (dish.id) == this.dish_id)[0]
      return obj
    },
  },
  methods:{
    addItemToCart(){
      this.$store.commit('disableSlider')
      this.$emit("addItemToCart", this.dish_id)
    },
    backFromActiveDish(){
      this.$store.commit('disableSlider')
      this.$emit("backFromActiveDish")
    },
    minusCartItem(){
      this.$store.commit('disableSlider')
      this.$emit("minusCartItem", this.dish_id)
    },
    plusCartItem(){
      this.$store.commit('disableSlider')
      this.$emit("plusCartItem", this.dish_id)
    },
  }
}
</script>

<style lang="css" scoped>
</style>
