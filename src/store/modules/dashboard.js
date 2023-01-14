const api_url = require('@/settings.js').api_url

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function API_KEY(API_KEY) {
  return "API_KEY=" + API_KEY
}

export default {
  actions: {
    async fetchDashboardDeleteDesk(ctx, desk_key){
      const method = "dashboard/deleteDesk/"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const dump = {
        desk_key: desk_key,
      }
      const responce = await fetch(requestURL, {
        method: "POST",
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(dump)
      })
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)){
        throw new Error(data.error)
      }

      ctx.commit("deleteDesk", desk_key)
      return data
    },
    async fetchDashboardCreateDesk(ctx, desk_number){
      const restaurant_id = this.getters.getDashboardActiveRestaurant.id
      const method = "dashboard/createDesk/" + restaurant_id
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const dump = {
        desk_number: desk_number,
      }
      const responce = await fetch(requestURL, {
        method: "POST",
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(dump)
      })
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)){
        throw new Error(data.error)
      }

      const key = data.result.key

      ctx.commit("createDesk", {desk_number, key})
      return data
    },



    async fetchChangeTelegramChannel(ctx, telegram_channel_id){
      const restaurant_id = this.getters.getDashboardActiveRestaurant.id
      const method = "dashboard/changeTelegramChannel/" + restaurant_id
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)
      const dump = {
        telegram_channel_id: telegram_channel_id,
      }
      const responce = await fetch(requestURL, {
        method: "POST",
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(dump)
      })
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)){
        throw new Error(data.error)
      }

      ctx.commit("changeTelegramChannel", telegram_channel_id)
      return data
    },


    async fetchChangeTelegramAdmin(ctx, telegram_admin_id){
      const restaurant_id = this.getters.getDashboardActiveRestaurant.id
      const method = "dashboard/changeTelegramAdmin/" + restaurant_id
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)
      const dump = {
        telegram_admin_id: telegram_admin_id,
      }
      const responce = await fetch(requestURL, {
        method: "POST",
        headers: { 'Content-type': 'application/json'},
        body: JSON.stringify(dump)
      })
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)){
        throw new Error(data.error)
      }

      ctx.commit("changeTelegramAdmin", telegram_admin_id)
      return data
    },




    async fetchChangeIsEnabledQrMenu(ctx){
      const restaurant_id = this.getters.getDashboardActiveRestaurant.id
      const method = "dashboard/changeTurnOfQrMenu/" + restaurant_id
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)
      const responce = await fetch(requestURL, {method: "POST"})
      const data = await responce.json()
      console.log(data)
      if (!(data.ok)){
        throw new Error(data.error)
      }

      ctx.commit("changeIsEnabledQrMenu")
      return data
    },
    async postChangeTurnOfRestaurant(ctx, id){
      const method = "dashboard/changeTurnOfRestaurant/" + id
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST"})
      const data = await responce.json()
      console.log(data)
      if (data.dump.result === "SUCCESS"){
        ctx.commit("changeTurnOfRestaurant", id)
      } else {
        this.commit("enableDashboardErrorPopup", data.dump.errors)
        console.log(Object.keys(data.dump.errors))
      }

    },
    async fetchDashboardRestaurants(ctx){

      const method = "dashboard/getRestaurants"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)
      console.log(requestURL)

      const responce = await fetch(requestURL,{method: "GET", 'Content-Type': 'application/json'})
      const data = await responce.json()
      console.log(data)
      const restaurants = data.restaurants

      for (const resturant of restaurants) {
        resturant.is_active = false
      }

      ctx.commit("updateDashboardRestaurants", restaurants)
    },

    async fetchDashboardMenu(ctx, restaurant_id){

      const method = "dashboard/getMenu/" + restaurant_id
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "GET"})
      const data = await responce.json()
      const menu = data.menu
      const desks = data.desks
      const telegram_channel = data.telegram_channel
      const enabled_qr_menu = data.enabled_qr_menu
      const telegram_admin_id = data.telegram_admin_id

      ctx.commit("updateDashboardMenu", {menu, desks, telegram_channel, enabled_qr_menu, telegram_admin_id})

    },

    async postDashboardCreateCategory(ctx, category){

      const data = new FormData()
      data.append('category', JSON.stringify(category))

      const method = "dashboard/createCategory"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()


      if (isEmpty(responce_data.category.errors)){
        ctx.commit("addDashboardCategory", responce_data.category.category)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }

    },

    async postDashboardEditCategory(ctx, category){

      console.log(category)

      const data = new FormData()
      data.append('category', JSON.stringify(category))

      const method = "dashboard/editCategory"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()


      if (isEmpty(responce_data.category.errors)){
        ctx.commit("editDashboardCategory", responce_data.category.category)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }
    },

    async postDashboardCreateDish(ctx, dump){


      const data = new FormData()


      if (dump.file !== null) {
        data.append('photo', dump.file)
      }

      data.append('dish', JSON.stringify(dump.dish))

      const method = "dashboard/createDish"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()

      console.log(responce_data)


      if (isEmpty(responce_data.dish.errors)){
        ctx.commit("addDashboardDish", responce_data.dish.dish)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }

    },

    async postDashboardDeleteDish(ctx, dump){
      const method = "dashboard/deleteDish"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({dish: dump})
      })
      const responce_data = await responce.json()


      if (isEmpty(responce_data.dish.errors)){
        ctx.commit("deleteDashboardDish", dump.id)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }
    },

    async postDashboardDeleteCategory(ctx, dump){
      const method = "dashboard/deleteCategory"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({category: dump})
      })
      const responce_data = await responce.json()

      if (isEmpty(responce_data.category.errors)){
        ctx.commit("deleteDashboardCategory", dump.id)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }
    },

    async postDashboardEditDish(ctx, dump){
      const data = new FormData()


      if (dump.file !== null) {
        data.append('photo', dump.file)
      }

      data.append('dish', JSON.stringify(dump.dish))

      const method = "dashboard/editDish"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()


      if (isEmpty(responce_data.dish.errors)){
        ctx.commit("editDashboardDish", responce_data.dish.dish)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }

    },

    async postDashboardCreateRestaurant(ctx, dump){


      const data = new FormData()


      if (dump.file !== null) {
        data.append('logo', dump.file)
      }

      data.append('restaurant', JSON.stringify(dump.restaurant))

      const method = "dashboard/createRestaurant"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()

      console.log(responce_data)

      if (isEmpty(responce_data.restaurant.errors)){
        ctx.commit("addDashboardRestaurant", responce_data.restaurant.restaurant)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }

    },
    async postDashboardDeleteRestaurant(ctx, id){
      console.log(id)

      const method = "dashboard/deleteRestaurant/" + id
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST"})
      const responce_data = await responce.json()

      console.log(responce_data)

      if (isEmpty(responce_data.dump.errors)){
        ctx.commit("deleteDashboardRestaurant", id)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }
    },






    async postDashboardSetBannerRestaurant(ctx, dump){
      console.log(dump)

      const data = new FormData()

      if (dump.file) {
        data.append('banner', dump.file)
      }

      data.append('restaurant', JSON.stringify(dump.restaurant))

      const method = "dashboard/setBannerToRestaurant"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()

      console.log(responce_data)

      if (isEmpty(responce_data.restaurant.errors)){
        ctx.commit("editDashboardRestaurant", responce_data.restaurant.restaurant)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }
    },

    async postDashboardDeleteBannerRestaurant(ctx, dump){
      const data = new FormData()
      data.append('restaurant', JSON.stringify(dump.restaurant))

      const method = "dashboard/deleteBannerToRestaurant"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()

      console.log(responce_data)

      if (isEmpty(responce_data.restaurant.errors)){
        ctx.commit("editDashboardRestaurant", responce_data.restaurant.restaurant)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }
    },







    async postDashboardEditRestaurant(ctx, dump){
      console.log(dump)

      const data = new FormData()

      if (dump.file) {
        data.append('logo', dump.file)
      }

      data.append('restaurant', JSON.stringify(dump.restaurant))

      const method = "dashboard/editRestaurant"
      const requestURL = api_url + method + "?" + API_KEY(this.getters.getApiKey)

      const responce = await fetch(requestURL,{method: "POST", body: data})
      const responce_data = await responce.json()

      console.log(responce_data)

      if (isEmpty(responce_data.restaurant.errors)){
        ctx.commit("editDashboardRestaurant", responce_data.restaurant.restaurant)
        return {result: 'SUCCES', data: responce_data}
      } else {
        return {result: 'ERROR', data: responce_data}
      }
    },

    async setActiveRestaurant(ctx, id){
      await ctx.dispatch("fetchDashboardMenu", id)
      ctx.commit("setActiveRestaurant", id)
    },
  },
  mutations: {
    deleteDesk(state, desk_key){
      const removeIndex = state.desks.findIndex( item => item.key === desk_key );
      state.desks.splice( removeIndex, 1 );
    },
    createDesk(state, {desk_number, key}){
      const desk = {
        number: desk_number,
        key: key,
      }
      state.desks.push(desk)
    },
    changeTelegramChannel(state, telegram_channel){
      state.telegram_channel = telegram_channel
    },
    changeTelegramAdmin(state, telegram_admin_id){
      state.telegram_admin_id = telegram_admin_id
    },
    changeIsEnabledQrMenu(state){
      state.enabled_qr_menu = !state.enabled_qr_menu
    },
    deleteDashboardDish(state, id){
      const removeIndex = state.dishes.findIndex( item => item.id === id );
      state.dishes.splice( removeIndex, 1 );
    },
    deleteDashboardCategory(state, id){
      const get_dishes = state.dishes.filter( item => item.category_id === id)
      for (const dish of get_dishes){
        this.commit("deleteDashboardDish", dish.id)
      }
      const removeIndex = state.categories.findIndex( item => item.id === id );
      state.categories.splice( removeIndex, 1 );
    },
    async editDashboardRestaurant(state, get_restaurant){
      const edited_restaurant = state.restaurants.filter(restaurant => restaurant.id === get_restaurant.id)[0]
      edited_restaurant.title = get_restaurant.title
      edited_restaurant.color = get_restaurant.color
      edited_restaurant.end_work = get_restaurant.end_work
      edited_restaurant.start_work = get_restaurant.start_work
      edited_restaurant.logo = get_restaurant.logo
    },
    async deleteDashboardRestaurant(state, id){
      const removeIndex = state.restaurants.findIndex( item => item.id === id );
      state.restaurants.splice( removeIndex, 1 );
    },
    async editDashboardDish(state, get_dish){
      const edited_dish = state.dishes.filter(dish => dish.id === get_dish.id)[0]
      edited_dish.title = get_dish.title
      edited_dish.photo = get_dish.photo
      edited_dish.price = get_dish.price
      edited_dish.ingredients = get_dish.ingredients
      edited_dish.description = get_dish.description
      edited_dish.portion = get_dish.portion
      edited_dish.is_full_menu = get_dish.is_full_menu
    },
    async editDashboardCategory(state, get_category){
      const edited_category = state.categories.filter(category => category.id === get_category.id)[0]
      edited_category.title = get_category.title
      edited_category.logo = get_category.logo
    },
    setActiveDish(state, id){
      state.active_dish = id
    },
    setActiveCategory(state, id){
      state.active_category = id
    },
    updateDashboardRestaurants(state, restaurants){
      state.restaurants = restaurants
    },
    updateDashboardMenu(state, {menu, desks, telegram_channel, enabled_qr_menu, telegram_admin_id}){
      state.categories = menu.categories
      state.dishes = menu.dishes
      state.desks = desks
      state.telegram_channel = telegram_channel
      state.enabled_qr_menu = enabled_qr_menu
      state.telegram_admin_id = telegram_admin_id
    },
    addDashboardCategory(state, category){
      state.categories.push(category)
    },
    addDashboardDish(state, dish){
      state.dishes.push(dish)
    },
    addDashboardRestaurant(state, restaurant){
      state.restaurants.push(restaurant)
    },
    setActiveRestaurant(state, id){
      const get_restaurant = state.restaurants.filter(restaurant => restaurant.id === id)[0]
      if (get_restaurant.is_active === true) {
        get_restaurant.is_active = false
      } else {
        for (const restaurant of state.restaurants){
          if (restaurant.id !== id){
            restaurant.is_active = false
          }
        }
        get_restaurant.is_active = true
      }
    },
    setActiveRestaurantNull(state){
      const get_restaurant = state.restaurants.filter(restaurant => restaurant.is_active === true)[0]
      if (get_restaurant) {
        get_restaurant.is_active = false
      }
    },
    changeTurnOfRestaurant(state, id){
      const get_restaurant = state.restaurants.filter(restaurant => restaurant.id === id)[0]
      get_restaurant.is_online = !get_restaurant.is_online
    },
    setActiveDesk(state, desk_number){
      let desk;
      try{
        desk = state.desks.filter(desk => desk.number === desk_number)[0]
      } catch(e){
        console.error(e)
      }
      state.active_desk = desk
    },
  },
  state: {
    restaurants:[],
    categories:[],
    dishes:[],
    desks: [],
    active_dish: null,
    active_category: null,
    enabled_qr_menu: false,
    active_desk: null,
    telegram_channel: "",
    telegram_admin_id: "",
  },
  getters: {
    getDashboardActiveRestaurant: (state) => {
      const active_restaurant = state.restaurants.filter(restaurant => restaurant.is_active === true)[0]
      if (active_restaurant) {
        return active_restaurant
      }
      return null
    },
    getDashboardRestaurants: (state) => {
      return state.restaurants
    },
    getDashboardMenu: (state) => {
      return {
        dishes: state.dishes,
        categories: state.categories
      }
    },
    getDashboardDishes: (state) => {
      return state.dishes
    },
    getDashboardQrDesks: (state) => {
      console.log(state.desks)
      return state.desks
    },
    getDashboardCategories: (state) => {
      return state.categories
    },
    getActiveDish: (state) => {
      const active_dish = state.dishes.filter(dish => dish.id == state.active_dish)[0]
      return active_dish
    },
    getActiveCategory: (state) => {
      const active_category = state.categories.filter(category => category.id == state.active_category)[0]
      return active_category
    },
    getTelegramChannel: (state) => {
      return state.telegram_channel
    },
    getTelegramAdmin: (state) => {
      return state.telegram_admin_id
    },
    getIsEnabledQrMenu: (state) => {
      console.log(state.enabled_qr_menu)
      return state.enabled_qr_menu
    },
    getActiveDesk: (state) => {
      return state.active_desk
    }
  },
}
