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
      // console.log()
      // if (location.host === 'localhost:8080'){
      //   document.location.href = '/sobaka'
      // }
      //
      // switch (location.host) {
      //   case 'raketa.cafe':
      //     document.location.href = '/raketa'
      //     break
      //   case 'teplo.cafe':
      //     document.location.href = '/teplo'
      //     break
      //   // case 'localhost:8080':
      //   //   document.location.href = '/sobaka'
      //   //   break
      //   default:
      //     break
      // }
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
