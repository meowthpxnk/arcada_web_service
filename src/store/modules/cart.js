export default {
  actions: {
    async fetchCartItems(ctx, restaurant_link){

      const storage_link = restaurant_link + "__cart"
      const cart = localStorage.getItem(storage_link)

      // this.$store.commit("clearCart")
      if (cart){
        const dump_cart = JSON.parse(cart)
        ctx.commit("updateCart", dump_cart)
        const dishes = this.getters.getDishes
        for (const cart_dish of dump_cart){
          const check_dish = dishes.filter(dish => dish.id === cart_dish.id)[0]
          if (!(check_dish)){
            this.commit("clearCart")
            break
          }
        }
      } else {
        console.log("НЕ НАШЛА КОРЗИНУ")
      }

      ctx.commit("updateStorageLink", storage_link)
    },
    async updateCartItemsLocal(ctx){
      const storage_link = ctx.getters.cartGetStorageLink
      const cart = JSON.stringify(ctx.getters.cartGetCommand)
      localStorage.setItem(storage_link, cart)
    }
  },
  mutations: {
    updateCart(state, dump_cart){
      state.cart = dump_cart
    },
    updateStorageLink(state, storage_link){
      state.storage_link = storage_link
    },
    updateComment(state, comment){
      state.comment = comment
    },
    updateDeliveryTime(state, delivery_time){
      state.delivery_time = delivery_time
    },
    clearCart(state){

      console.log("CLEARING")
      state.cart = []

      const storage_link = this.getters.cartGetStorageLink
      const cart = JSON.stringify([])
      localStorage.setItem(storage_link, cart)

    },
  },
  state: {
    cart: [],
    storage_link: null,
    comment: null,
    delivery_time: "DEFAULT",
  },
  getters: {
    cartGetCommand: (state) => {
      return state.cart
    },
    cartGetStorageLink: (state) => {
      return state.storage_link
    },
    getCartComment: (state) => {
      return state.comment
    },
    getDeliveryTime: (state) => {
      return state.delivery_time
    }
  },
}
