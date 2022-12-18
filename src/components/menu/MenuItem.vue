<template lang="html">
  <div @click = "setActiveDish">
    <div class="photo">
      <img :src="server_url + dish.photo" alt="">
    </div>
    <div class="info">
      <h1 class="title">{{dish.title}}</h1>
      <span class="price">{{calculatePrice}}Р</span>
    </div>
    <div class="add-button" :class="{'active': (!(isInCart))}">
      <div class="buttons" v-if="isInCart">
        <button @click.stop="addItemToCart">ДОБАВИТЬ</button>
      </div>
      <div class="buttons" v-else>
        <button @click.stop="minusCartItem">-</button>
        <span>{{getItemFromCart.counter}}</span>
        <button @click.stop="plusCartItem">+</button>
      </div>
    </div>
  </div>
</template>

<script>
const api_url = require('@/settings.js').api_url
export default {
  data(){
    return{
      server_url: api_url
    }
  },
  props:{
    dish: Object,
    cart: Array,
  },
  computed:{
    calculatePrice(){
      const rubles = (this.dish.price/100)
      var pennies = (this.dish.price%100)
      // console.log(cops)
      let dump = ""
      if(pennies == 0){
        dump += rubles.toString() + '.' +"00"
      } else if(pennies<10){
        dump += (rubles-(pennies/100)).toString() + '.' + "0" + pennies.toString()
      } else {
        dump += (rubles-(pennies/100)).toString() + '.' + pennies.toString()
      }
      return dump
    },
    getItemFromCart(){
      return this.cart.filter(dish => (dish.id) == this.dish.id)[0]
    },
    isInCart(){
      return this.getItemFromCart == null
    },
    cartPrice(){
      const a = this.cart.filter(dish => (dish.id) == this.dish.id)[0]
      return a
    },
  },
  methods:{
    setActiveDish(){
      this.$emit("setActiveDish", this.dish.id)
      console.log(this.dish.id)
    },
    addItemToCart(){
      if(this.getItemFromCart == null){
        this.$emit("addItemToCart", this.dish.id)
      } else {
        console.error("Item already in cart")
      }
    },
    plusCartItem(){
      this.$emit("plusCartItem", this.dish.id)
    },
    minusCartItem(){
      this.$emit("minusCartItem", this.dish.id)
    },
    cartPrice0(){
      const a = this.cart.filter(dish => (dish.id) == this.dish.id)[0]
      console.log(a)
    },
  },
  emits: [
    'addItemToCart', "minusCartItem", "plusCartItem", "setActiveDish"
  ],
}
</script>

<style lang="css" scoped>
</style>
