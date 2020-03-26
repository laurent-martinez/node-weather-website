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
          callback(undefined, body.daily.data[0].summary+' La température extérieure est de '+ body.currently.temperature + ' degrés. Il y a '+ body.currently.precipProbability+'% de probabilité de pluie.')
        }
          
      })
    }

    module.exports = forecast 