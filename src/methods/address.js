import {delivery_zones} from '@/methods/static.js'
import {zone} from '@/methods/static.js'


export async function parseAddress(request){
  const ymaps = window.ymaps
  console.log(ymaps)
  const path = request + ", Комсомольск-на-Амуре"

  const response = await ymaps.geocode(path).then(async function (res) {
    var obj = await res.geoObjects.get(0),
      error;

    if (obj) {
      switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
        case 'exact':
          break;
        case 'number':
          error = 'NUMBER';
          break;
        case 'near':
        case 'range':
          error = 'RANGE';
          break;
        case 'street':
          error = 'STREET';
          break;
        case 'other':
        default:
          error = 'DEFAULT';
      }
    } else {
      error = 'Адрес не найден';
    }

    if (error) {
      return {result: "ERROR", error: error}
    }



    const coords = await obj.geometry.getCoordinates()

    const del_zone = await isPlaceInDeliveryZonesCoords(coords)

    if (del_zone.result !== "SUCCES") {
      return {result: "ERROR", error: "Not in del_zone"}
    }

    return {result: "SUCCES", coords: coords, taxes: del_zone.taxes}
  })

  return response
}



export function isPlaceInZone(place, zone) {
  var x = place[0], y = place[1];
  var inside = false;
  for (var i = 0, j = zone.length - 1; i < zone.length; j = i++) {
    var xi = parseFloat(zone[i][0]), yi = parseFloat(zone[i][1]);
    var xj = parseFloat(zone[j][0]), yj = parseFloat(zone[j][1]);

    var intersect = ((yi > y) != (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }

  return inside;
}



export async function isPlaceInDeliveryZones(address){


  const adress_get = await parseAddress(address);

  if (adress_get.result === "SUCCES"){
    const place = adress_get.coords
    // const result = isPlaceInZone(place, zone);


    let taxes = null
    let result = false

    for (let del_zone of delivery_zones) {
      if (isPlaceInZone(place, del_zone.coordinates_list)){
        if (!(result)){
          result = true
        }
        if (taxes){
          if (taxes < del_zone.price){
            taxes = del_zone.price
          }
        } else {
          taxes = del_zone.price
        }
      }
    }


    if (result) {
      return {result: "SUCCES", address: place, taxes: taxes}
    } else {
      return {result: "ERROR", error: "NOT_INSIDE_DELIVERY_ZONES"}
    }

  }
  return {result: "ERROR", error: "NOT_VALID_ADDRESS"}
}


export async function isPlaceInDeliveryZonesCoords(coords){

  let taxes = null
  let result = false

  for (let del_zone of delivery_zones) {
    if (isPlaceInZone(coords, del_zone.coordinates_list)){
      if (!(result)){
        result = true
      }
      if (taxes){
        if (taxes < del_zone.price){
          taxes = del_zone.price
        }
      } else {
        taxes = del_zone.price
      }
    }
  }

  if (result) {
    return {result: "SUCCES", taxes: taxes}
  }

  return {result: "ERROR", error: "NOT_INSIDE_DELIVERY_ZONES"}
}


export async function parseFromCoords(address){
  console.log(address)

  const ymaps = window.ymaps

  const latitude = address.latitude
  const longitude = address.longitude
  console.log(latitude)
  console.log(longitude)
  console.log(address)
  const response = await ymaps.geocode([latitude, longitude]).then(async function (res) {
    var obj = await res.geoObjects.get(0)
    console.log(obj)
    console.log(obj)
    return obj.properties.get("name")
  })
  console.log(response)
  return response
}
