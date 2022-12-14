export function checkTime(time, restaurant_time){

  const parse_now_time_code = (time.hours*60) + time.minutes

  const isCycle = ((restaurant_time.start_work - restaurant_time.end_work) > 0)

  const result_before_night = parse_now_time_code >= restaurant_time.start_work
  const result_after_night = parse_now_time_code < restaurant_time.end_work

  if (isCycle) {
    return result_before_night || result_after_night
  } else {
    return result_before_night && result_after_night
  }
}

export async function fetchWorldTimeForRestaurant(restaurant){

  const time = await getUTCTime()

  const restaurant_time = {
    start_work: restaurant.start_work,
    end_work: restaurant.end_work,
  }

  return checkTime(time, restaurant_time)

}


export async function getUTCTime(){

  const settings = require('@/settings.js')
  const url = settings.client.url + "getUTCTime"

  // const url = "http://localhost:8080/getUTCTime"
  const responce = await fetch(url, {method: "GET"})
  const data = await responce.json()
  console.log(data)

  const date_now = data.dump

  let hours;
  let minutes;

  hours = date_now.hour + 10
  minutes = date_now.minute
  if (hours > 23){
    hours -= 24
  }

  const time = {
    hours: hours,
    minutes: minutes,
  }
  return time
}
