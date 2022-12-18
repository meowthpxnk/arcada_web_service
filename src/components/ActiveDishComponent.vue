<template lang="html">
  <div class="active-dish-photo-container">
    <div class="photo">
      <img :src="getPhoto" v-if="getPhoto" alt="">
    </div>
  </div>
  <div class="active-dish">
    <div class="active-dish-container">

      <div class="all-info">
        <div class="title"><span>{{getDish.title}}</span></div>
        <div class="price"><span>{{calculatePrice}}Р</span><div class="portion"><span>{{getDish.portion}}</span></div></div>

        <div class="ingredient-list">
          <div class="ingredient" @click = "getInfo" v-for="ingredient in getDish.ingredients" :key="ingredient">
            <span>{{ingredient}}</span>
          </div>
        </div>
        <div class="description">{{getDish.description}}</div>
      </div>
    </div>
  </div>
</template>

<script>
const api_url = require('@/settings.js').api_url
// const url = settings.proxy.url
export default {
  props: {
    dish_id: Number,
    cart: Array,
    dishes: Array,
  },

  methods:{
    backFromActiveDish(){



      console.log("getInfo")
      this.$emit("backFromActiveDish")
    },

  },
  computed:{
    getDish(){
      try{
        const a = this.dishes.filter(dish => (dish.id) == this.dish_id)[0].price
        console.log(a)
      } catch {
        return {id:null,price:null,title:null, portion:null, description:null, ingredients:null,photo:null}
      }

      const item = this.dishes.filter(dish => (dish.id) == this.dish_id)[0]
      const obj = {
        id:item.id,
        price:item.price,
        title:item.title,
        portion:item.portion,
        description:item.description,
        ingredients:item.ingredients,
        photo:item.photo
      }
      return obj
    },
    getPhoto(){

      if (this.getDish.photo) {
        return api_url.proxy.url + this.getDish.photo
      } else {
        return null
      }
    },
    calculatePrice(){
      const rubles = (this.getDish.price/100)
      var pennies = (this.getDish.price%100)
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
  },
  emits:["backFromActiveDish",]
}
</script>

<style lang="css" scoped>
</style>
