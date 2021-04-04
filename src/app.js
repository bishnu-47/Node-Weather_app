const path=require('path');

const express = require('express');
const hbs=require('hbs');

const app=express();
const port=process.env.PORT || 8000

const geoCode=require('./utils/geoCode.js');
const forecast=require('./utils/forecast.js');

// Defining paths for express to config
const publicDirectoryPath=path.join(__dirname , '../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname,'../templates/partials');

// setting up handlebar view engine and paths
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialsPath);

// accessing static web-pages
app.use(express.static(publicDirectoryPath))

// Home page
app.get('/',(req , res) =>{
    res.render('index',{
        title: "Weather App",
        name: "Wishnu"
    })
})

// About page
app.get('/about', (req , res) =>{
    res.render('about', {
        title:"About",
        name:"Wishnu"
    })
})

// Help page
app.get('/help', (req ,res) =>{
    res.render('help',{
        title:"Help",
        name:"Wishnu",
        helpText:"Help page will be updated soon. Stay tuned ;)"
    })
})

// API requests
app.get('/weather',(req , res) =>{
    const address=req.query.address;
    if(!address){
        return res.send({
            error:"address must be entered!"
        })
    }
    // data comming form geoCode.hbs and forecast.hbs
    geoCode(address, (error, {latitude , longitude , location} ={}) =>{
        if(error){
            res.send({error})
        }else{
            forecast(latitude , longitude , (error , forecastData) =>{
                if(error){
                    res.send(error);
                }else{
                    res.send({
                        location, //geoCode()
                        forecast: forecastData, //forecast()
                        address //geoCode(),params
                    })
                }
            })
        }
    })
})


// Error(404) pages
app.get('/help/*',(req , res) =>{
    res.render('404',{
        title:"404",
        error:"Help article not found"
    })
})

app.get('*',(req , res) =>{
    res.render('404',{
        title:"404",
        error:"Page not found"
    })
})

app.listen(port,()=>{
    console.log('Server has started at port '+port)
})
