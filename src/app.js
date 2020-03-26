const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//define paths for Express config

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// set up handlebar and views locations
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// set up directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req,res)=> {
    res.render('index', {
        title: 'Weather',
        name: 'Laurent Martinez'
    })
   
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title: 'about',
        name: 'Laurent Martinez'
    })
})

app.get('/help', (req,res)=> {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Laurent Martinez'
    })
})


app.get('/weather',  (req,res)=> {
    if (!req.query.address)
    {
return res.send({
            error:'You must search an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location}={}) => 
    {
        if (error) {
            return res.send({error})
        }
    
        forecast(latitude,longitude, (error, forecastData)=>
        {
            if (error) 
            {
                return res.send({error})
            }

            res.send ({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
}) 
//     res.send({
//         forecast: 'Pandemie',
//         location: 'Perpignan',
//         address: req.query.address
//     })
// })

app.get('/products', (req,res)=> {
    if (!req.query.search) {
       return res.send({
            error: 'You must provide a search'
        })
    }
     console.log(req.query.search)
     res.send
     ({
        products: []
     })
    
})

app.get('/help/*', (req,res)=> {
    res.render('404', {
        title: '404',
        name: 'Laurent Martinez',
        errorMessage: 'Help article not found'
    })
})

app.get('*',(req,res)=> {
    res.render('404', {
        title: '404',
        name: 'Laurent Martinez',
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=> {
    console.log('server is up on port ' + port)
})



