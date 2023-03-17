const api_url = require('@/settings.js').api_url

export default {
  actions: {
    async fetchQrMenuItems(ctx, link){
      const method = "getQrMenu/" + link
      const requestURL = api_url + method
      const responce = await fetch(requestURL,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const menuItems = await responce.json()

      console.log(menuItems)

      if (menuItems.dump.error){
        document.location.href = "/"
      }

      var r = document.querySelector(':root');
      r.style.setProperty('--color-main-app', menuItems.dump.restaurant.color);


      const favicon = document.querySelector("link[rel~='icon']")
      favicon.href = api_url + menuItems.dump.restaurant.logo

      document.title = menuItems.dump.restaurant.title

      const menu = menuItems.dump

      const categories = menu.categories
      const dishes = menu.dishes

      const banners = menu.banners
      const restaurant = menu.restaurant

      const another_restaurants = menu.another_restaurants

      ctx.commit("updateCategories", categories)
      ctx.commit("updateDishes", dishes)
      ctx.commit("updateBanners", banners)
      ctx.commit("updateRestaurant", restaurant)
      ctx.commit("updateAnotherRestaurants", another_restaurants)

      return { categories: menu.categories }
    },
    async fetchMenuItems(ctx, link){
      const method = "getMenu/" + link
      const requestURL = api_url + method
      const responce = await fetch(requestURL,{
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const menuItems = await responce.json()
      console.log(responce)

      console.log(menuItems)

      if (menuItems.dump.error){
        document.location.href = "/"
      }

      var r = document.querySelector(':root');
      r.style.setProperty('--color-main-app', menuItems.dump.restaurant.color);


      const favicon = document.querySelector("link[rel~='icon']")
      favicon.href = api_url + menuItems.dump.restaurant.logo

      document.title = menuItems.dump.restaurant.title

      const menu = menuItems.dump

      const categories = menu.categories
      const dishes = menu.dishes

      const banners = menu.banners
      const restaurant = menu.restaurant

      const another_restaurants = menu.another_restaurants

      ctx.commit("updateCategories", categories)
      ctx.commit("updateDishes", dishes)
      ctx.commit("updateBanners", banners)
      ctx.commit("updateRestaurant", restaurant)
      ctx.commit("updateAnotherRestaurants", another_restaurants)

      return { categories: menu.categories }
    },
  },
  mutations: {
    updateAnotherRestaurants(state, another_restaurants){
      state.another_restaurants = another_restaurants
      console.log(another_restaurants)
    },
    updateCategories(state, categories){
      state.categories = categories
    },
    updateDishes(state, dishes){
      state.dishes = dishes
    },
    updateBanners(state, banners){
      state.banners = banners
    },
    updateRestaurant(state, restaurant){
      state.restaurant = restaurant
    },
  },
  state: {
    categories:[],
    dishes:[],
    banners: [],
    restaurant: {
      banner: null,
    },
    another_restaurants: [],
  },
  getters: {
    getFreeDeliveryPrice: (state) => {
      return state.restaurant.free_delivery_price
    },
    getDeliveryFee: (state) => {
      return state.restaurant.delivery_fee
    },
    getAnotherRestaurants: (state) => {
      return state.another_restaurants
    },
    getRestaurant: (state) => {
      return state.restaurant
    },
    getBanners: (state) => {
      return state.banners
    },
    getDishes: (state) => {
      return state.dishes
    },
    getDishesViaCategory: (state) => (category_id) => {
      return state.dishes.filter((dish) => dish.category_id === category_id)
    },
    getCategories: (state) => {
      let categories_dump = []


      state.categories.forEach(checkEmptyCategory)

      function checkEmptyCategory(category){
        const dishesList = state.dishes.filter((dish) => dish.category_id === category.id)
        if(dishesList.length != 0){
          categories_dump.push(category)
        }
      }

      return categories_dump
    },
  },
}
