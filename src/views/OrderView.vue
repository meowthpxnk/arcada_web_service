<template lang="html">
  <div class="order-view-cont">
    <div class="order-view">
      <div class="header">
        <div class="restaurant-logo">
          <img :src="server_url + restaurant.logo" alt="">
        </div>
        <div class="restaurant-title">
          {{restaurant.title}}
        </div>
      </div>
      <div class="cart-status">
        <div class="status checkout">
          <img src="@/assets/icons/order-icons/checkout.png" alt="">
        </div>
        <div class="dash" :class="waitForPayClass">
          <div class="circle one"></div>
          <div class="circle two"></div>
          <div class="circle three"></div>
        </div>
        <div class="status pay" :class="waitForPayClass">
          <img src="@/assets/icons/order-icons/pay.png" alt="">
        </div>

        <div class="dash" :class="waitForDeliveryClass">
          <div class="circle one"></div>
          <div class="circle two"></div>
          <div class="circle three"></div>
        </div>

        <div class="status delivery" :class="waitForDeliveryClass" v-if="order.delivery_type === 'DELIVERY'">
          <img src="@/assets/icons/order-icons/delivery.png" alt="">
        </div>
        <div class="status delivery" :class="waitForDeliveryClass" v-else>
          <img src="@/assets/icons/order-icons/pickup.png" alt="">
        </div>




      </div>


      <div class="cart-text-status-bar">
        <div class="pay-buttons" v-if="isWaitForPay">
          <button v-if="order.delivery_type === 'DELIVERY'" @click="payButton">оплатить</button>
          <button v-else @click="payButton">оплатить</button>
          <button v-if="order.delivery_type === 'DELIVERY'" @click="payButtonAfter">оплата курьеру</button>
          <button v-else @click="payButtonAfter">оплата наличными</button>
        </div>
        <div class="status-payed" v-else-if="isWaitForDelivery">
          <span>Спасибо за заказ! Ожидайте ответа оператора!😌</span>
          <!-- <span v-if="order.delivery_type === 'DELIVERY'">Спасибо за заказ! Будет доставлено в {{getPaidTime}}.</span> -->
          <!-- <span v-else>Спасибо за заказ! Ждите ответа оператора.</span> -->
          <!-- <span></span> -->
        </div>
      </div>



      <div class="cart-info">
        <div class="cont">
          <div class="title">
            <span>Тип заказа</span>
          </div>
          <div class="info" v-if="order.delivery_type === 'DELIVERY'">
            <span>Доставка</span>
          </div>
          <div class="info" v-else>
            <span>Самовывоз</span>
          </div>
        </div>
        <div class="cont">
          <div class="title">
            <span v-if="(order.delivery_type === 'DELIVERY')&(order.delivery_fee!== '0.00')">Стоимость заказа c доставкой</span>
            <span v-else>Стоимость заказа</span>
          </div>
          <div class="info">
            <span>{{total_price}}</span>
          </div>
        </div>
        <div class="cont" v-if="(order.delivery_type === 'DELIVERY')&(order.delivery_fee!== '0.00')">
          <div class="title">
            <span>Стоимость доставки</span>
          </div>
          <div class="info">
            <span>{{order.delivery_fee}}</span>
          </div>
        </div>
        <div class="cont" v-if="(order.delivery_type === 'DELIVERY')">
          <div class="title">
            <span>Время доставки</span>
          </div>
          <div class="info">
            <span>{{delivery_time}}</span>
          </div>
        </div>
        <div class="cont" v-if="order.delivery_type === 'DELIVERY'">
          <div class="title">
            <span>Адрес доставки</span>
          </div>
          <div class="info">
            <span>{{user_data.address}}</span>
          </div>
        </div>

        <div class="cont" v-if="user_data.name !== null">
          <div class="title">
            <span>Имя заказчика</span>
          </div>
          <div class="info">
            <span>
              <span>{{user_data.name}}</span>
            </span>
          </div>
        </div>
        <div class="cont">
          <div class="title">
            <span>Телефон заказчика</span>
          </div>
          <div class="info">
            <span>{{user_data.phone}}</span>
          </div>
        </div>

        <div class="cont">
          <div class="title">
            <span>Блюда в заказе</span>
          </div>
          <div class="cart-order">
            <ul>
              <li v-for="dish in cart" :key="dish">
                <order-dish-mixin
                  :dish="dish"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer"
      v-if="is_shown_footer"
      >
        <active-restaurants
          :code="'FROM_ORDER'"
          @notRestaurants="notRestaurants"
        />
      </div>
    </div>
  </div>

  <modal-quest
   v-if="isShownSliderItem"
  />

  <modal-preloader-screen
    :isShownPreloader="isShownPreloader"
  />
  <modal-restaurant-closed-order
    v-if="modal_restaurant_closed"
    :start_work="restaurant.start_work"
    @disbleModalRestaurantClosed="disbleModalRestaurantClosed"
  />

</template>

<script>
import { fetchWorldTimeForRestaurant } from '@/methods/time.js'
import { parseTime } from '@/methods/additional.js'
import { goToPay } from '@/methods/navigation.js'
const api_url = require('@/settings.js').api_url
import ModalPreloaderScreen from "@/components/client-popups/ModalPreloaderScreen.vue"
import ModalQuest from "@/components/client-popups/ModalQuest.vue"
import ModalRestaurantClosedOrder from "@/components/client-popups/ModalRestaurantClosedOrder.vue"
import OrderDishMixin from "@/components/mixins/OrderDishMixin.vue"

import ActiveRestaurants  from '@/components/mixins/active-restaurants/ActiveRestaurants.vue'
import {parsePrice} from "@/methods/additional.js"
// import { loadYmap } from 'vue-yandex-maps'
import { useRoute } from 'vue-router'
export default {
  async mounted(){


    // const settings = {
    //   apiKey: '6289737e-fefb-4767-908a-4b22aea5d3da',
    //   lang: 'ru_RU',
    // }
    // await loadYmap({...settings, debug: true});

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const route = useRoute();
    const order_id = route.params.id;


    const io = require("socket.io-client");
    // this.conn = io.connect(client_url + "order");
    // this.conn.on("connect", () => {
    //     console.log("conn is connected");
    // });
    //
    // this.conn.on("change_order_status", (data)=>{
    //   console.log(data)
    //   console.log()
    //   if (parseInt(this.$store.getters.getOrderId) === parseInt(data.order_id)){
    //     this.$store.commit("updateOrderStatus", data.status)
    //     this.$store.commit("updateOrderPaidTime", data.paid_time)
    //   }
    // })

    // await this.$store.dispatch("fetchRestaurants")
    // await delay(1000);
    while(!(window.ymaps)){
      await delay(100);
      // console.log(window.ymaps)
    }
    await delay(500);

    // console.log(order_id)
    await this.$store.dispatch("fetchGetOrder", order_id)
    this.is_order_getted = true
    this.isShownPreloader = false
    this.sliderLenght = this.$store.getters.getOrderRestaurantsList.length
    this.nextSliderItem()
    console.log(this.$store.getters.getOrderInfo)
    const vm = this
    setInterval(function() {
      vm.nextSliderItem()
    }, 5000)
    const favicon = document.querySelector("link[rel~='icon']")
    const restaurant = this.$store.getters.getOrderRestaurant
    console.log(restaurant.logo)
    favicon.href = api_url + restaurant.logo
    //
    // console.log(menuItems)
    //
    document.title = restaurant.title + " - Ваш заказ"
  },
  // async unmounted(){
  //   this.conn.disconnect()
  // },
  data(){
    return{
      is_order_getted: false,
      isShownPreloader: true,
      sliderLenght: 0,
      sliderIndex: 1,
      conn: null,
      server_url: api_url,
      modal_restaurant_closed: false,
      is_shown_footer: true,
    }
  },
  components:{
    ModalQuest,
    ActiveRestaurants,
    ModalPreloaderScreen,
    ModalRestaurantClosedOrder,
    OrderDishMixin,
  },
  computed: {
    getPaidTime(){
      return parseTime(this.$store.getters.getPaidTime)
    },
    isShownSliderItem(){
      return this.$store.getters.isShownSliderItem
    },
    restaurant(){
      return this.$store.getters.getOrderRestaurant
    },
    cart(){
      const cart = this.$store.getters.getOrderCart
      return cart
    },
    user_data(){
      return this.$store.getters.getOrderUserData
    },
    order(){
      return this.$store.getters.getOrderInfo
    },
    delivery_time(){
      const delivery_time = this.order.delivery_time
      if (delivery_time === "DEFAULT"){
        return "Ближайшее"
      }
      return parseTime(this.order.delivery_time)
    },
    total_price(){
      console.log(this.order.total_price)
      console.log(parsePrice(this.order.total_price))
      return parsePrice(this.order.total_price)
    },
    waitForPayClass(){
      if (this.isWaitForDelivery||this.isDelivered){
        return 'unavalible'
      }
      if (this.isWaitForPay){
        return 'active'
      }
      return 'inactive'
    },
    waitForDeliveryClass(){
      if (this.isDelivered){
        return 'unavalible'
      }
      if (this.isWaitForDelivery){
        return 'active'
      }
      return 'inactive'
    },
    isWaitForPay(){
      return this.order.status === "WAIT_FOR_PAY"
    },
    isWaitForDelivery(){
      return this.order.status === "WAIT_FOR_DELIVERY"
    },
    isDelivered(){
      return this.order.status === "DELIVERED"
    },

  },
  methods:{
    notRestaurants(){
      this.is_shown_footer = false
    },
    nextSliderItem(){
      if (this.sliderIndex >= this.sliderLenght - 1){
        this.sliderIndex = 0
      } else {
        this.sliderIndex += 1
      }
      const root = document.documentElement;
      root.style.setProperty('--margin-left-first-order-slider', '-' + this.sliderIndex*100 + "%");

    },
    previousSliderItem(){
      if (this.sliderIndex <= 0){
        this.sliderIndex = this.sliderLenght-1
      } else {
        this.sliderIndex -= 1
      }
      const root = document.documentElement;
      root.style.setProperty('--margin-left-first-order-slider', '-' + this.sliderIndex*100 + "%");
    },
    enableModalRestaurantClosed(){
      this.modal_restaurant_closed = true;
    },
    disbleModalRestaurantClosed(){
      this.modal_restaurant_closed = false;

    },
    async payButton(){
      const restaurantIsOnline = await fetchWorldTimeForRestaurant(
        {
          start_work: this.restaurant.start_work,
          end_work: this.restaurant.end_work,
        }
      )
      if(restaurantIsOnline){
        goToPay("https://www.tinkoff.ru/")
      } else {
        this.enableModalRestaurantClosed()
      }
    },
    async payButtonAfter(){
      const restaurantIsOnline = await fetchWorldTimeForRestaurant(
        {
          start_work: this.restaurant.start_work,
          end_work: this.restaurant.end_work,
        }
      )
      if(restaurantIsOnline){
        // goToPay("https://www.tinkoff.ru/")
        this.$store.dispatch("fetchPayOrderAfterGetting")
      } else {
        this.enableModalRestaurantClosed()
      }
    },
  }
}
</script>

<style lang="css" scoped>
</style>
