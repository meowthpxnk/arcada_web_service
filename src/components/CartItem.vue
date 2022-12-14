<template lang="html">
  <!-- {{getItem}} -->
  <div class="cart-item" @click="getItem0" v-show="getItem.id!=null">
    <div class="photo">
      <img :src="getItem.photo" alt="">
    </div>
    <div class="info-container">
      <div class="info">
        <span class="title">
          {{getItem.title}}
        </span>
      </div>
      <div class="bottom-info">
        <span class="price">
          {{calculatePrice}}P
        </span>
        <div class="counter">
          <div class="add-button">
            <button @click="minusCartItem">-</button>
            <span>{{getItem.counter}}</span>
            <button @click="plusCartItem">+</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const settings = require('@/settings.js')
// const url = settings.proxy.url
export default {
  props:{
    item: Object,
    dishes: Array,
  },
  emits: [
    "minusCartItem", "plusCartItem"
  ],
  methods:{
    minusCartItem(){
      this.$emit("minusCartItem", this.item.id)
    },
    plusCartItem(){
      this.$emit("plusCartItem", this.item.id)
    }
  },
  computed:{
    getItem(){
      try{
        const dish = this.dishes.filter(dish => (dish.id) == this.item.id)[0].price
      } catch {
        return {
          id: null,
          price: 0,
          counter: 0,
          title: "title"
        }
      }
      const dump = this.dishes.filter(dish => (dish.id) == this.item.id)[0]

      return {
        id: this.item.id,
        price: dump.price,
        counter: this.item.counter,
        title: dump.title,
        photo: settings.proxy.url + dump.photo
      }

    },
    calculatePrice(){
      const rubles = ((this.getItem.price*this.getItem.counter)/100)
      var pennies = ((this.getItem.price*this.getItem.counter)%100)

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
  }
}
</script>

<style lang="css" scoped>
</style>
