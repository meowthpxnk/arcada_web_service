<template lang="html">
  <div class="modal-error-order-container" v-if="isShownModalErrorOrder" @click.self="closeModal">
    <div class="modal-error-order">
      <div class="errors-list">
        <ul>
          <li v-for="error in errors_list" :key="error">
            <span class="title">
              {{error.title}}:
            </span>
            <span class="description">
              {{error.description}}
            </span>
          </li>
        </ul>
      </div>
      <div class="ok-button">
        <button @click="closeModal">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {parseTime, parseTimeFromString} from "@/methods/additional.js"

export default {
  props:{
    isShownModalErrorOrder: Boolean,
  },
  methods:{
    closeModal(){
      this.$store.commit("disableModalErrorOrder")
    },
  },
  computed:{
    errors_list(){
      const list = this.$store.getters.modalErrorOrderErrorsList

      const restaurant = this.$store.getters.getRestaurant

      const address_error = list.filter(item => item.ADDRESS)[0]
      const phone_error = list.filter(item => item.PHONE_NUMBER)[0]
      const delivery_time_error = list.filter(item => item.DELIVERY_TIME)[0]

      const dump_errors_list = []



      if (address_error){
        switch (address_error.ADDRESS){
          case 'NOT_INSIDE_DELIVERY_ZONES':
            dump_errors_list.push({
              title: "Адрес доставки",
              description: "Вне зоны доставки",
            })
            break;
          case 'NOT_VALID_ADDRESS':
            dump_errors_list.push({
              title: "Адрес доставки",
              description: "Неправильно заполнен адрес",
            })
            break;
        }
      }


      if (phone_error){
        switch (phone_error.PHONE_NUMBER){
          case 'NOT_VALID':
            dump_errors_list.push({
              title: "Номер телефона",
              description: "Неправильно заполнен номер телефона",
            })
            break;
        }
      }


      if (delivery_time_error){
        switch (delivery_time_error.DELIVERY_TIME){
          case "DELIVERY_TIME_ERROR":
            dump_errors_list.push({
              title: "Время доставки",
              description: "Неправильное время доставки",
            })
            break;
          case "DELIVERY_TIME_ERROR_REST":
            dump_errors_list.push({
              title: "Время доставки",
              description: `Ресторан работает с ${parseTime(restaurant.start_work)} до ${parseTime(restaurant.end_work)}`,
            })
            break;
        }
      }

      return dump_errors_list
    },
    phone_number_error(){
      return 1
    }
  }
}
</script>

<style lang="css" scoped>
</style>
