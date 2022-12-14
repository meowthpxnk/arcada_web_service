import {checkTime} from "@/methods/time.js"

export default {
  actions: {
    // async fetchWorldTimeForRestaurant(ctx){
    //
    //   return checkTime(time, restaurant_time)
    // },
  },
  mutations: {
    enableModalClosedRestaurant(state){
      state.modal_closed_restaurant = true
    },
    disableModalClosedRestaurant(state){
      state.modal_closed_restaurant = false
    },
    enableModalOrderConfirmed(state) {
      state.modal_order_confirmed = true
    },
    disableModalOrderConfirmed(state) {
      state.modal_order_confirmed = false
    },
    enablePreloaderAnswer(state){
      state.is_shown_preloader_answer = true
    },
    disablePreloaderAnswer(state){
      state.is_shown_preloader_answer = false
    },
    enableModalErrorOrder(state, errors_list){
      state.is_shown_modal_error_order = true
      state.modal_error_order_errors_list = errors_list
    },
    disableModalErrorOrder(state){
      state.is_shown_modal_error_order = false,
      state.modal_error_order_errors_list = []
    },
  },
  state: {
    modal_closed_restaurant: false,
    modal_order_confirmed: false,
    is_shown_preloader_answer: false,
    is_shown_modal_error_order: false,
    modal_error_order_errors_list: [],
  },
  getters: {
    getModalClosedRestaurant: (state) => {
      return state.modal_closed_restaurant
    },
    getModalOrderConfirmed: (state) => {
      return state.modal_order_confirmed
    },
    isShownPreloaderAnswer: (state) => {
      return state.is_shown_preloader_answer
    },
    isShownModalErrorOrder: (state) => {
      return state.is_shown_modal_error_order
    },
    modalErrorOrderErrorsList: (state) => {
      return state.modal_error_order_errors_list
    }
  },
}
