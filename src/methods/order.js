import {isPhoneNumber} from "@/methods/additional.js"
import {isPlaceInDeliveryZones} from "@/methods/address.js"
export async function validateOrderInfo(info){

  const cart = info.order.cart
  const comment = info.order.comment
  const delivery_type = info.order.delivery_type
  const link = info.order.link



  const phone = info.user_data.phone

  const name = info.user_data.name

  const dump_info = {
    order: {
      cart: cart,
      comment: comment,
      delivery_type: delivery_type,
      link: link,
    },
    user_data: {
      phone: null,
      address: null,
      name: name,
    },
  }

  const errors = []

  const address = info.user_data.address

  // console.log(address)
  // console.log("TEST = TEST = TEST = TEST = TEST = TEST = ")
  // console.log(delivery_type === "DELIVERY")
  // console.log(address !== null)
  // console.log(address !== '')
  // console.log((true)|(false))
  // console.log("TEST = TEST = TEST = TEST = TEST = TEST = ")

  if ((delivery_type === "DELIVERY")&((address === null)|(address === ""))) {
    errors.push({'DELIVERY_TYPE': "ADDRESS_NOT_EXISTED"})
  }

  if (delivery_type === "DELIVERY"){
    const parse_address = await isPlaceInDeliveryZones(address)

    console.log(parse_address)

    if(parse_address.result === "SUCCES"){
      dump_info.user_data.address = {'latitude': parse_address.address[0], 'longitude': parse_address.address[1]}
      dump_info.user_data.address_text = address
    } else {
      errors.push({'ADDRESS': parse_address.error})
    }
  }











  const parse_phone = isPhoneNumber(phone)

  if (parse_phone){
    dump_info.user_data.phone = parse_phone[2]
  } else {
    errors.push({'PHONE_NUMBER':"NOT_VALID"})
  }

  console.log(errors.length)


  if(errors.length === 0){
    const data = JSON.stringify({dump: dump_info})
    console.log({dump: dump_info})

    const api_url = require('@/settings.js').api_url
    const requestURL = api_url + "createOrder"

    // const requestURL = 'http://localhost:8080/createOrder'

    const responce = await fetch(requestURL,{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: data,
    })


    const get_data = await responce.json()

    const orders = JSON.parse(localStorage.getItem('orders'))

    console.log(orders)
    // console.log()

    if (orders){
      orders.push({id: get_data.dump.order_id, secret_key: get_data.dump.secret_key})
      localStorage.setItem('orders', JSON.stringify(orders))
    } else {
      const set_item = [{id: get_data.dump.order_id, secret_key: get_data.dump.secret_key}]
      localStorage.setItem('orders', JSON.stringify(set_item))
    }




    // console.log(get_data)
    return {info: get_data.dump, errors: errors}
  }
  return {info: dump_info, errors: errors}
}
