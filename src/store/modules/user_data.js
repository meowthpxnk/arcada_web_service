export default {
  actions: {
    async fetchUserData(ctx){
      const user_data = localStorage.getItem("user_data")
      if (user_data){
        const dump_data = JSON.parse(user_data)
        ctx.commit("updateData", dump_data)
      }
    },
    async fetchUpdateUserData(ctx){
      const user_data = JSON.stringify(ctx.getters.getUserData)
      localStorage.setItem("user_data", user_data)
    }
  },
  mutations: {
    updatePhone(state, phone){
      if (phone !== null){
        state.phone = phone
      } else {
        state.phone = null
      }
      this.dispatch('fetchUpdateUserData')
    },
    updateName(state, name){
      if (name !== null){
        state.name = name
      } else {
        state.name = null
      }
      this.dispatch('fetchUpdateUserData')
    },
    updateAddress(state, address){
      if (address !== null){
        state.address = address
      } else {
        state.address = null
      }
      this.dispatch('fetchUpdateUserData')
    },
    updateData(state, data){
        const user_data = data
        this.commit('updateAddress', user_data.address)
        this.commit('updateName', user_data.name)
        this.commit('updatePhone', user_data.phone)
    }
  },
  state: {
    phone: null,
    name: null,
    address: null,
  },
  getters: {
    getUserData: (state) => {
      return {
        phone: state.phone,
        name: state.name,
        address: state.address,
      }
    },
  },
}
