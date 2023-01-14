const api_url = require('@/settings.js').api_url

export default {
  actions: {
    async getPrivateKey(ctx){
      const private_key = localStorage.getItem('private_key')
      ctx.commit("updatePrivateDeskKey", private_key)
    },



    async fetchRegisterPrivateKey(ctx, desk_key){
      const method = "registerPrivateKey/"
      const params = {
        desk_key: desk_key
      }
      const requestURL = api_url + "qrMenu/" + method
      const responce = await fetch(requestURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
      })
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)) {
        throw new Error(data.error);
      }
      localStorage.setItem('private_key', data.result.private_key)
      ctx.commit("updatePrivateDeskKey", data.result.private_key)
      return data.result.restaurant_link
    },



    async fetchCheckPrivateKey(ctx, restaurant_link){
      const method = "checkPrivateKey"
      const params = new URLSearchParams({
        private_key: this.getters.getPrivateKey,
        restaurant_link: restaurant_link
      })
      const requestURL = api_url + "qrMenu/" + method + '?' + params
      const responce = await fetch(requestURL, { method: "GET" })
      const data = await responce.json()
      if (!(data.ok)){
        throw new Error(data.error);
      }
      if (!(data.result.isActive)){
        throw new Error('Isactive key');
      }
      // console.log(data.result.desk_number)
      const desk_number = data.result.desk_number
      ctx.commit("updateDeskNumber", desk_number)
    },



    async fetchQRSendOrder(ctx, cart){
      const method = "sendOrder/"
      const params = {
        private_key: this.getters.getPrivateKey,
        order_info: {
          cart: this.getters.cartGetCommand,
          comment: this.getters.getCartComment,
          name: this.getters.getUserData.name,
        },
      }
      const requestURL = api_url + "qrMenu/" + method
      const responce = await fetch(requestURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
      })
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)){
        throw new Error(data.error);
      }
      switch(data.result.status){
        case 'SEND':
          ctx.commit("enableQRPopupOrder")
          ctx.commit("clearCart")
          break
        case 'TOO_MANY_REQUESTS':
          console.log(data)
          await ctx.commit("updateOrderWaitingTime", data.result.waiting_time)
          await ctx.commit("enableQRPopupManyRequestsOrder")
          break
        default:
          break
      }
    },



    async fetchQRCallTheWaiter(ctx){
      const method = "callTheWaiter/"
      const params = {
        private_key: this.getters.getPrivateKey,
      }
      const requestURL = api_url + "qrMenu/" + method
      const responce = await fetch(requestURL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
      })
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)){
        throw new Error(data.error);
      }

      switch(data.result.status) {
        case 'WAIT_ERROR':
          ctx.commit("updateWaitingTime", data.result.waiting_time + 1)
          ctx.commit("startIntervalTimer")
          return {status: "WAITING"}

        case 'SEND_ERROR':
          throw new Error('SEND_ERROR')

        case 'SUCCESS':
          ctx.commit("updateWaitingTime", data.result.delta + 1)
          ctx.commit("startIntervalTimer")
          return {status: "SUCCESS",}

        default:
          throw new Error('UNNOWN_ERROR')
      }
    },



    async fetchVerificationPrivateKey(ctx, desk_key){
      const method = "verificationPrivateKey/"
      const params = new URLSearchParams({
        private_key: this.getters.getPrivateKey,
        desk_key: desk_key,
      })
      const requestURL = api_url + "qrMenu/" + method + "?" + params
      const responce = await fetch(requestURL, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const data = await responce.json()
      if (!(data.ok)){
        throw new Error(data.error);
      }
      return data.result.restaurant_link
    },
  },
  mutations: {
    startIntervalTimer(state){
      try {
        clearInterval(state.waiting_interval);
      } catch(e){
        console.error(e)
      }
      state.waiting_interval = setInterval(() => {
        this.commit("updateWaitingTime", state.waiting_time - 1)
        if (state.waiting_time <= 0) {
          clearInterval(state.waiting_interval);
        }
      }, 1000);
    },



    updatePrivateDeskKey(state, private_key){
      state.private_key = private_key
    },
    updateDeskNumber(state, desk_number){
      state.desk_number = desk_number
    },



    updateWaitingTime(state, waiting_time){
      state.waiting_time = waiting_time
    },

    updateOrderWaitingTime(state, order_waiting_time){
      state.order_waiting_time = order_waiting_time
    },




    disableErrorQRModalPrivateKey(state){
      state.error_modals.private_key = false
    },
    enableErrorQRModalPrivateKey(state){
      state.error_modals.private_key = true
    },


    disableErrorQRModalSendMessage(state){
      state.error_modals.send_message = false
    },
    enableErrorQRModalSendMessage(state){
      state.error_modals.send_message = true
    },


    enableQRPopupWaiterCall(state){
      state.popups.waiter_call = true
    },
    disableQRPopupWaiterCall(state){
      state.popups.waiter_call = false
    },

    enableQRPopupOrder(state){
      state.popups.order = true
    },
    disableQRPopupOrder(state){
      state.popups.order = false
    },

    enableQRPopupManyRequestsOrder(state){
      state.popups.many_requests_order = true
    },
    disableQRPopupManyRequestsOrder(state){
      state.popups.many_requests_order = false
    },
  },
  state: {
    private_key: null,
    desk_number: 0,
    waiting_time: 0,

    order_waiting_time: 0,


    waiting_interval: null,

    error_modals:{
      private_key: false,
      not_active_qr_menu: false,
      send_message: false,
    },
    popups: {
      order: false,
      waiter_call: false,
      many_requests_order: false,
    },
  },
  getters: {
    getPrivateKey: (state) => {
      return state.private_key
    },
    getDeskNumber: (state) => {
      return state.desk_number
    },
    getOrderWaitingTime: (state) => {
      return state.order_waiting_time
    },



    errorQRModalPrivateKey: (state) => {
      return state.error_modals.private_key
    },
    errorQRModalSendMessage: (state) => {
      return state.error_modals.send_message
    },



    getQRWaitingTime: (state) => {
      return state.waiting_time
    },
    getQRWaitingInterwal: (state) => {
      return state.waiting_interval
    },

    getQRPopupWaiterCall: (state) => {
      return state.popups.waiter_call
    },
    getQRPopupOrder: (state) => {
      return state.popups.order
    },
    getQRPopupManyRequestsOrder: (state) => {
      return state.popups.many_requests_order
    },
  }
}
