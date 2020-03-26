const request = require('request')

const geocode = (address, callback) => 
{
 const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoibGNnbSIsImEiOiJjazd5eGlqYWUwMGdpM21ydzVjb2wzd2J6In0.9u24wGq8WJALfY7cSQzTWw'
 request({url, json: true}, (error, { body }) => 
 {
   if (error) 
   {
     callback("Unable to connect to weather app :(", undefined)
   } else if (body.features === 0) 
   {
     callback("Unable to find location. Try search again!", undefined)
   } else 
   {
     callback(undefined, 
       {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
       })
   }
 })

}

module.exports = geocode


// Geocoding
// Address -> lat/long -> Weather

//  const geoCoding = 'https://api.mapbox.com/geocoding/v5/mapbox.places/perpignan.json?access_token=pk.eyJ1IjoibGNnbSIsImEiOiJjazd5eGlqYWUwMGdpM21ydzVjb2wzd2J6In0.9u24wGq8WJALfY7cSQzTWw'


//  request({url: geoCoding, json: true}, (error,response)=> {
//    if (error) {
//      console.log('location service is currently out of order')
//    } else if (response.body.features === 0) {
//      console.log('Unable to find this location')
//    } else {
//    const latitude = response.body.features[0].center[1]
//      const longitude = response.body.features[0].center[0]
//      console.log(chalk.blue('La latitude est de : '+latitude+ '. La longitude est de : '+ longitude))

//    }  
//  })