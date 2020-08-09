const path=require('path');

const express = require('express');
const app=express();
const hbs=require('hbs');

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
        name:"Wishnu"
    })
})

app.get('/weather',(req , res) =>{
    const address=req.query.address;
    if(!address){
        return res.send({
            error:"address must be entered!"
        })
    }
    geoCode(address, (error, {latitude , longitude , location} ={}) =>{
        if(error){
            res.send({error})
        }else{
            forecast(latitude , longitude , (error , forecastData) =>{
                if(error){
                    res.send(error);
                }else{
                    res.send({
                        location,
                        forecast: forecastData,
                        address
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

app.listen(3000,()=>{
    console.log('Server has started at port 3000')
})
