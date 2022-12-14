export default {
  actions: {

  },
  mutations: {
    setDeliveryType(state){
      state.is_delivery = true
    },
    setPickupType(state){
      state.is_delivery = false
    },
  },
  state: {
    is_delivery: true,
  },
  getters: {
    isDelivery: (state) => {
      return state.is_delivery
    },
  }
}
