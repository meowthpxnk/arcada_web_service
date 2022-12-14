export default {
  actions: {

  },
  mutations: {
    showSliderItem(state, link){
      state.link = link;
      state.is_shown_slider_item = true
    },
    changeSliderActivity(state){
      state.is_slider_active = !state.is_slider_active
    },
    disableSlider(state){
      state.is_slider_active = false
    },
    declineModal(state){
      state.is_shown_slider_item = false
    },
  },
  state: {
    is_slider_active: true,
    is_shown_slider_item: false,
    link: "",
  },
  getters: {
    isSliderActive: (state) => {
      return state.is_slider_active
    },
    isShownSliderItem: (state) => {
      return state.is_shown_slider_item
    },
    getSliderLink: (state) => {
      // const data = 1
      return state.link
    }
  }
}
