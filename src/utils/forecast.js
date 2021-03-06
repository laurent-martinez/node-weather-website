const request = require('request')
const geocode = require('./geocode')



const forecast = (latitude, longitude, callback) => 
    {
    const url = 'https://api.darksky.net/forecast/2dc3796b6d5b1b044f2f7c4177e7d11b/'+ latitude + ','+ longitude +'?units=si&lang=fr'
  
      request({url, json: true},(error, {body})=>
      {
        if (error) {
          callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
          callback('Unable to find location', undefined)
        } else {
          console.log(body.daily.data)
          callback(undefined,'La maximale sera de '+ body.daily.data[0].temperatureHigh + '°C  avec une minimale de ' + body.daily.data[0].temperatureLow + ' °C .    ' + body.daily.data[0].summary +' La température extérieure est de '+ body.currently.temperature + ' °C. Il y a '+ body.currently.precipProbability+'% de probabilité de pluie.')
        }
          
      })
    }

    module.exports = forecast 