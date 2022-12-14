
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
    return {result: "SUCCES", coords: coords}
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


import {zone} from '@/methods/static.js'
export async function isPlaceInDeliveryZones(address){


  const adress_get = await parseAddress(address);

  if (adress_get.result === "SUCCES"){
    const place = adress_get.coords
    const result = isPlaceInZone(place, zone);


    if (result) {
      // console.log(result)
      return {result: "SUCCES", address: place}
    } else {
      return {result: "ERROR", error: "NOT_INSIDE_DELIVERY_ZONES"}
    }

  }
  return {result: "ERROR", error: "NOT_VALID_ADDRESS"}
}


export async function parseFromCoords(address){
  console.log(address)

  const ymaps = window.ymaps
  // console.log(ymaps)


  // const address_new = {latitude: 50.54903, longitude: 136.968206}
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
    // .properties.get('name')
  })
  console.log(response)
  return response
}
// export function isPlaceInZone(){
  //   const polygons = [[50.535048720351995,136.91034899202802],[50.551347395839834,136.93961725679856]]
  //   const coords = [50.543947, 136.92824]
  //   // var main_zone = null
  //   //
  //   // for (var i = 0; i < polygons.length; i++) {
    //   //   var points = coords
    //   //   var vs = polygons[i]
    //   //
    //   //   if ((inside(points, vs)) == true) {
      //   //     if (main_zone == null) {
        //   //       main_zone = i
        //   //     } else {
          //   //
          //   //       // if (zones[i].delivery_fee < zones[main_zone].delivery_fee) {
            //   //       //   main_zone = i
            //   //       // }
            //   //     }
            //   //   }
            //   // }
            //   console.log(inside(coords, polygons))
            // }
