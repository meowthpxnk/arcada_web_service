export function goToRestaurant(link){
  // window.open("/restaurants/" + link)
  document.location.href = "/" + link
}


export function goToOrder(order_id){
  // window.open("/restaurants/" + link)
  document.location.href = "/orders/" + order_id
}

export function goToPay(url){
  window.open(url, '_blank').focus()
}
