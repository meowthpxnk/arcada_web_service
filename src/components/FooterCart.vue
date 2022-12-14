<template lang="html">
  <!-- <div class="cart" style="color: #fff;">{{calculatePrice}}Р</div> -->
  <div class="footer-cart">
    <div class="main-block">
      <div class="price">
        <span>{{calculatePrice}}P</span>
      </div>
      <div class="nav-button">
        <button @click = "setCartActive">перейти в корзину</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      free_del_price: 150000,
    }
  },
  props: {
    cartPrice:Number,
  },
  methods:{
    setCartActive(){
      this.$emit("setCartActive")
      this.$store.commit('disableSlider')
    }
  },
  emits: [
    "setCartActive"
  ],
  computed: {
    calcPercents(){
      const price = this.cartPrice/this.free_del_price*100
      if (price>100){
        return 100
      } else if (price<0){
        return 0
      } else {
        return price
      }
    },
    calculatePrice(){
      const rubles = (this.cartPrice/100)
      var pennies = (this.cartPrice%100)

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
    calculateWithDelPrice(){
      const price = this.free_del_price - this.cartPrice
      if (price < 0){
        return null
      }

      const rubles = (price/100)
      var pennies = (price%100)

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
  },
  components: {
  },
}
</script>

<style lang="css" scoped>
</style>
