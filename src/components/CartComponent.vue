<template lang="html">
  <div class="cart">

    <!-- <div class="cart-description title">
      <span>Продуткы в вашем заказе</span>
    </div> -->
    <!-- <ul>
      <li v-for="item in cart" :key="item.id">
        <cart-item
          :item="item"
          :dishes="dishes"
          @minusCartItem="minusCartItem"
          @plusCartItem="plusCartItem"
        />
      </li>
    </ul> -->
    <Transition name="cart_empty">
      <div class="cart-container" v-if="cart.length===0">
        <span class="empty-cart">Корзина пуста</span>
      </div>
    </Transition>


    <Transition name="cart_fade">
      <div class="cart-container" v-if="((cart.length!==0)&&mobile_show)">

        <ul>
          <li>
            <div class="cart-description title">
              <span>Тип заказа</span>
            </div>
            <delivery-type/>

            <div class="dash"><span>dash</span></div>
          </li>
          <Transition name="cart_util_fade">
            <li v-if="isFreeDelivery">
              <div class="cart-description title">
                <span>Стоимость доставки</span>
              </div>
              <div class="delivery-fee-title">
                <span>{{parseDeliveryFee}}Р</span>
              </div>

              <div class="dash"><span>dash</span></div>
            </li>
          </Transition>

          <li class="order-cart-items">
            <div class="cart-description title cart-products">
              <span>Продукты в заказе</span>
            </div>
            <transition-group name="cart_item_fade" tag="ul">
              <li v-for="item in cart" :key="item.id">
                <cart-item
                  :item="item"
                  :dishes="dishes"
                  @minusCartItem="minusCartItem"
                  @plusCartItem="plusCartItem"
                />
              </li>
            </transition-group>
            <div class="dash"><span>dash</span></div>
          </li>
          <li>
            <div class="cart-description title">
              <span>Комментарий к заказу</span>
            </div>
            <order-comment/>


            <div class="dash"><span>dash</span></div>
          </li>
          <Transition name="cart_util_fade">
            <li v-if="isTypeDelivery">
              <div class="cart-description title">
                <span>Адрес доставки</span>
              </div>
              <delivery-address
                @changeAddress="changeAddress"
              />


              <div class="dash"><span>dash</span></div>
            </li>
          </Transition>

          <li>
            <div class="cart-description title">
              <span>Номер телефона</span>
            </div>
            <phone-number
              @changePhone="changePhone"
            />


            <div class="dash"><span>dash</span></div>
          </li>
          <li>
            <div class="cart-description title">
              <span>Ваше имя</span>
            </div>
            <your-name/>
          </li>
        </ul>
      </div>
    </Transition>

    <!-- <div class="cart-description title">
      <span>Продуткы в вашем заказе</span>
    </div>
    <div class="cart-description title">
      <span>Продуткы в вашем заказе</span>
    </div> -->
  </div>
</template>

<script>
import CartItem from "@/components/CartItem.vue"
import DeliveryType from "@/components/cart-utilities/DeliveryType.vue"
import OrderComment from "@/components/cart-utilities/OrderComment.vue"
import DeliveryAddress from "@/components/cart-utilities/DeliveryAddress.vue"
import PhoneNumber from "@/components/cart-utilities/PhoneNumber.vue"
import YourName from "@/components/cart-utilities/YourName.vue"

import {parsePrice} from "@/methods/additional.js"

export default {
  data(){
    return {
      comment: 'asasdas',
      phone: null,
      address: null,
      name: null,
    }
  },
  props: {
    cart: Array,
    dishes: Array,
    cartPrice: Number,
    mobile_show: Boolean,
  },
  components:{
    CartItem,
    DeliveryType,
    OrderComment,
    DeliveryAddress,
    PhoneNumber,
    YourName,
  },
  emits: [
    "minusCartItem", "plusCartItem"
  ],
  methods:{
    minusCartItem(item_id){
      this.$emit("minusCartItem", item_id)
      this.$store.commit('disableSlider')
    },
    plusCartItem(item_id){
      this.$emit("plusCartItem", item_id)
      this.$store.commit('disableSlider')
    },
    changePhone(phone, isError){
      if(isError){
        this.phone = ''
      } else {
        this.phone = phone
      }
      console.log(this.phone)
    },
    changeAddress(address){
      this.address = address
    }
  },
  computed:{
    parseDeliveryFee(){
      return parsePrice(this.$store.getters.getDeliveryFee + this.$store.getters.getOrderTaxes)
    },
    isTypeDelivery(){
      return this.$store.getters.isDelivery
    },
    isFreeDelivery(){
      if(this.isTypeDelivery){
        return this.cartPrice < this.$store.getters.getFreeDeliveryPrice
      }
      return false
    },
  }
}
</script>

<style lang="css" scoped>
.cart_fade-enter-active,
.cart_fade-leave-active {
  height: 100%;
  transition: all 0.5s ease;
  /* margin-top: 0vh; */
}

.cart_fade-enter-from,
.cart_fade-leave-to {
  /* margin-top: 100vh; */
  height: 0%;
  padding: 0px 20px;
}



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

.cart_item_fade-enter-active,
.cart_item_fade-leave-active {
  /* height: 100%; */
  max-height: 150px;
  transition: all 0.5s ease;
  overflow: hidden;
  margin-top: 20px;

  /* margin-top: 0vh; */
}
.cart_item_fade-enter-from,
.cart_item_fade-leave-to {
  /* margin-top: 100vh; */
  /* height: 0%;
  padding: 0px 20px; */
  /* margin-bottom: 0px; */
  margin-top: 0px;
  max-height: 0px;
}




.cart_empty-enter-active,
.cart_empty-leave-active {
  /* height: 100%; */
  /* max-height: 150px; */
  transition: all 0.5s ease;
  overflow: hidden;
  /* margin-top: 20px; */

  /* margin-top: 0vh; */
}
.cart_empty-enter-from,
.cart_empty-leave-to {
   opacity: 0;
}


/* cart_item_fade */
</style>
