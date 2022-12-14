const settings = require('@/settings.js')
const url = settings.client.url



export default {
  actions: {
    async fetchRestaurants(ctx){
      // const url = "http://localhost:8080/"
      const method = "getRestaurants"
      const requestURL = url + method
      console.log(requestURL)
      const responce = await fetch(requestURL,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const restaurants_list = await responce.json()
      // console.log(restaurants_list.dump)
      ctx.commit("updateRestaurantsList", restaurants_list.dump)
    }
  },
  mutations: {
    updateRestaurantsList(state, restaurants_list){
      state.restaurants_list = restaurants_list
    },
  },
  state: {
    restaurants_list: [],
  },
  getters: {
    getRestaurantsList: (state) => {
      return state.restaurants_list
    },
  }
}
