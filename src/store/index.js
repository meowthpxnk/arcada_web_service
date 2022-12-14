import { createStore } from "vuex";
import menu from './modules/menu'
import dashboard from './modules/dashboard'
import slider from './modules/slider'
import delivery_type from './modules/delivery_type'
import cart from './modules/cart'
import user_data from './modules/user_data'
import time from './modules/time'
import modals from './modules/modals'
import restaurants from './modules/restaurants'
import order from './modules/order'
import dashboard_error from './modules/dashboard_error'
import dashboard_autorisate from './modules/dashboard_autorisate'



export default createStore({
  modules: {
    menu,
    dashboard,
    slider,
    delivery_type,
    cart,
    user_data,
    time,
    modals,
    restaurants,
    order,
    dashboard_error,
    dashboard_autorisate,
  }
});
