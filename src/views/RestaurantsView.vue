<template lang="html">
  <div class="restaurant-view-container" v-if="window.width<768">
    <header-component/>
    <div class="head-container" v-show="isHomeActive&&(activeDishId==null)">
      <categories-component
        :categories = "getCategories"
        :active_category_id = "activeCategoryID"
        @changeActiveCategory="changeActiveCategory"
      />
      <dishes-component
        :cart = "cart"
        :dishes = "getDishesViaCategory"
        @addItemToCart="addItemToCart"
        @minusCartItem="minusCartItem"
        @plusCartItem="plusCartItem"
        :cartPrice = "cartPrice>0"
        @setActiveDish="setActiveDish"
      />
      <footer-cart
        v-if="cartPrice>0"
        :cartPrice = "cartPrice"
        @setCartActive="setCartActive"
      />
    </div>
    <div class="head-container" v-show="isCartActive&&(activeDishId==null)">
      <Transition name="cart_mobile">
        <cart-component
          v-if="isCartActive&&(activeDishId==null)"
          :cart="cart"
          :dishes="getDishes"
          :cartPrice="cartPrice"
          :mobile_show="mobile_show_cart"
          @minusCartItem="minusCartItem"
          @plusCartItem="plusCartItem"
        />
      </Transition>
      <pay-button
        @backToMenu="backToMenu"
        :cartPrice="cartPrice"
      />

    </div>
    <div class="head-container" v-show="activeDishId!=null">
      <active-dish-component

        :dish_id = "activeDishId"
        :cart="cart"
        :dishes="getDishes"
      />
      <active-dish-button
        :dish_id = "activeDishId"
        :cart="cart"
        :dishes="getDishes"
        @backFromActiveDish="backFromActiveDish"
        @addItemToCart="addItemToCart"
        @minusCartItem="minusCartItem"
        @plusCartItem="plusCartItem"
      />


    </div>

    <div class="pg-wrap">
      <div class="progress-bar">
        <div class="bar" :style="{width: calcPercents + '%'}"></div>
      </div>
      <Transition name="free_delivery_counter">
        <div class="free-delivery-counter" v-if="calculateWithDelPrice">
          <span class="title">{{parse_free_del_price}}Р БЕСПЛАТНАЯ ДОСТАВКА</span>
          <span class="counter">ЕЩЁ {{calculateWithDelPrice}}P</span>
        </div>
      </Transition>
    </div>
  </div>

  <div class="restaurant-view-container" v-else>
    <div class="test-container">
      <div class="main-block-container">
        <div class="top-pannel">
          <div class="logo">
            <div class="img">
              <img :src="server_url + $store.getters.getRestaurant.logo" alt="">
            </div>
            <p>{{$store.getters.getRestaurant.title}}</p>
          </div>
          <div class="categories-desktop">
            <categories-component
              :categories = "getCategories"
              :active_category_id = "activeCategoryID"
              @changeActiveCategory="changeActiveCategory"
            />
          </div>
        </div>
        <div class="bottom-pannel">
          <div class="dishes-desktop">
            <dishes-component
              :cart = "cart"
              :dishes = "getDishesViaCategory"
              @addItemToCart="addItemToCart"
              @minusCartItem="minusCartItem"
              @plusCartItem="plusCartItem"
              :cartPrice = "cartPrice>0"
              @setActiveDish="setActiveDish"
            />
          </div>
        </div>
      </div>
      <div class="add-block-container">
        <div class="banners" v-if="is_slider_active">
          <RestaurantSlider/>
        </div>
        <div class="cart-desktop">
          <cart-component
            :cart="cart"
            :dishes="getDishes"
            :cartPrice="cartPrice"
            :mobile_show="true"
            @minusCartItem="minusCartItem"
            @plusCartItem="plusCartItem"
          />
          <pay-button v-if="cart.length!==0"
            @backToMenu="backToMenu"
            :cartPrice="cartPrice"
          />
          <div class="pg-wrap">
            <div class="progress-bar">
              <div class="bar" :style="{width: calcPercents + '%'}"></div>
            </div>
            <Transition name="free_delivery_counter">
              <div class="free-delivery-counter" v-if="calculateWithDelPrice">
                <span class="title">{{parse_free_del_price}}Р БЕСПЛАТНАЯ ДОСТАВКА</span>
                <span class="counter">ЕЩЁ {{calculateWithDelPrice}}P</span>
              </div>
            </Transition>
          </div>
          <!-- <cart-component
            :cart="cart"
            :dishes="getDishes"
            @minusCartItem="minusCartItem"
            @plusCartItem="plusCartItem"
          />
          <pay-button
            @backToMenu="backToMenu"
            :cartPrice="cartPrice"
          /> -->
        </div>
      </div>
    </div>


    <div class="modal-active-dish-win" v-if="activeDishId!=null" @click.self="backFromActiveDish">
      <div class="wrapper">
        <active-dish-component


          :dish_id = "activeDishId"
          :cart="cart"
          :dishes="getDishes"
        />
        <active-dish-button
          :dish_id = "activeDishId"
          :cart="cart"
          :dishes="getDishes"
          @backFromActiveDish="backFromActiveDish"
          @addItemToCart="addItemToCart"
          @minusCartItem="minusCartItem"
          @plusCartItem="plusCartItem"
        />
      </div>
    </div>

  </div>

  <modal-restaurant-closed
    v-if="isEnabledModalClosedRestaurant"
  />

  <modal-order-confirmed
    v-if="isEnabledModalOrderConfirmed"
  />



  <modal-quest
    v-if="isShownSliderItem"
    @setZeroCats="setZeroCats"
  />

  <modal-preloader-screen
    :isShownPreloader="isShownPreloader"
  />

  <modal-preload-screen-answer
    :isShownPreloader="isShownPreloaderAnswer"
  />

  <modal-error-order
    :isShownModalErrorOrder="isShownModalErrorOrder"
  />

  <!-- window.width>768 -->


</template>

<script>

const settings = require('@/settings.js')

import RestaurantSlider from "@/components/slider/RestaurantSlider.vue"

// import  ActiveRestaurants  from '@/components/mixins/active-restaurants/ActiveRestaurants.vue'
import ModalErrorOrder from "@/components/client-popups/ModalErrorOrder.vue"
import ModalPreloadScreenAnswer from "@/components/client-popups/ModalPreloadScreenAnswer.vue"
import ModalPreloaderScreen from "@/components/client-popups/ModalPreloaderScreen.vue"
import ModalRestaurantClosed from "@/components/client-popups/ModalRestaurantClosed.vue"
import ModalOrderConfirmed from "@/components/client-popups/ModalOrderConfirmed.vue"
import ModalQuest from "@/components/client-popups/ModalQuest.vue"
import HeaderComponent from "@/components/HeaderComponent.vue"
import CategoriesComponent from "@/components/menu/CategoriesComponent.vue"
import DishesComponent from "@/components/menu/DishesComponent.vue"
import FooterCart from "@/components/FooterCart.vue"
import PayButton from "@/components/mixins/PayButton.vue"
import CartComponent from "@/components/CartComponent.vue"
import ActiveDishComponent from "@/components/ActiveDishComponent.vue"
import ActiveDishButton from "@/components/ActiveDishButton.vue"
import { useRoute } from 'vue-router'
import { fetchWorldTimeForRestaurant } from '@/methods/time.js'
import { parsePrice } from '@/methods/additional.js'
// import FriendsModal from "@/components/PizdaTwo/FriendsModal.vue";


export default {
  components: {
    // ActiveRestaurants,
    RestaurantSlider,
    ModalPreloadScreenAnswer,
    ModalPreloaderScreen,
    ModalOrderConfirmed,
    ModalRestaurantClosed,
    ModalQuest,
    HeaderComponent,
    CategoriesComponent,
    DishesComponent,
    FooterCart,
    PayButton,
    CartComponent,
    ActiveDishComponent,
    ActiveDishButton,
    ModalErrorOrder,
  },
  data(){
    return{
      isShownPreloader: true,
      activeCategoryID: 1,
      // cart: [],
      isHomeActive: true,
      isCartActive: false,
      activeDishId: null,
      // free_del_price: 150000,
      window: {
        width: 0,
        height: 0,
      },
      server_url: settings.proxy.url,
      mobile_show_cart: false,
    }
  },
  computed: {
    delivery_fee(){
      return this.$store.getters.getDeliveryFee
    },
    parse_free_del_price(){
      return parsePrice(this.free_del_price)
    },
    free_del_price(){
      return this.$store.getters.getFreeDeliveryPrice
    },
    isShownModalErrorOrder(){
      console.log(this.$store.getters.isShownModalErrorOrder)
      return this.$store.getters.isShownModalErrorOrder
    },
    isShownPreloaderAnswer(){
      return this.$store.getters.isShownPreloaderAnswer
    },
    isEnabledModalClosedRestaurant(){
      return this.$store.getters.getModalClosedRestaurant
    },
    isEnabledModalOrderConfirmed(){
      return this.$store.getters.getModalOrderConfirmed
    },

    cart(){
      return this.$store.getters.cartGetCommand
    },
    isShownSliderItem(){
      return this.$store.getters.isShownSliderItem
    },
    calcPercents(){
      if(!(this.$store.getters.isDelivery)){
        return 100
      }

      const price = this.cartPrice/this.free_del_price*100
      if (price>100){
        return 100
      } else if (price<0){
        return 0
      } else {
        return price
      }

    },
    is_slider_active(){
      return this.$store.getters.getBanners.length > 0
    },
    calculateWithDelPrice(){
      const price = this.free_del_price - this.cartPrice
      if ((price <= 0)||(!(this.$store.getters.isDelivery))){
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
    getDishesViaCategory(){
      return this.$store.getters.getDishesViaCategory(this.activeCategoryID)
    },
    getDishes(){
      return this.$store.getters.getDishes
    },
    getCategories(){
      return this.$store.getters.getCategories
    },
    cartPrice(){
      var total_cost = 0
      try{
        const dump = this.getDishes.filter(dish => (dish.id) == this.cart[0].id)[0]
      } catch {
        return 0
      }
      for (const item of this.cart){
        const dump = this.getDishes.filter(dish => (dish.id) == item.id)[0]
        total_cost += dump.price * item.counter
      }
      return total_cost
    },
  },
  async mounted(){
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
    const route = useRoute();
    const link = route.params.link;
    const data = await this.$store.dispatch('fetchMenuItems', link)
    await this.$store.dispatch('fetchCartItems', link)
    this.isShownPreloader = false
    // const res = await this.$store.dispatch('fetchWorldTime')

    const restaurant = this.$store.getters.getRestaurant


    const res = await fetchWorldTimeForRestaurant(restaurant)
    console.log(res)
    if (!(res)){
      this.$store.commit("enableModalClosedRestaurant")
    }

    this.activeCategoryID = this.$store.getters.getCategories[0].id


    // await checkTime()
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods:{
    handleResize() {
      this.window.width = window.innerWidth;
      this.window.height = window.innerHeight;
    },
    setZeroCats(data){
      this.activeCategoryID = data.categories[0].id
    },
    setActiveDish(id){
      this.activeDishId = id
    },
    backFromActiveDish(){
      this.activeDishId = null
    },
    backToMenu(){
      this.isCartActive= false
      this.isHomeActive= true
      this.mobile_show_cart = false
    },
    setCartActive(){
      this.isHomeActive= false
      this.isCartActive= true
      this.mobile_show_cart = true
    },
    changeActiveCategory(category_id){
      this.activeCategoryID = category_id
    },
    addItemToCart(dish_id){
      this.cart.push({id: dish_id, counter: 1})
      this.$store.dispatch("updateCartItemsLocal")
    },
    plusCartItem(dish_id){
      const item = this.cart.filter(dish => (dish.id) == dish_id)[0]
      item.counter += 1
      this.$store.dispatch("updateCartItemsLocal")
    },
    minusCartItem(dish_id){
      const item = this.cart.filter(dish => (dish.id) == dish_id)[0]
      if (item.counter > 1){
        item.counter -= 1
      } else {
        const dish_index = this.cart.findIndex((dish) => dish.id === dish_id)
        this.cart.splice(dish_index,1)
      }
      this.$store.dispatch("updateCartItemsLocal")
    },
  }
}
</script>

<style lang="css" scoped>


.cart_util_fade-enter-active,
.cart_util_fade-leave-active {
  /* height: 100%; */
  max-height: 200px;
  transition: all 0.5s ease;
  overflow: hidden;
  /* margin-top: 0vh; */
}
.cart_util_fade-enter-from,
.cart_util_fade-leave-to {
  /* margin-top: 100vh; */
  /* height: 0%;
  padding: 0px 20px; */
  margin-bottom: 0px;
  max-height: 0px;
}


.free_delivery_counter-enter-active,
.free_delivery_counter-leave-active {
  /* height: 100%; */
  /* max-height: 200px; */
  transition: all 0.5s ease;
  overflow: hidden;
  /* margin-top: 0vh; */
}
.free_delivery_counter-enter-from,
.free_delivery_counter-leave-to {
  /* margin-top: 100vh; */
  /* height: 0%;
  padding: 0px 20px; */
  /* margin-bottom: 0px; */
  /* max-height: 0px; */
  height: 0;
}
</style>
<style lang="scss" scoped>
</style>
