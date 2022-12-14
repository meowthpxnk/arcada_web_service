import {checkTime} from "@/methods/time.js"

export default {
  actions: {
    // async fetchWorldTimeForRestaurant(ctx){
    //
    //   const url = "http://worldtimeapi.org/api/timezone/Europe/London"
    //   const responce = await fetch(url, {method: "GET"})
    //   const data = await responce.json()
    //   // console.log(data)
    //   // console.log(data.utc_datetime)
    //   const date_now = new Date(data.utc_datetime)
    //
    //   let hours;
    //   let minutes;
    //
    //
    //   hours = date_now.getUTCHours() + 10
    //   minutes = date_now.getMinutes()
    //   if (hours > 23){
    //     hours -= 24
    //   }
    //
    //   const time = {
    //     hours: hours,
    //     minutes: date_now.getUTCMinutes(),
    //   }
    //
    //   const restaurant = this.getters.getRestaurant
    //
    //   const restaurant_time = {
    //     start_work: restaurant.start_work,
    //     end_work: restaurant.end_work,
    //   }
    //
    //   console.log("time")
    //
    //   return checkTime(time, restaurant_time)
    // },
  },
  mutations: {
    // updateTime(state, time){
    //
    // },
  },
  state: {
    // time: null,
  },
  getters: {
    // getTime: (state) => {
    //   return state.time
    // },
  },
}
