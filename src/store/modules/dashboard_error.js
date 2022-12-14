export default {
  actions: {
    // async fetchWorldTimeForRestaurant(ctx){
    //
    //   return checkTime(time, restaurant_time)
    // },
  },
  mutations: {
    enableDashboardErrorPopup(state, errors_list){
      state.show_error_modal = true
      state.errors_list = errors_list
    },
    disableDashboardErrorPopup(state){
      state.show_error_modal = false
      state.errors_list = {}
    },
  },
  state: {
    show_error_modal: false,
    errors_list: {},
  },
  getters: {
    getIsDashboardErrorEnabled: (state) => {
      return state.show_error_modal
    },
    getDashboardErrorsList: (state) => {
      return state.errors_list
    }
  },
}
