import { parseFromCoords } from "@/methods/address.js"
import { parsePrice } from "@/methods/additional.js"
const settings = require('@/settings.js')
const url = settings.client.url


export default {
  actions: {
    async fetchPayOrderAfterGetting(ctx){
      const secret_key = this.getters.getSecretKey
      const order_id = this.getters.getOrderId
      console.log(secret_key)
      console.log(order_id)

      const method = "payOrderAfterGetting/" + order_id + '?secret_key=' + secret_key
      const requestURL = url + method
      // console.log(requestURL)
      const responce = await fetch(requestURL,{
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
      })
    },
    async fetchGetOrder(ctx, order_id){

      ctx.commit("updateOrderId", order_id)

      let set_order;


      const orders_storage = localStorage.getItem('orders')

      if (orders_storage){
        try {
          const orders = JSON.parse(orders_storage)
          const getted_order = orders.filter(order => order.id === parseInt(order_id))[0]
          if(getted_order){
            const secret_key = getted_order.secret_key
            ctx.commit("updateSecretKey", secret_key)
            // const secret_key = ""

            // const url = "http://localhost:8080/"
            const method = "getOrder/" + order_id + '?secret_key=' + secret_key
            const requestURL = url + method
            // console.log(requestURL)
            const responce = await fetch(requestURL,{
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              },
            })


            const data = await responce.json()

            console.log("datadatadatadatadatadatadata")
            console.log(data)
            console.log("datadatadatadatadatadatadata")

            const order = data.dump
            // console.log(order.error)

            if(order.error){
              set_order = order.error
              console.log(order.error)
              document.location.href = "/orders"
            } else {
              set_order = order
            }




          } else{
            set_order =  "NOT_REGISTERED_ORDER_IN_STORAGE"
            document.location.href = "/orders"
          }
        } catch(exception) {
          document.location.href = "/orders"
        }

      }
      switch(set_order) {
        case 'NOT_REGISTERED_ORDER_IN_STORAGE':
          break;
        case 'NOT_EXISTED_SECRET_KEY':
          break;
        default:
          console.log(set_order)
          console.log(set_order.order.delivery_type)
          if(set_order.order.delivery_type === "DELIVERY"){
            set_order.user_data.address = await parseFromCoords(set_order.user_data.address[0])
          } else {
            set_order.user_data.address = ''
          }

          set_order.user_data.phone = '+ 7 ' + set_order.user_data.phone
          ctx.commit("updateOrder", set_order.order)
          ctx.commit("updateUserData", set_order.user_data)
          ctx.commit("updateRestaurantInfo", set_order.restaurant_info)
          ctx.commit("updateRestaurantsList", set_order.restaurants_list)
          break;
      }
    },
  },
  mutations: {
    updateOrderPaidTime(state, time){
      let set_time;
      set_time = time + 60
      if (set_time > 1439){
        set_time -= 1440
      }
      state.paid_time = set_time
    },
    updateOrder(state, order){

      console.log(order)

      if(order.delivery_type === "DELIVERY"){
        state.delivery_fee = parsePrice(order.delivery_fee)
      }

      if(order.paid_time){
        this.commit("updateOrderPaidTime", order.paid_time)
      }

      state.comment = order.comment
      state.delivery_type = order.delivery_type
      state.status = order.status
      state.total_price = order.total_price
      if(order.delivery_type === "DELIVERY"){
        state.total_price += order.delivery_fee
        state.delivery_fee = parsePrice(order.delivery_fee)
      }
      console.log(state.total_price)

      state.cart = order.cart
      for (const dish of state.cart) {
        dish.price = parsePrice(dish.price)
      }
    },
    updateUserData(state, user_data){
      state.user_data.name = user_data.name
      state.user_data.phone = user_data.phone
      state.user_data.address = user_data.address
    },
    updateRestaurantInfo(state, restaurant_info){
      state.restaurant_info = restaurant_info
      // state.user_data.phone = user_data.phone
      // state.user_data.address = user_data.address
    },
    updateRestaurantsList(state, restaurants_list){

      state.restaurants_list = restaurants_list
      console.log(state.restaurants_list)
    },
    updateOrderId(state, order_id){
      state.id = order_id
    },
    updateOrderStatus(state, order_status){
      state.status = order_status
    },
    updateSecretKey(state, secret_key){
      state.secret_key = secret_key
    }
  },
  state: {
    secret_key: null,
    id: null,
    comment: '',
    delivery_type: 'DELIVERY',
    status: '',
    cart: [],
    delivery_fee: 0,
    total_price: 0,
    paid_time: 319,
    user_data: {
      name: '',
      phone: '',
      address: '',
    },
    restaurant_info: {
      color: '#fff',
      title: '',
      logo: null,
    },
    restaurants_list: [],
  },
  getters: {
    getSecretKey: (state) => {
      return state.secret_key
    },
    getOrderRestaurant: (state) => {
      return state.restaurant_info
    },
    getOrderUserData: (state) => {
      return state.user_data
    },
    getOrderInfo: (state) => {
      console.log(state.total_price)
      return {
        comment: state.comment,
        delivery_type: state.delivery_type,
        status: state.status,
        total_price: state.total_price,
        delivery_fee: state.delivery_fee,
      }
    },
    getOrderCart: (state) => {
      return state.cart
    },
    getOrderRestaurantsList: (state) => {
      return state.restaurants_list
    },
    getOrderId: (state) => {
      return state.id
    },
    getPaidTime: (state) => {
      return state.paid_time
    }
  },
}
