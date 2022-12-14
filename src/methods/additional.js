


function capitalize(str)
{
    // str = "JavaSASFAqwcript program to capitalize the first letter of each word of a given string."
    str = str.toLowerCase();
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");
}
function parsePrice(price){
  if (price < 0){
    return null
  }

  const rubles = (price/100)
  var pennies = (price%100)
  // console.log(cops)
  let dump = ""
  if(pennies == 0){
    dump += rubles.toString() + '.' +"00"
  } else if(pennies<10){
    dump += (rubles-(pennies/100)).toString() + '.' + "0" + pennies.toString()
  } else {
    dump += (rubles-(pennies/100)).toString() + '.' + pennies.toString()
  }
  return dump
}

function parseTime(time){
  const minutes = time%60
  const hours = (time-minutes)/60
  let minutes_text = ""
  if (minutes < 10){
    minutes_text += "0" + minutes.toString()
  } else {
    minutes_text += minutes.toString()
  }

  let hours_text = ""

  if (hours < 10){
    hours_text += "0" + hours.toString()
  } else {
    hours_text += hours.toString()
  }
  const dump_text = hours_text + ":" + minutes_text
  return dump_text
}

function isHexValidColor(color){
  const re = new RegExp('^#(?:[0-9a-fA-F]{3}){1,2}$');
  if (color.search(re)){
    return false
  }
  return true
}

function isFileExtentionAllowed(filename, extention){
  const file_extention = filename.split('.').pop()
  return extention === file_extention
}

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

function parseTimeFromString(time){
  const regExp = new RegExp('^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$')
  const result = time.match(regExp)
  if (result){
    return parseInt(result[1]) * 60 + parseInt(result[2])
  } else {
    return null
  }
}

export function isPhoneNumber(phone){
  console.log(phone)

  const regExp = /^(\+7|7|8)([\s\-]?\(?[0123456789][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$)/gm;

  return regExp.exec(phone)
}

export {capitalize, parsePrice, parseTime, isHexValidColor, isFileExtentionAllowed, isEmpty, parseTimeFromString}
