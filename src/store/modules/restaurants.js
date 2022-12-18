const api_url = require('@/settings.js').api_url



export default {
  actions: {
    async fetchRestaurants(ctx){
      const method = "getRestaurants"
      const requestURL = api_url + method
      console.log(requestURL)
      const responce = await fetch(requestURL,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const restaurants_list = await responce.json()
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
